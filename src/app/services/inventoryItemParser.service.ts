import { Injectable } from '@angular/core';
import { InventoryItem } from 'src/models/inventoryItem.model';

@Injectable()
export class InventoryItemParser {
    getDisplayName(item: InventoryItem): string { 
        let displayName = item.name;
        let regex = new RegExp(/3.5g/i);
        let eigthRemoved = displayName.replace(regex, '');

        let regex1 = new RegExp(/1g/i);
        let gramRemoved = eigthRemoved.replace(regex1, '');
        
        let regex2 = new RegExp(/7g/i);
        return gramRemoved.replace(regex2, '');



        //let result = item.name.match(/3.5g/i);
       /* if ((item.product && item.product.name) && !item.product_strain) {
            //return item.product.name + ' - ' + item.name + ' ' + item.type;
            return item.name + ' ' + item.type;
        }

        return item.product_strain.name + ' - ' + item.name + ' ' + item.type;    */

        /*let concatDisplay = item.name;// + ' ' + item.type;

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
        let clean1 = noWeight.replace(regexNoG, replaceMask);

        let noQtr1 = "7g";
        let regexNoQtr1 = new RegExp(noQtr1, "ig");
        let clean2 = clean1.replace(regexNoQtr1, replaceMask);

        let noQtr2 = "7G";
        let regexNoQtr2 = new RegExp(noQtr2, "ig");
        return clean2.replace(regexNoQtr2, replaceMask).trim();*/


    }

    getWeightFromName(name: string): number {
      let matchedEigth = name.match(/3.5/i);
      let matchedGram = name.match(/1g/i);
      let matchedQuarter = name.match(/7g/i);

      if (matchedEigth) {
        return 3.5;
      }
      if (matchedGram) {
        return 1;
      }
      if (matchedQuarter) {
        return 7;
      }
      return null;
    }

    getType(item: InventoryItem): string {
        if (item.product_strain !== null && item.product_strain !== undefined){
            // alert('product_strain - sativa: ' + item.product_strain.sativa_pct + ' indica: ' + item.product_strain.indica_pct);
             if (item.product_strain.indica_pct && item.product_strain.indica_pct > 0 
                 && item.product_strain.sativa_pct && item.product_strain.sativa_pct > 0) {
                   
                   if (item.product_strain.indica_pct > item.product_strain.sativa_pct) {
                   //  item.type = 'Indica Dominant Hybrid';
                   return'Indica/Hybrid';
                   } 
                   else if (item.product_strain.sativa_pct > item.product_strain.indica_pct) {
                    return 'Sativa/Hybrid';
                   } 
                   else if (item.product_strain.indica_pct == 0) {
                   
                    return'Sativa';
                   }
                   else if (item.product_strain.sativa_pct == 0){
                    return 'Indica';
                   }
                   else {
                     //item.type = item.product_strain.strain_type;
                     return'Hybrid';
                   }
             } 
             else if(item.product_strain) {
               if (item.product_strain.strain_type){
                 if (item.product_strain.strain_type == 'indica'){
                    return 'Indica';
                 } else if (item.product_strain.strain_type == 'sativa') {
                    return 'Sativa';
                 } else { 
                    return  'Hybrid';
                 }
               } 
             } else { 
               let hasIndicaInName = item.product_strain.name.toLowerCase().indexOf('indica') > -1;
               let hasSativaInName = item.product_strain.name.toLocaleLowerCase().indexOf('sativa') > -1;
               let hasHybridInName = item.product_strain.name.toLocaleLowerCase().indexOf('hybrid') > -1;
               let hasCbdInName = item.product_strain.name.toLowerCase().indexOf('cbd') > -1;
 
               let hasIndicaInPName = item.product.name.toLowerCase().indexOf('indica') > -1;
               let hasSativaInPName = item.product.name.toLowerCase().indexOf('sativa') > -1;
               let hasHybriInPName = item.product.name.toLowerCase().indexOf('hybrid') > -1;
               let hasCbdInPName = item.product.name.toLowerCase().indexOf('cbd') > -1;
 
               
               if (hasCbdInName || hasCbdInPName) {
                 item.type = '(CBD Dominant)';
               }
               if ((hasIndicaInName || hasIndicaInPName) && (hasHybridInName || hasHybriInPName)){
                 //item.type = '(H/I)';
                 item.type = 'Indica/Hybrid';
               }
               else if ((hasIndicaInName || hasIndicaInPName) && !(hasHybridInName || hasHybriInPName)){
                 item.type = 'Indica';
               }
               else if ((hasSativaInName || hasSativaInPName) && (hasHybridInName || hasHybriInPName)) {
                 item.type = 'Sativa/Hibrid';
               }
               else if ((hasSativaInName || hasSativaInPName) && !(hasHybridInName || hasHybriInPName)) {
                   
                 item.type = 'Sativa';
               }
               else {
                 item.type = 'Unknown type';
               }
             }
           } else {
             item.type = 'Hybrid'
           }
    }

