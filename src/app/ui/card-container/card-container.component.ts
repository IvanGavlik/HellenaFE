import {Component, Input, OnInit} from '@angular/core';
import {CardContainer} from "./card-container";

@Component({
  selector: 'hellena-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {

  @Input()
  cardContainer: CardContainer = {} as CardContainer;

  constructor() { }

  ngOnInit(): void {}

}
