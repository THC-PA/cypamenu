import { Component, Input, OnInit } from "@angular/core";
import { InventoryItem } from 'src/models/inventoryItem.model';
import { CurrentScreenSize } from 'src/models/currentScreenSize.model';
import { InventoryItemParser } from '../services/inventoryItemParser.service';
import { MatDialog } from '@angular/material';
import { ItemDetailsPopup } from '../itemDetails.popup';

@Component({
  selector: 'tinctures',
  templateUrl: './tinctures.component.html',
  styleUrls: ['./tinctures.component.css']
})

export class TincturesComponent implements OnInit {
  @Input() items: InventoryItem[];
  @Input() currentScreenSize: CurrentScreenSize;
  @Input() sortBy: string;
  @Input() selectedFilter: string;

  //filterMetadata = { count: 0 };

  constructor(private parser: InventoryItemParser, private dialog: MatDialog) { }

  ngOnInit() {
    // alert(this.items.length);
  }


  trackByFn(index, item: InventoryItem) {
    return item.id;
  }

  displayDetails(item: InventoryItem): void {
    const dialogRef = this.dialog.open(ItemDetailsPopup, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        //  this.cart.push(result);
      }
    });
  }

  getWeight(item: InventoryItem): number {
    return this.parser.getWeight(item);
  }

  getType(item: InventoryItem): string {
    return this.parser.getType(item);
  }

  getBrand(item: InventoryItem) {
    return this.parser.getBrand(item);
  }

  getDisplayName(item: InventoryItem) {
    return this.parser.getDisplayName(item);
  }

  getPotencyListStyle() {
    if (this.currentScreenSize.isExtraSmall) {
      return { 'font-size': '10px' };
    }
  }

  getCardStyle() {
    if (this.currentScreenSize.isExtraSmall) {
      return {
        width: '100px',
        'max-height': '340px',
        'min-height': '290px'
      }
    }

    if (this.currentScreenSize.isSmall) {
      return {
        width: '140px',
        'min-height': '300px'
      }
    }

    if (this.currentScreenSize.isMedium) {
      return {
        width: '150px',
        'min-height': '350px'
      }
    }

    if (this.currentScreenSize.isLarge) {
      return {
        width: '180px',
        'min-height': '360px'
      }
    }

    if (this.currentScreenSize.isExtraLarge) {
      return {
        width: '180px',
        'min-height': '360px'
      }
    }
  }

}