    getTypeAbbreviated(item: InventoryItem): string {
        if (item.product_strain !== null && item.product_strain !== undefined){
            // alert('product_strain - sativa: ' + item.product_strain.sativa_pct + ' indica: ' + item.product_strain.indica_pct);
             if (item.product_strain.indica_pct && item.product_strain.indica_pct > 0 
                 && item.product_strain.sativa_pct && item.product_strain.sativa_pct > 0) {
                   
                   if (item.product_strain.indica_pct > item.product_strain.sativa_pct) {
                   //  item.type = 'Indica Dominant Hybrid';
                   return'(H/I)';
                   } 
                   else if (item.product_strain.sativa_pct > item.product_strain.indica_pct) {
                    return '(H/S)';
                   } 
                   else if (item.product_strain.indica_pct == 0) {
                    return'(S)';
                   }
                   else if (item.product_strain.sativa_pct == 0){
                    return '(I)';
                   }
                   else {
                     //item.type = item.product_strain.strain_type;
                     return'(H)';
                   }
             } 
             else if(item.product_strain) {
               if (item.product_strain.strain_type){
                 if (item.product_strain.strain_type == 'indica'){
                    return '(I)';
                 } else if (item.product_strain.strain_type == 'sativa') {
                    return '(S)';
                 } else { 
                    return  '(H)';
                 }
               } 
             } else { 
               let hasIndicaInName = item.product_strain.name.toLowerCase().indexOf('indica') > -1;
               let hasSativaInName = item.product_strain.name.toLocaleLowerCase().indexOf('sativa') > -1;
               let hasHybridInName = item.product_strain.name.toLocaleLowerCase().indexOf('hybrid') > -1;
               let hasCbdInName = item.product_strain.name.toLowerCase().indexOf('cbd') > -1;
 
               let hasIndicaInPName = item.product.name.toLowerCase().indexOf('indica') > -1;
               let hasSativaInPName = item.product.name.toLowerCase().indexOf('sativa') > -1;
               let hasHybriInPName = item.product.name.toLowerCase().indexOf('hybrid') > -1;
               let hasCbdInPName = item.product.name.toLowerCase().indexOf('cbd') > -1;
 
               
               if (hasCbdInName || hasCbdInPName) {
                 item.type = '(CBD Dominant)';
               }
               if ((hasIndicaInName || hasIndicaInPName) && (hasHybridInName || hasHybriInPName)){
                 item.type = '(H/I)';
               }
               else if ((hasIndicaInName || hasIndicaInPName) && !(hasHybridInName || hasHybriInPName)){
                 item.type = '(I)';
               }
               else if ((hasSativaInName || hasSativaInPName) && (hasHybridInName || hasHybriInPName)) {
                 item.type = '(H/S)';
               }
               else if ((hasSativaInName || hasSativaInPName) && !(hasHybridInName || hasHybriInPName)) {
                 item.type = '(S)';
               }
               else {
                 item.type = 'Unknown type';
               }
 
 
             }
           } else {
             item.type = '(H?)'
           }
    }

    getBrand(item: InventoryItem): string {
        if (item.cultivator !== null && item.cultivator  !== undefined) {
            return item.cultivator;
        }
    
        if (item.brand !== null && item.brand !== undefined) {
            return item.brand;
        }
    }

    getWeight(item: InventoryItem): number {
        if (item.bt_weight) {
            return item.bt_weight;
        } else {
            if (item.name.indexOf('3.5') > -1) {
                return 3.5;
            } 
            if (item.name.toLowerCase().indexOf('1g') > -1) {
                return 1;
            }
            if (item.name.toLowerCase().indexOf('7g') > -1) {
              return 7;
            }
        }
    }

    getDescription(item: InventoryItem): string {
      if (item.product_strain && item.product_strain.description) {
        return item.product_strain.description;
      }
      if (!item.product_strain && item.product && item.product.description) {
        return item.product.description;
      }
    }
}