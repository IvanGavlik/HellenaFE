import {Component, OnInit} from '@angular/core';
import {ItemCategoryConfiguration} from '../item-category-configuration';
import {ItemCategoryService} from '../item-category.service';
import {Card} from '../../ui/card/card';
import {map,} from 'rxjs/operators';
import {Entity} from '../../crud/entity';
import {Observable, of} from 'rxjs';
import {CardContainer} from '../../ui/card-container/card-container';
import {Router} from '@angular/router';
import {defaultPage, SearchItem} from '../../search-page/search-item';

@Component({
  selector: 'hellena-item-category-container',
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

  constructor(private service: ItemCategoryService, private router: Router) { }

  ngOnInit(): void {
     this.cards$ = this.service.findAll()
      .pipe(
        map(x => x.slice(0, 5)),
        map(entities => entities.map( el => this.toCard(el as ItemCategory))),
      );
  }

  toCard(item: ItemCategory): Card {
    return {
      id: item.id,
      title: item.name,
      footer: 'Pogledaj'
    } as Card;
  }

  handleFooterActionCard($event: Card): void {
    this.router.navigateByUrl('/search', { state: { cityIds: [],
      storeIds: [],
      categoryIds: [ $event.id ],
      page: defaultPage(),
    } as SearchItem });
  }

  handleFooterActionContainer($event: CardContainer): void {
    this.router.navigateByUrl('/search');
  }
}

class ItemCategory extends Entity {
  id = -1;
  name = '';
  description = '';
}
