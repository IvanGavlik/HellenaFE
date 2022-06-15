import {Component, OnInit} from '@angular/core';
import {CardContainer} from '../../ui/card-container/card-container';
import {MatDialog} from '@angular/material/dialog';
import {MobAppPromotionDialogComponent} from '../mob-app-promotion-dialog/mob-app-promotion-dialog.component';


@Component({
  selector: 'hellena-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  dailyDeal: CardContainer = {
    title: 'Najpovoljnije danas',
    footer: 'Pogledaj sve'
  };

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dialog.open(MobAppPromotionDialogComponent, {disableClose: true});
  }

}
