import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SpinnerConfig} from './spinner-config';
import {Observable, of, Subscription, switchAll} from 'rxjs';

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

  constructor() { }

  ngOnInit(): void {
    this.sub = this.spinner.showProgress.subscribe(show => {
      this.showMatProgress = show;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
