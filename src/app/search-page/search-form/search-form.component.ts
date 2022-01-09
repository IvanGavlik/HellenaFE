import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {InputField} from '../../ui/input-field/input-field';
import {SearchItem} from '../search-item';
import {FormControl, FormGroup} from '@angular/forms';
import {debounce, debounceTime} from 'rxjs';


@Component({
  selector: 'hellena-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {

  @Input()
  search: SearchItem = {} as SearchItem;

  @Output()
  searchEvent = new EventEmitter<SearchItem>();

  searchForm = new FormGroup(
      {
        name: new FormControl(''),
      }
  );



  numberInput: InputField = {
    initValue: 0,
    label: 'Pretraži',
    placeholder: 'Kruh',
    type: 'number'
  } as InputField;


  constructor() { }

  ngOnInit(): void {
    this.searchForm.valueChanges
        .pipe(debounceTime(1000))
        .subscribe(value => {
          console.log('change: ', value);
        });
  }

}
