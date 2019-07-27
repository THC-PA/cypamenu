import { Injectable } from '@angular/core';
import { InventoryItem } from 'src/models/inventoryItem.model';

@Injectable()
export class InventoryItemParser {
    getDisplayName(item: InventoryItem): string { 
       /* if ((item.product && item.product.name) && !item.product_strain) {
            //return item.product.name + ' - ' + item.name + ' ' + item.type;
            return item.name + ' ' + item.type;
        }

        return item.product_strain.name + ' - ' + item.name + ' ' + item.type;    */

        return item.name + ' ' + item.type;
    }
}