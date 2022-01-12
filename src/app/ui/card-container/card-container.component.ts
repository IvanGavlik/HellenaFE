import {Component, Input, OnInit} from '@angular/core';
import {CardContainer} from './card-container';
import {Router} from '@angular/router';
import {SearchItem} from '../../search-page/search-item';

@Component({
  selector: 'hellena-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {

  @Input()
  cardContainer: CardContainer = {} as CardContainer;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  navigateToSearch(): void {
    // TODO najpovoljnije danas
//    this.router.navigateByUrl('/search', { state: { name: 'Kr' } as SearchItem });
    this.router.navigateByUrl('/search');
  }
}
