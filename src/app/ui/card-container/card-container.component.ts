import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardContainer} from './card-container';


@Component({
  selector: 'hellena-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {

  @Input()
  cardContainer: CardContainer = {} as CardContainer;

  @Output()
  footerAction: EventEmitter<CardContainer> = new EventEmitter<CardContainer>();

  constructor() { }

  ngOnInit(): void {}

  containerFooterClick(): void {
    this.footerAction.emit(this.cardContainer);
  }
}
