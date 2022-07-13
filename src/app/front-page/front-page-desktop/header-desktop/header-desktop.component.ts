import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hellena-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.css']
})
export class HeaderDesktopComponent implements OnInit {

  carouselOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    margin: 5,
    responsive: {
      0: {
        items: 1,
        dots: false,
        stagePadding: 30
      },
      400: {
        items: 1,
        dots: false,
        stagePadding: 50
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  };

  cards = [{ img: '../../../../assets/image/h01.jpg', url: '' } as ImageBox, { img: '../../../../assets/image/images.png', url: '' } as ImageBox]

  constructor() { }

  ngOnInit(): void {
  }

}

interface ImageBox {
  img: string;
  url: string;
}
