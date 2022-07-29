import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../about-us-page/about-us/about-us.component';
import {AboutUsService} from '../../about-us-page/about-us.service';
import {Dialog} from '../../ui/dialog/dialog';
import {DialogService} from '../../ui/dialog/dialog.service';
import {Subscription} from 'rxjs';
import { MatDialogRef} from '@angular/material/dialog';
import {LocalStorageService} from '../../local-storage/local-storage.service';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'hellena-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent implements OnInit, OnDestroy {

  grade = 1;
  feedback = '';

  private subs: Subscription[] = [];

  constructor(public dialogRef: MatDialogRef<FeedbackDialogComponent>,
              private service: AboutUsService,
              private dialogService: DialogService,
              public deviceService: DeviceDetectorService,
              private localService: LocalStorageService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }

  onSubmit(): void {
    const msg = {
      from : 'undefined',
      to: 'help@hellena.info',
      body: this.grade + ';' + this.feedback + ';',
      header: 'Ocijeni nas'
    } as Message;
    const save = this.service.save(msg).subscribe(el => {
      this.grade = 1;
      this.feedback = '';
      const dialog = this.dialogService.openHellenaDialog({
        title: 'Ocijeni nas',
        content: 'Hvala na povratnim informacijama.',
        onOF: false,
      } as Dialog)
          .subscribe(res => {});
      this.subs.push(dialog);
      this.dialogRef.close();
      this.localService.addItem('ocijeni_nas_feedback', 'Y');
    });

    this.subs.push(save);
  }

  clear(): void {
    this.grade = 1;
    this.feedback = '';
    this.localService.addItem('ocijeni_nas_feedback', 'Y');
    this.dialogRef.close();
  }
}
