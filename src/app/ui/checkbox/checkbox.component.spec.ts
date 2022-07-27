import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import {CheckboxConfig, CheckboxItem} from './checkbox-config';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';

// create describe for each data setting
// data setting shoout test onw feature
// every it one assertion
// every describe must check that html view is rendered correctly
describe('CheckboxComponent config', () => {
    let component: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;
    let debugElement: DebugElement;
    const componentTitle = 'Title';
    const checked = { id: 1, value: 'first el', checked: true } as CheckboxItem;
    const notChecked = { id: 2, value: 'second el', checked: false } as CheckboxItem;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatCheckboxModule],
            declarations: [ CheckboxComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxComponent);
        component = fixture.componentInstance;
        component.config = {
            list: [
                notChecked,
                checked
            ],
            title: componentTitle
        } as CheckboxConfig;
        fixture.detectChanges();
        debugElement = fixture.debugElement;
    });

    it('create', () => {
        expect(component).toBeTruthy();
    });

    it('display title', () => {
        const title = debugElement.query(By.css('#hellena-checkbox-title-' + componentTitle));
        expect(title.nativeElement.textContent).toBe(componentTitle);
    });

    it('display checked element', () => {
        const el = debugElement.query(By.css('#hellena-checkbox-element-' + componentTitle + '-1'));
        expect(el.nativeElement.innerText).toBe(checked.value);
        expect(debugElement.query(By.css('[aria-checked="true"]'))).toBeTruthy();
    });

    it('display not checked element', () => {
        const el = debugElement.query(By.css('#hellena-checkbox-element-' + componentTitle + '-2'));
        expect(el.nativeElement.innerText).toBe(notChecked.value);
        expect(debugElement.query(By.css('[aria-checked="false"]'))).toBeTruthy();
    });
});

/**
 * TODO
 *        component.onChange.subscribe(changed => {
 *             const checked = {...notChecked, checked: true };
 *             expect(changed)
 *                .toEqual(checked);
 *         });
 *
 *         component.handleSelect(null, notChecked);

describe('CheckboxComponent view', () => {

});
 */
