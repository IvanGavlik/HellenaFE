import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemCategoryConfiguration} from "../item-category-configuration";
import {ItemCategoryService} from "../item-category.service";
import {Card} from "../../ui/card/card";
import {map, take} from "rxjs/operators";
import {Entity} from "../../crud/entity";
import {Observable, of, Subscription} from "rxjs";
import {CardContainer} from "../../ui/card-container/card-container";

@Component({
  selector: 'app-item-category-container',
  templateUrl: './item-category-container.component.html',
  styleUrls: ['./item-category-container.component.css'],
  providers: [
    {provide: 'configuration', useClass: ItemCategoryConfiguration}
  ]
})
export class ItemCategoryContainerComponent implements OnInit {

  cards$: Observable<Card[]> = of();

  itemCategoryContainer: CardContainer =  {
    title: 'Istraži kategorije',
    footer: 'Pogledaj sve'
  } as CardContainer;

  constructor(private service: ItemCategoryService) { }

  ngOnInit(): void {
     this.cards$ = this.service.findAll()
      .pipe(
        map(x => x.slice(0, 5)),
        map(entities => entities.map( el => this.toCard(el as ItemCategory))),
      )
  }

  toCard(item: ItemCategory): Card {
    return {
      title: item.name,
    } as Card;
  }

}

class ItemCategory extends Entity {
  id: string = '';
  name: string = '';
  description: string = '';
}
