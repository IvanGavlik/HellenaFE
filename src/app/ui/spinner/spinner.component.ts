import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {SpinnerConfig} from './spinner-config';
import {of, Subscription} from 'rxjs';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Dialog} from '../dialog/dialog';

@Component({
  selector: 'hellena-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  @Input()
  spinner: SpinnerConfig = {
    color : 'primary',
    mode : 'indeterminate',
    value: 50,
    showProgress: of(true)
  } as SpinnerConfig;

  showMatProgress = true;
  sub: Subscription = new Subscription();

  // when input comes from dialog
  constructor(@Inject(MAT_DIALOG_DATA) public configuration: SpinnerConfig) {
  }

  ngOnInit(): void {
    this.sub = this.spinner.showProgress.subscribe(show => {
      this.showMatProgress = show;
    });
    if (this.configuration) {
      this.spinner = this.configuration;
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
