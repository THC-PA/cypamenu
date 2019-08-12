import { Pipe, PipeTransform } from '@angular/core';
import { InventoryItemParser } from '../services/inventoryItemParser.service';
import { InventoryItem } from 'src/models/inventoryItem.model';

@Pipe({
    name: 'GroupByName',
    pure: false
})
export class GroupByNamePipe implements PipeTransform {

    constructor(private parser: InventoryItemParser) {}

    transform(collection: Array<InventoryItem>, groupMetaData: any): Array<any> {

        groupMetaData.count = 0;
        if(!collection) {
            return null;
        }

        const groupedCollection = collection
          .reduce((previous, current)=> {
           // let substringLength = current.name.length - 4;
          //  console.log('substring  -- ' + current.name.toLowerCase().substr(0, substringLength));
                /*if(!previous[current.name.toLowerCase().substr(0, 10)]) {
                    previous[current.name.toLowerCase().substr(0, 10)] = [current];
                }
                else {
                    previous[current.name.toLowerCase().substr(0, 10)].push(current);
                }*/

                if(!previous[this.parser.getDisplayName(current)]) {
                    previous[this.parser.getDisplayName(current)] = [current];
                }
                else {
                    previous[this.parser.getDisplayName(current)].push(current);
                }

             
            return previous;
        }, {});


        let result =  Object.keys(groupedCollection).map(key => ({
            label: key,
            products: groupedCollection[key]
        }));

        groupMetaData.count = result.length;
        return result;
    }
} 