import {Component, ElementRef, OnDestroy, OnInit, ViewChild, NgZone} from '@angular/core';
import {ShoppingListTable, ShoppingListTableItem, ShoppingListTableSum} from '../../ui/shopping-list-table/shopping-list-table';
import {SearchUIService} from '../../search-page/search-ui.service';
import {ShoppingListService} from '../shopping-list.service';
import {Subscription} from 'rxjs';
import {Dialog} from '../../ui/dialog/dialog';
import {DialogService} from '../../ui/dialog/dialog.service';
import {Square} from './square';

@Component({
  selector: 'hellena-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  table: ShoppingListTable = {
    columnNames: ['icon', 'name', 'actions'], // TODO USED IN TWO PLACES, CREATE CONST OR REFACTOR, ALSO SEE OTHER TABLE
    data: [],
    totalCount: 100,
    sum : { sumDone: 0, sumAll: 0 } as ShoppingListTableSum
  } as ShoppingListTable;

  private subs: Subscription[] = [];

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  ctx: CanvasRenderingContext2D | null = this.canvas.nativeElement.getContext('2d');
  requestId =  1 ;
  interval = 200;
  squares: Square[] = [];

  public constructor(private searchUI: SearchUIService, private shoppingListService: ShoppingListService, private dialog: DialogService, private ngZone: NgZone) { }

  ngOnInit(): void {
    const sub = this.searchUI.onTabChange().subscribe(tab => {
      if (tab === 'Popis za kupovinu') {
        this.onTabChange();
      }
    });
    this.subs.push(sub);

    this.ctx = this.canvas.nativeElement.getContext('2d');
    // @ts-ignore
    this.ctx.fillStyle = 'red';
    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      this.tick();
    }, 200);
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


  private onTabChange(): void {
    this.updateShoppingListDataTable();
  }

  private updateShoppingListDataTable(): void {
    this.table.data = [];
    this.table.sum = { sumDone: 0, sumAll: 0 } as ShoppingListTableSum;
    this.shoppingListService.getShoppingList()
        .sort(el => el.isPurchased ? 1 : -1)
        .forEach(el => {
          const item =  {
            id: el.id,
            name: el.name,
            activeTo: el.activeTo,
            icon: el.icon,
            actionPrice: el.actionPrice,
            originalPrice: el.originalPrice,
            store: el.store,
            quantity: el.quantity,
            isPurchased: el.isPurchased,
          } as ShoppingListTableItem;

          this.table.data.push( item );
          const price = item.actionPrice * item.quantity;
          this.table.sum.sumAll += price;
          if (item.isPurchased) {
            this.table.sum.sumDone += price;
          }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => {
      if (el) {
        el.unsubscribe();
      }
    });
  }

  handleClear(): void {
    const dialog = {
      onOF: true,
      content: 'Želite li obrisati popis za kupovinu ?',
      title: 'Popis za kupovinu'
    } as Dialog;

    const sub = this.dialog.openHellenaDialog(dialog)
        .subscribe(res => {
          if (res && this.table) {
            // @ts-ignore
            this.table?.data = [];
            this.shoppingListService.clearShoppingList();
          }
        });
    this.subs.push(sub);
  }

  handleItemDone($event: ShoppingListTableItem): void {

    const dialog = {
      onOF: true,
      content: 'Želite li ' + $event.name + ' označiti kao obavljeno ?',
      title: 'Popis za kupovinu'
    } as Dialog;

    const sub = this.dialog.openHellenaDialog(dialog)
        .subscribe(res => {
          if (res) {
            this.itemDoneUnit($event);
          }
        });
  }

  private itemDoneUnit(element: ShoppingListTableItem): void {
    const items = this.shoppingListService.getShoppingList();
    const item = items.find(el => el.id === element.id);
    if (item) {
      item.isPurchased = true;
      this.shoppingListService.replace(items);
      this.updateShoppingListDataTable();
    }
  }

  handleItemRemove($event: ShoppingListTableItem): void {
    const dialog = {
      onOF: true,
      content: 'Želite li ' + $event.name + ' maknuti sa popisa ?',
      title: 'Popis za kupovinu'
    } as Dialog;

    const sub = this.dialog.openHellenaDialog(dialog)
        .subscribe(res => {
          if (res) {
            this.itemRemoveUtil($event);
          }
        });
  }

  private itemRemoveUtil(item: ShoppingListTableItem): void {
    const items = this.shoppingListService.getShoppingList()
        .filter(el => item.id !== el.id);
    this.shoppingListService.replace(items);
    this.updateShoppingListDataTable();
  }


  handleItemCompare(): void {
    const dialog = this.dialog.openHellenaDialog({
      title: 'Postoji li povoljnije ?',
      onOF: false,
      content: 'Uskoro dostupno'
    } as Dialog ).subscribe(() => {
      // TODO implement
    });
    this.subs.push(dialog);
  }

  handleItemQuantity($event: ShoppingListTableItem): void {
    const dialog = {
      onOF: true,
      content: 'Želite li količinu postaviti na ' +  $event.quantity + ' ?',
      title: 'Popis za kupovinu'
    } as Dialog;

    const sub = this.dialog.openHellenaDialog(dialog)
        .subscribe(res => {
          if (res) {
            this.itemQuantityUtil($event);
          }
        });
  }

  itemQuantityUtil(element: ShoppingListTableItem): void {
    const items = this.shoppingListService.getShoppingList();
    const item = items.find(el => el.id === element.id);
    if (item) {
      item.quantity = element.quantity;
      this.shoppingListService.replace(items);
      this.updateShoppingListDataTable();
    }
  }

}
