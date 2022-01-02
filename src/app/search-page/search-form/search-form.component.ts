import { Component, OnInit } from '@angular/core';
import {InputField} from '../../ui/input-field/input-field';

@Component({
  selector: 'hellena-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
