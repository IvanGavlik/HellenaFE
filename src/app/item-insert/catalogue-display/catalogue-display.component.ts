import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Square} from './square';

@Component({
  selector: 'hellena-catalogue-display',
  templateUrl: './catalogue-display.component.html',
  styleUrls: ['./catalogue-display.component.css']
})
export class CatalogueDisplayComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  ctx: CanvasRenderingContext2D | null = null;
  requestId =  1 ;
  interval = 200;
  squares: Square[] = [];

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    // @ts-ignore
    this.ctx.fillStyle = 'red';
    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      this.tick();
    }, 200);
  }

  ngOnDestroy(): void {
  }

  tick(): void {
    this.ctx?.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.squares.forEach((square: Square) => {
      square.moveRight();
    });
    this.requestId = requestAnimationFrame(() => this.tick);
  }

  play(): void {
    const square = new Square(this.ctx);
    this.squares = this.squares.concat(square);
  }

}
