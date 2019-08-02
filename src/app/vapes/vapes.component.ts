import { Component, Input, OnInit } from "@angular/core";
import { InventoryItem } from 'src/models/inventoryItem.model';
import { CurrentScreenSize } from 'src/models/currentScreenSize.model';
import { InventoryItemParser } from '../services/inventoryItemParser.service';

@Component({
    selector: 'vapes',
    templateUrl: './vapes.component.html',
    styleUrls: ['./vapes.component.css']
})

export class VapesComponent implements OnInit {
    @Input() items: InventoryItem[];
    @Input() currentScreenSize: CurrentScreenSize;
    @Input() sortBy: string;
    @Input() selectedFilter: string;

    filterMetadata = { count: 0 };

    constructor(private parser: InventoryItemParser){}

    ngOnInit() {
    // alert(this.items.length);
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
    if (this.currentScreenSize.isExtraSmallScreen) {
        return { 'font-size': '10px' };
    }
}

getCardStyle() {
    if (this.currentScreenSize.isExtraSmallScreen) {
      return {
        width: '100px',
        'max-height': '340px',
        'min-height': '290px'
      }
    }

    if (this.currentScreenSize.isSmallScreen) {
      return {
        width: '140px',
        'min-height': '300px'
      }
    }

    if (this.currentScreenSize.isMediumScreen) {
      return {
        width: '150px',
        'min-height': '350px'
      }
    }

    if (this.currentScreenSize.isLargeScreen) {
      return {
        width: '180px',
        'min-height': '360px'
      }
    }

    if (this.currentScreenSize.isExtraLargeScreen) {
      return {
        width: '180px',
        'min-height': '360px'
      }
    }
  }

}