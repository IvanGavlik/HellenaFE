import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import {CheckboxConfig, CheckboxItem} from './checkbox-config';

describe('CheckboxComponent', () => {
    let component: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ CheckboxComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('checkbox item selected', () => {
        const notChecked = { id: 1, value: 'first el', checked: false } as CheckboxItem;
        component.config = {
            list: [
                notChecked,
            ],
            title: 'Title'
        } as CheckboxConfig;

        component.onChange.subscribe(changed => {
            const checked = {...notChecked, checked: true };
            expect(changed)
               .toEqual(checked);
        });

        component.handleSelect(null, notChecked);

    });
});
