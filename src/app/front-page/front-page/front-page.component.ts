import {Component, EventEmitter, OnInit} from '@angular/core';
import {CardContainer} from "../../ui/card-container/card-container";
import {SpinnerConfig} from '../../ui/spinner/spinner-config';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  subTitle = 'Pronađi proizvode na akciji';

  dailyDeal: CardContainer = {
    title: 'Najpovoljnije danas',
    footer: 'Pogledaj sve'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
