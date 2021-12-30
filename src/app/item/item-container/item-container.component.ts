import {Component, OnInit} from '@angular/core';
import {ItemService} from "../item.service";
import {ItemConfiguration} from "../item-configuration";

@Component({
  selector: 'app-item-container',
  templateUrl: './item-container.component.html',
  styleUrls: ['./item-container.component.css'],
  providers: [
    { provide: 'configuration', useClass: ItemConfiguration }
  ]
})
export class ItemContainerComponent implements OnInit {

  constructor(private service: ItemService) { }

  ngOnInit(): void {
    this.service.findAll().subscribe();
  }

}
