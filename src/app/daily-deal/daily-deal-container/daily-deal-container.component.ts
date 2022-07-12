import {Component, EventEmitter, OnInit} from '@angular/core';
import {DailyDealConfiguration} from '../daily-deal-configuration';
import {Router} from '@angular/router';
import {defaultPage, ItemFeature, SearchItem} from '../../search-page/search-item';
import {DailyDealService} from '../daily-deal.service';
import {map} from 'rxjs/operators';
import {Entity} from '../../crud/entity';
import { DomSanitizer } from '@angular/platform-browser';
import {SpinnerConfig} from '../../ui/spinner/spinner-config';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';

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
    nav: true,
    navText: ['Prethodni', 'Sljedeći'],
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: false,
    margin: 5,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    }
  };

  cards: ItemSearchEntity[] = [];
  loaded = false;

    spinner: SpinnerConfig = {
        color : 'primary',
        mode : 'indeterminate',
        value: 50,
        showProgress: new EventEmitter<boolean>()
    } as SpinnerConfig;

  cld = new Cloudinary({
      cloud: {
          cloudName: 'hellena'
      }
  });

  constructor(private service: DailyDealService, private router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loaded = false;
    this.service.search({
        priceMIn: 0,
        priceMax: 10_000,
        cityIds: [],
      storeIds: [],
      categoryIds: [],
      feature: ItemFeature.CHEAPEST_TODAY,
      page: defaultPage(8)
    } as SearchItem)
        .pipe(
            map(response => response.page as ItemSearchEntity[]),
        ).subscribe(entities => {
         this.cards = entities;
         this.cards.forEach(card => {this.setImage(card)});
         this.loaded = true;
        });
  }

  setImage(card: ItemSearchEntity): void {
      card.img = this.cld.image(card.imageName);
      card.imgItem = card.imageName;
  }

  handleFooterActionContainer(): void {
    this.router.navigateByUrl('/search', { state: {
            priceMIn: 0,
            priceMax: 10_000,
        cityIds: [],
        storeIds: [],
        categoryIds: [],
        feature: ItemFeature.CHEAPEST_TODAY,
        page: defaultPage()
      } as SearchItem });
  }

  handleFooterActionCard($event: ItemSearchEntity): void {
    this.router.navigateByUrl('/search', { state: {
            priceMIn: 0,
            priceMax: 10_000,
        name : $event.name,
        cityIds: [],
        storeIds: [],
        categoryIds: [],
        feature: ItemFeature.CHEAPEST_TODAY,
        page: defaultPage()
      } as SearchItem });
  }

    iscldImg(store: string): boolean {
        if (store === 'LIDL' || store ===  'INTERSPAR') {
            return true;
        }
        return false;
    }

}


interface ItemSearchEntity extends Entity {
  name: string;
  storeName: string;
  orginalPrice: number;
  actionPrice: number;
  imageName: string;
  activeFrom: Date;
  activeTo: Date;
  img: CloudinaryImage;
  imgItem: string;
  storeLogo: string;
}
