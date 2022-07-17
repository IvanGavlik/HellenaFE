import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild
} from '@angular/core';
import {defaultPage, SearchItem} from '../../search-item';
import {CheckboxConfig, CheckboxItem} from '../../../ui/checkbox/checkbox-config';
import {Subscription} from 'rxjs';
import {SearchItemService} from '../../search-item.service';
import {InitDataHelper} from '../../pair';
import {MatSliderChange} from '@angular/material/slider';
import { MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {LocalStorageService} from '../../../local-storage/local-storage.service';

@Component({
  selector: 'hellena-search-form-mobile',
  templateUrl: './search-form-mobile.component.html',
  styleUrls: ['./search-form-mobile.component.css']
})
export class SearchFormMobileComponent implements OnInit, AfterViewInit ,OnDestroy {

  name = new FormControl('');

  storeConfig = {
    title: 'Trgovina',
    list: []
  } as CheckboxConfig;

  categoryConfig = {
    title: 'Kategorija',
    list: []
  } as CheckboxConfig;

  @ViewChild('input') input = {} as ElementRef;


  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: SearchItem, public dialogRef: MatDialogRef<SearchFormMobileComponent>,
              private service: SearchItemService,
              private local: LocalStorageService
  ) {}

  ngOnInit(): void {
    const initData = new InitDataHelper(this.service, this.local);
    const subCategory = initData.allCategory.subscribe(categories => {
      this.categoryConfig.list = categories;
      if (this.data?.categoryIds !== undefined && this.data?.categoryIds != null ) {
        this.data?.categoryIds?.forEach(el => {
          const find = this.categoryConfig.list.find(item => el.toString() === item.id.toString());
          if (find) {
            find.checked = true;
          }
        });
      }
    });
    const subStore = initData.allStore.subscribe(stores => {
      this.storeConfig.list = stores;
    });

    this.subs.push(subCategory, subStore);

    this.name.setValue(this.data.name);

    this.input.nativeElement.blur();
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.blur();

    const field = document.createElement('input');
    field.setAttribute('type', 'text');
    document.body.appendChild(field);
    setTimeout(() =>  {
      field.focus();
      setTimeout(() =>  {
        field.setAttribute('style', 'display:none;');
      }, 50);
    }, 50);
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el?.unsubscribe());
  }

  handleCategoryChange($event: CheckboxItem): void {
    if ($event.checked) {
      this.data.categoryIds.push($event.id);
    } else {
      const index = this.data.categoryIds.indexOf($event.id);
      if (index > -1) {
        this.data.categoryIds.splice(index, 1);
      }
    }
  }

  handleStoreChange($event: CheckboxItem): void {
    if ($event.checked) {
      this.data.storeIds.push($event.id);
    } else {
      const index = this.data.storeIds.indexOf($event.id);
      if (index > -1) {
        this.data.storeIds.splice(index, 1);
      }
    }
  }

  handlePriceChange($event: MatSliderChange): void  {
    if ($event.value) {
      this.data.priceMax = $event.value;
    } else {
      this.data.priceMax = 10_000;
    }
  }

  closeDialog(): void {
    this.data.name = this.name.value;
    this.dialogRef.close(this.data);
  }

  handleKeyPress($event: KeyboardEvent): void {
    if ($event.key === 'Enter') {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

}
