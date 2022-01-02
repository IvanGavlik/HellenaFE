import {Component, Input, OnInit} from '@angular/core';
import {InputField} from './input-field';

@Component({
  selector: 'hellena-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  @Input()
  input: InputField = {} as InputField;

  value = '';

  constructor() { }

  ngOnInit(): void {
    if (this.input.initValue) {
      this.value =  this.input?.initValue;
    }

  }

}
