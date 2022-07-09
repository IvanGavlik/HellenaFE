import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LocalStorageService} from '../../local-storage/local-storage.service';
import {MobAppPromotionDialogComponent} from '../mob-app-promotion-dialog/mob-app-promotion-dialog.component';
import {Router} from '@angular/router';
import {defaultPage, ItemFeature, SearchItem} from '../../search-page/search-item';
import {Dialog} from '../../ui/dialog/dialog';
import {DialogService} from '../../ui/dialog/dialog.service';
import {Subscription} from 'rxjs';
import {AboutUsService} from '../../about-us-page/about-us.service';
import {AboutUsConfiguration} from '../../about-us-page/about-us-configuration';
import {Message} from '../../about-us-page/about-us/about-us.component';

@Component({
  selector: 'hellena-front-page-desktop',
  templateUrl: './front-page-desktop.component.html',
  styleUrls: ['./front-page-desktop.component.css'],
  providers: [
    { provide: 'aboutUsConfiguration', useClass: AboutUsConfiguration }
  ]
})
export class FrontPageDesktopComponent implements OnInit, OnDestroy {

  private key = 'isSeen';
  msg: string = '';
  private subs: Subscription[] = [];

  constructor(private dialog: MatDialog, private service: LocalStorageService, private router: Router,
              private dialogService: DialogService,
              private aboutUs: AboutUsService,
              ) { }

  ngOnInit(): void {
    const value = this.service.getItem(this.key);
    if (value === undefined || value == null || value !== 'Y') {
      this.dialog.open(MobAppPromotionDialogComponent, {disableClose: true});
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => {
      if (el) {
        el.unsubscribe();
      }
    });
  }

  onSubmit(): void {
    if (!this.msg) {
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

    const save = this.aboutUs.save({
      body: this.msg,
      from: 'user',
      to: 'help@hellena.info',
      header: 'Kako ti možemo pomoći'
    } as Message).subscribe(
        el => this.handleOk()
        , error => this.handleError());
    this.subs.push(save);
  }

  handleOk(): void {
    this.msg = '';
    const dialog = this.dialogService.openHellenaDialog({
      title: 'Kako ti možemo pomoći ?',
      content: 'Poruka poslana',
      onOF: false,
    } as Dialog)
        .subscribe(res => {});
    this.subs.push(dialog);
  }

  handleError(): void {
    const conf = {
      title: 'Kako ti možemo pomoći ?',
      content: 'Poruka nije poslana',
      onOF: false,
    } as Dialog;
    const dialog = this.dialogService.openHellenaDialog(conf)
        .subscribe(res => {});
    this.subs.push(dialog);
  }

  handleCheapest(): void {
    const search = {
      priceMIn: 0,
      priceMax: 10_000,
      categoryIds: [],
      storeIds: [],
      cityIds: [],
      page: defaultPage(),
      feature: ItemFeature.CHEAPEST_TODAY,
    } as SearchItem

    this.router.navigateByUrl('/search', {
      state: search,
    });

  }

  handleALl(): void {
    const search = {
      priceMIn: 0,
      priceMax: 10_000,
      categoryIds: [],
      storeIds: [],
      cityIds: [],
      page: defaultPage(),
    } as SearchItem

    this.router.navigateByUrl('/search', {
      state: search,
    });
  }
}
