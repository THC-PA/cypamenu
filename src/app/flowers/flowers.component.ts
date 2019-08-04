import { Component, Input, OnInit } from "@angular/core";
import { InventoryItem } from 'src/models/inventoryItem.model';
import { CurrentScreenSize } from 'src/models/currentScreenSize.model';
import { InventoryItemParser } from '../services/inventoryItemParser.service';
import { ItemDetailsPopup } from '../itemDetails.popup';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'flowers',
    templateUrl: './flowers.component.html',
    styleUrls: ['./flowers.component.css']
})

export class FlowersComponent implements OnInit {
    @Input() items: InventoryItem[];
    @Input() currentScreenSize: CurrentScreenSize;
    @Input() sortBy: string;
    @Input() selectedFilter: string;

    filterMetadata = { count: 0 };

    constructor(private parser: InventoryItemParser, private dialog: MatDialog){}

    ngOnInit() {
    // alert(this.items.length);
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
   
  /*
getWeight(item: InventoryItem): number {
    return this.parser.getWeight(item);
}*/

getWeight(product: any) {
 // return JSON.stringify(product);
 return this.parser.getWeight(product);
}

getType(item: InventoryItem): string {
    return this.parser.getType(item);
}

getBrand(item: InventoryItem) {
    return this.parser.getBrand(item);
}

getDisplayName(item: string) {
  //console.log('item.products[0].name===>' + JSON.stringify(item));
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
  trackByFn(index: number, item: InventoryItem) {
    return item.id + item.category;
  }

  test(item: any) {
    return JSON.stringify(item);
  }

}