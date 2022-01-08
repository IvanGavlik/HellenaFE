import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {InputField} from '../../ui/input-field/input-field';
import {SearchItem} from '../search-item';


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


  nameInput: InputField = {
    initValue: 'Sushi',
    label: 'Pretraži',
    placeholder: 'Kruh',
    type: 'text'
  } as InputField;

  numberInput: InputField = {
    initValue: 0,
    label: 'Pretraži',
    placeholder: 'Kruh',
    type: 'number'
  } as InputField;


  constructor() { }

  ngOnInit(): void {}

}
