import { EventEmitter } from '@angular/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';


export interface SpinnerConfig {
    mode: ProgressSpinnerMode; // Determinate or Indeterminate
    color?: ThemePalette; // primary, accent or warn
    value: number; // no need to set if mode is Indeterminate // TODO VALUE should be Subject
    showProgress: EventEmitter<boolean>;
}
