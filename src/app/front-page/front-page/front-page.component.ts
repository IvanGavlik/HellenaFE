import {Component, OnInit} from '@angular/core';
import {CardContainer} from '../../ui/card-container/card-container';
import { OwlOptions } from 'ngx-owl-carousel-o';

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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
