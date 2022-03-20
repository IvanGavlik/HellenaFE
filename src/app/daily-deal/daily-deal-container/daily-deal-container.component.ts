import {Component, OnInit} from '@angular/core';
import {DailyDealConfiguration} from '../daily-deal-configuration';
import {CardContainer} from '../../ui/card-container/card-container';
import {Router} from '@angular/router';
import {Card} from '../../ui/card/card';
import {defaultPage, ItemFeature, SearchItem} from '../../search-page/search-item';
import {DailyDealService} from '../daily-deal.service';
import {map} from 'rxjs/operators';
import {Entity, Paginator} from '../../crud/entity';
import {Observable} from 'rxjs';

@Component({
  selector: 'hellena-daily-deal-container',
  templateUrl: './daily-deal-container.component.html',
  styleUrls: ['./daily-deal-container.component.css'],
  providers: [
    {provide: 'configuration', useClass: DailyDealConfiguration }
  ]
})
export class DailyDealContainerComponent implements OnInit {

  carouselOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    margin: 5,
    responsive: {
      0: {
        items: 1,
        dots: false,
        stagePadding: 30
      },
      400: {
        items: 2,
        dots: false,
        stagePadding: 50
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    }
  };

  cards: ItemSearchEntity[] = [];

  constructor(private service: DailyDealService, private router: Router) { }

  ngOnInit(): void {
    this.service.search({ cityIds: [],
      storeIds: [],
      categoryIds: [],
      feature: ItemFeature.CHEAPEST_TODAY,
      page: defaultPage(8)
    } as SearchItem)
        .pipe(
            map(response => response.page as ItemSearchEntity[]),
        ).subscribe(entities => this.cards = entities);
  }

  handleFooterActionContainer(): void {
    this.router.navigateByUrl('/search', { state: {
        cityIds: [],
        storeIds: [],
        categoryIds: [],
        feature: ItemFeature.CHEAPEST_TODAY,
        page: defaultPage()
      } as SearchItem });
  }

  handleFooterActionCard($event: ItemSearchEntity): void {
    this.router.navigateByUrl('/search', { state: {
        name : $event.name,
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
