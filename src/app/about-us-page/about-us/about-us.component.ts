import {Component, OnDestroy, OnInit} from '@angular/core';
import {AboutUsConfiguration} from '../about-us-configuration';
import {AboutUsService} from '../about-us.service';
import {Entity} from '../../crud/entity';
import {DialogService} from '../../ui/dialog/dialog.service';
import {Dialog} from '../../ui/dialog/dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'hellena-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  providers: [
    { provide: 'aboutUsConfiguration', useClass: AboutUsConfiguration }
  ]
})
export class AboutUsComponent implements OnInit, OnDestroy {

  public msg: Message = {} as Message;

  private subs: Subscription[] = [];

  constructor(protected service: AboutUsService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => {
      if (el) {
        el.unsubscribe();
      }
    });
  }

  onSubmit(): void {
    if (!this.msg || !this.msg.from || !this.msg.body) {
      const conf = {
        title: 'Pošalji poruku autoru',
        content: 'Email ili poruka nedostaje',
        onOF: false,
      } as Dialog;
      const dialog = this.dialogService.openHellenaDialog(conf)
          .subscribe(res => {});
      this.subs.push(dialog);
      return;
    }

    this.msg.to = 'help@hellena.info';
    this.msg.header = 'Pošalji poruku autoru';
    const save = this.service.save(this.msg).subscribe(
        el => this.handleOk()
      , error => this.handleError());
    this.subs.push(save);
  }

  handleOk(): void {
    this.msg.body = '';
    this.msg.from = '';
    const dialog = this.dialogService.openHellenaDialog({
      title: 'Pošalji poruku autoru',
      content: 'Poruka poslana',
      onOF: false,
    } as Dialog)
        .subscribe(res => {});
    this.subs.push(dialog);
  }

  handleError(): void {
    const conf = {
      title: 'Pošalji poruku autoru',
      content: 'Poruka nije poslana',
      onOF: false,
    } as Dialog;
    const dialog = this.dialogService.openHellenaDialog(conf)
        .subscribe(res => {});
    this.subs.push(dialog);
  }
}

export interface Message extends Entity {
  from: string;
  to: string;
  header: string;
  body: string;
}
