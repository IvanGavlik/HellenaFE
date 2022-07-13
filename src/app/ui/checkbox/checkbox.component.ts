import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CheckboxConfig, CheckboxItem} from './checkbox-config';

@Component({
  selector: 'hellena-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {

  @Input()
  config: CheckboxConfig = {} as CheckboxConfig;

  @Output()
  onChange: EventEmitter<CheckboxItem> = new EventEmitter<CheckboxItem>();

  constructor() { }

  handleSelect($event: any, element: CheckboxItem) {
    element.checked = !element.checked;
    this.onChange.emit(element);
  }
}
