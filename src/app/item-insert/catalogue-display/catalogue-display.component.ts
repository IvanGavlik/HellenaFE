import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ItemInsert} from './item-insert';
import {CatalogueDisplayService} from './catalogue-display.service';
import {CatalogueConfiguration} from './catalogue-configuration';
import {Dialog} from '../../ui/dialog/dialog';
import {DialogService} from '../../ui/dialog/dialog.service';
import {Subscription} from 'rxjs';
import {SpinnerConfig} from '../../ui/spinner/spinner-config';

@Component({
  selector: 'hellena-catalogue-display',
  templateUrl: './catalogue-display.component.html',
  styleUrls: ['./catalogue-display.component.css'],
  providers: [
    { provide: 'configuration', useClass: CatalogueConfiguration}
  ]
})
export class CatalogueDisplayComponent implements OnInit, OnDestroy {

  @Input()
  user = '';

  @Output()
  addedItem: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('catalogue', { static: true }) catalogue: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  ctx: CanvasRenderingContext2D | null = null;
  rect = { startX: 0, startY: 0, w : 0, h : 0, };
  imageObj = new Image();
  drag = false;
  offsetLeft = 0;
  offsetTop = 0;

  @ViewChild('item', { static: true }) item: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  catalogueForm = new FormGroup({
    name: new FormControl(null),
    category: new FormControl(''),
    price: new FormControl(''),
    actionPrice: new FormControl(''),
    priceFrom: new FormControl(''),
    priceTo: new FormControl(''),
    store: new FormControl(''),
  });

  private subs: Subscription[] = [];

  constructor(private service: CatalogueDisplayService, private dialog: DialogService) { }

  ngOnInit(): void {
    this.ctx = this.catalogue.nativeElement.getContext('2d');
    this.imageObj.onload = (event) => this.loadImage(event, this.ctx);
    this.offsetLeft = this.catalogue.nativeElement.offsetLeft;
    this.offsetTop =  this.catalogue.nativeElement.offsetTop;
    this.catalogue.nativeElement.addEventListener('mousedown', ev => this.mouseDown(ev), false);
    this.catalogue.nativeElement.addEventListener('mouseup', ev => this.mouseUp(ev), false);
    this.catalogue.nativeElement.addEventListener('mousemove', ev => this.mouseMove(ev), false);
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => {
      if (el) {
        el.unsubscribe();
      }
    });
  }

  //  https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas
  handleLoadImageFile($event: any): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageObj = new Image();
      this.imageObj.onload = () => {
        this.drawImage(this.ctx);
      };
      this.imageObj.src = event.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
  }

  loadImage(event: any, ctx: CanvasRenderingContext2D | null): void {
    this.drawImage(ctx);
  }

  drawImage(ctx: CanvasRenderingContext2D | null): void {
    ctx?.drawImage(this.imageObj, 0, 0, 1775, 1775, 0, 0, 1775, 1775);
  }

  mouseDown(e: any): void {
    this.rect.startX = e.pageX - this.offsetLeft;
    this.rect.startY = e.pageY - this.offsetTop;
    this.drag = true;
  }

  mouseUp(e: any): void {
    this.drag = false;
    this.doAction();
  }

  mouseMove(e: any): void {
    if (this.drag) {

      this.ctx?.clearRect(0, 0, this.catalogue.nativeElement.width, this.catalogue.nativeElement.height);
      this.drawImage(this.ctx);

      this.rect.w = (e.pageX - this.offsetLeft) - this.rect.startX;
      this.rect.h = (e.pageY - this.offsetTop) - this.rect.startY;
      // @ts-ignore
      this.ctx.strokeStyle = 'red';
      this.ctx?.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
    }
  }

  doAction(): void {
    const ctx = this.item.nativeElement.getContext('2d');
    ctx?.clearRect(0, 0, this.item.nativeElement.width, this.item.nativeElement.height);
    ctx?.drawImage(this.catalogue.nativeElement, this.rect.startX, this.rect.startY, this.rect.w, this.rect.h, 0, 0, this.rect.w, this.rect.h);
  }

  // display data
  handleItemSubmit(): void {
    const item = {
      name: this.catalogueForm.value.name,
      orginalPrice: this.catalogueForm.value.price,
      actionPrice: this.catalogueForm.value.actionPrice,
      activeFrom: this.catalogueForm.value.priceFrom,
      activeTo: this.catalogueForm.value.priceTo,
      store: this.catalogueForm.value.store,
      category: this.catalogueForm.value.category,
      imageContent: this.item.nativeElement.toDataURL(),
      image: this.catalogueForm.value.name,
      user: this.user
    } as ItemInsert;
    console.log('insert ', item);
    const service = this.service.save(item).subscribe(
        res => this.submitOk(),
        error => this.submitNOk(error));
    this.subs.push(service);
  }

  private submitOk(): void {
    this.addedItem.emit();
    // everyting ok
    const dialog = {
      onOF: false,
      content: 'Saved',
      title: 'Item saved'
    } as Dialog;

    const sub = this.dialog.openHellenaDialog(dialog).subscribe(() => {});
    this.subs.push(sub);

    // clear form
    this.catalogueForm.controls['name'].setValue(null);
    this.catalogueForm.controls['price'].setValue(null);
    this.catalogueForm.controls['actionPrice'].setValue(null);
    this.catalogueForm.controls['priceFrom'].setValue(null);
    this.catalogueForm.controls['priceTo'].setValue(null);
    this.catalogueForm.controls['store'].setValue(null);
    this.catalogueForm.controls['category'].setValue(null);
    // clear image box
    const ctx = this.item.nativeElement.getContext('2d');
    ctx?.clearRect(0, 0, this.item.nativeElement.width, this.item.nativeElement.height);
  }

  private submitNOk(error: any): void {
    const dialog = {
      onOF: false,
      content: error.error + ' ' + error.message,
      title: 'Item not saved'
    } as Dialog;

    const sub = this.dialog.openHellenaDialog(dialog).subscribe(() => {});
    this.subs.push(sub);
  }
}
