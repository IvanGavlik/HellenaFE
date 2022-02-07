import {Injectable} from '@angular/core';

@Injectable()
export class NativeWindow {
    getWindow(): Window {
        return window;
    }
}
