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

        let concatDisplay = item.name;// + ' ' + item.type;

        let searchMask = "3.5g";
        let regEx = new RegExp(searchMask, "ig");
        let replaceMask = "";

        let removedEigth = concatDisplay.replace(regEx, replaceMask);

        let gramMask = "1g";
        let regexGram = new RegExp(gramMask, "ig");

        let flowerMask = "flower";
        let regexFlower = new RegExp(flowerMask, "ig");
        let removedWeight = removedEigth.replace(regexGram, replaceMask);
        let noWeight = removedWeight.replace(regexFlower, replaceMask);

        let noG = "3.5";
        let regexNoG = new RegExp(noG, replaceMask);
        return noWeight.replace(regexNoG, replaceMask);
        
    }

    getBrand(item: InventoryItem): string {
        if (item.cultivator !== null && item.cultivator  !== undefined) {
            return item.cultivator;
        }
    
        if (item.brand !== null && item.brand !== undefined) {
            return item.brand;
        }
    }

    getWeight(item: InventoryItem): string {
        if (item.bt_weight) {
            return item.bt_weight + 'G';
        } else {
            if (item.name.indexOf('3.5') > -1) {
                return 3.5 + 'G';
            } 
            if (item.name.toLowerCase().indexOf('1g') > -1) {
                return 1 + 'G';
            }
        }
    }
}