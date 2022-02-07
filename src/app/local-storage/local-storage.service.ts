import { Injectable } from '@angular/core';
import {NativeWindow} from './native-window';

@Injectable()
export class LocalStorageService {

  constructor(private nativeWindow: NativeWindow) { }

  public clear(): void {
    this.getLocalStorage().clear();
  }

  public getItem(key: string): string | null {
    return this.getLocalStorage().getItem(key);
  }

  public addItem(key: string, value: string): void {
    return this.getLocalStorage().setItem(key, value);
  }

  public removeItem(key: string): void {
    return this.getLocalStorage().removeItem(key);
  }

  private getLocalStorage(): Storage {
    return this.nativeWindow.getWindow().localStorage;
  }
}
