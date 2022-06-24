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
    this.service.search({ cityIds: [],
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
