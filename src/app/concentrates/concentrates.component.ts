import { Component, Input, OnInit } from "@angular/core";
import { InventoryItem } from 'src/models/inventoryItem.model';
import { CurrentScreenSize } from 'src/models/currentScreenSize.model';
import { InventoryItemParser } from '../services/inventoryItemParser.service';
import { Product } from 'src/models/product.model';

@Component({
    selector: 'concentrates',
    templateUrl: './concentrates.component.html',
    styleUrls: ['./concentrates.component.css']
})

export class ConcentratesComponent implements OnInit {
    @Input() items: InventoryItem[];
    @Input() currentScreenSize: CurrentScreenSize;
    @Input() sortBy: string;
    @Input() selectedFilter: string;

    filterMetadata = { count: 0 };

    constructor(private parser: InventoryItemParser){}

    ngOnInit() {
    // alert(this.items.length);
    }


    test(item: Product) {
     return JSON.stringify(item);
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
    //return this.parser.getDisplayName(item);
    return item.name;
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