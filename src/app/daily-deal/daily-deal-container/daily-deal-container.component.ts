import {Component, OnInit} from '@angular/core';
import {DailyDealConfiguration} from '../daily-deal-configuration';
import {CardContainer} from '../../ui/card-container/card-container';
import {Router} from '@angular/router';
import {Card} from '../../ui/card/card';
import {defaultPage, ItemFeature, SearchItem} from '../../search-page/search-item';
import {Observable, of} from 'rxjs';
import {DailyDealService} from '../daily-deal.service';
import {map} from 'rxjs/operators';
import {Entity} from '../../crud/entity';

@Component({
  selector: 'hellena-daily-deal-container',
  templateUrl: './daily-deal-container.component.html',
  styleUrls: ['./daily-deal-container.component.css'],
  providers: [
    {provide: 'configuration', useClass: DailyDealConfiguration }
  ]
})
export class DailyDealContainerComponent implements OnInit {

  cards$: Observable<DayilDealCard[]> = of();

  dailyDealContainer: CardContainer =  {
    title: 'Najpovoljnije danas',
    footer: 'Pogledaj sve'
  } as CardContainer;

  constructor(private service: DailyDealService, private router: Router) { }

  ngOnInit(): void {
    this.cards$ = this.service.search({ cityIds: [],
      storeIds: [],
      categoryIds: [],
      feature: ItemFeature.CHEAPEST_TODAY,
      page: defaultPage(5)
    } as SearchItem)
        .pipe(
            map(entities => entities.page.map( el => this.toCard(el as ItemSearchEntity))),
        );
  }

  toCard(item: ItemSearchEntity): DayilDealCard {
    return {
      id: item.id,
      title: item.name,
      oldPrice: `${item.orginalPrice} kn`,
      desc: `${item.actionPrice} kn`,
      footer: 'Pogledaj'
    } as DayilDealCard;
  }

  getPrice(item: ItemSearchEntity): number {
    if (item.actionPrice) {
      return item.actionPrice;
    }
    return item.orginalPrice;
  }

  handleFooterActionContainer($event: CardContainer): void {
    this.router.navigateByUrl('/search', { state: {
        cityIds: [],
        storeIds: [],
        categoryIds: [],
        feature: ItemFeature.CHEAPEST_TODAY,
        page: defaultPage()
      } as SearchItem });
  }

  handleFooterActionCard($event: Card): void {
    this.router.navigateByUrl('/search', { state: {
        name : $event.title,
        cityIds: [],
        storeIds: [],
        categoryIds: [],
        feature: ItemFeature.CHEAPEST_TODAY,
        page: defaultPage()
      } as SearchItem });
  }
}

interface ItemSearchEntity extends Entity {
  name: string;
  storeName: string;
  orginalPrice: number;
  actionPrice: number;
}

interface DayilDealCard extends Card {
    oldPrice: string;
}
