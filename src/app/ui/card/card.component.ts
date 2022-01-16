import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "./card";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card?: Card;

  @Output() footerAction: EventEmitter<Card> = new EventEmitter<Card>();

  constructor() { }

  ngOnInit(): void {
  }

  footerClick(): void {
    this.footerAction.emit(this.card);
  }
}
