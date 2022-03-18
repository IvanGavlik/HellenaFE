import {Component, OnInit} from '@angular/core';
import {CardContainer} from '../../ui/card-container/card-container';


@Component({
  selector: 'hellena-front-page',
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
