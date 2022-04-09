import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'hellena-catalogue-display',
  templateUrl: './catalogue-display.component.html',
  styleUrls: ['./catalogue-display.component.css']
})
export class CatalogueDisplayComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  ctx: CanvasRenderingContext2D | null = null;
  rect = { startX: 0, startY: 0, w : 0, h : 0, };
  drag = false;
  offsetLeft = 0;
  offsetTop = 0;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.offsetLeft = this.canvas.nativeElement.offsetLeft;
    this.offsetTop =  this.canvas.nativeElement.offsetTop;
    this.canvas.nativeElement.addEventListener('mousedown', ev => this.mouseDown(ev), false);
    this.canvas.nativeElement.addEventListener('mouseup', ev => this.mouseUp(ev), false);
    this.canvas.nativeElement.addEventListener('mousemove', ev => this.mouseMove(ev), false);
  }

  ngOnDestroy(): void {}

  mouseDown(e: any): void {
    this.rect.startX = e.pageX - this.offsetLeft;
    this.rect.startY = e.pageY - this.offsetTop;
    this.drag = true;
  }

  mouseUp(e: any): void {
    this.drag = false;
  }

  mouseMove(e: any): void {
    if (this.drag) {

      this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
//        this.ctx.drawImage(imageObj,imageObj.width/2,imageObj.width/2);

      this.rect.w = (e.pageX - this.offsetLeft) - this.rect.startX;
      this.rect.h = (e.pageY - this.offsetTop) - this.rect.startY;
      // @ts-ignore
      this.ctx.strokeStyle = 'red';
      this.ctx?.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
    }
  }

}
