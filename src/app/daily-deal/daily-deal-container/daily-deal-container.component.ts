import {Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {defaultPage, ItemFeature, SearchItem} from '../../search-page/search-item';
import {map} from 'rxjs/operators';
import {Entity} from '../../crud/entity';
import { DomSanitizer } from '@angular/platform-browser';
import {SpinnerConfig} from '../../ui/spinner/spinner-config';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import {SearchUIService} from '../../search-page/search-ui.service';

@Component({
  selector: 'hellena-daily-deal-container',
  templateUrl: './daily-deal-container.component.html',
  styleUrls: ['./daily-deal-container.component.css'],
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
    autoplay: true,
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

  constructor(private router: Router, private searchUI: SearchUIService) { }

  ngOnInit(): void {
    this.loaded = false;

    this.searchUI.onSearchStop()
        .pipe(
            map(response => response.page.page as ItemSearchEntity[]),
            )
        .subscribe(entities => {
            this.cards = entities;
            this.cards.forEach(card => this.setImage(card));
            this.loaded = true;
        });

    const itemSearch = {
        priceMIn: 0,
        priceMax: 10_000,
        cityIds: [],
        storeIds: [],
        categoryIds: [],
        feature: ItemFeature.CHEAPEST_TODAY,
        page: defaultPage(8)
    } as SearchItem;
    this.searchUI.searchStart({ item : itemSearch, firstPage: true } );

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
        if (store ===  'INTERSPAR') {
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
