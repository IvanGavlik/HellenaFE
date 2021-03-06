import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
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
import {SearchUIService} from '../../search-ui.service';

@Component({
  selector: 'hellena-search-form-mobile',
  templateUrl: './search-form-mobile.component.html',
  styleUrls: ['./search-form-mobile.component.css']
})
export class SearchFormMobileComponent implements OnInit, OnDestroy {

  name = new FormControl('');

  storeConfig = {
    title: 'Trgovina',
    list: []
  } as CheckboxConfig;

  categoryConfig = {
    title: 'Kategorija',
    list: []
  } as CheckboxConfig;

  loaded = false;

  @ViewChild('input') input = {} as ElementRef;

  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: SearchItem, public dialogRef: MatDialogRef<SearchFormMobileComponent>,
              public searchUI: SearchUIService,
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
      if (this.data?.storeIds !== undefined && this.data?.storeIds != null ) {
        this.data?.storeIds?.forEach(el => {
          const find = this.storeConfig.list.find(item => el.toString() === item.id.toString());
          if (find) {
            find.checked = true;
          }
        });
      }
    });

    this.subs.push(subCategory, subStore);

    this.name.setValue(this.data.name);

    const autocompleteName = this.name.valueChanges
        .subscribe(value => this.searchUI.autocompleteNameStart(value));
    this.subs.push(autocompleteName);
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

  handleFocus($event: FocusEvent): void {
    if (this.loaded) {
      return;
    } else {
      this.input.nativeElement.blur();
      $event.stopPropagation();
      $event.preventDefault();
      this.loaded = true;
    }
  }
}
