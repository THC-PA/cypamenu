import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'menuFilter',
    pure: false
})
export class MenuFilterPipe implements PipeTransform {
    transform(items: any[], filter: string, filterMetadata: any): any {
        if (!items || !filter) {
            filterMetadata.count = 0;
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        if (filter === 'All') {
            filterMetadata.count = items.length;
            return items;
        }

       // alert('filtering by: ' + filter);

        let filteredItems = items.filter(item => {
            /*if (item.type) {
              //  alert('type found is: '+ item.type);
               return item.type.toLowerCase().indexOf(filter) !== -1;
            } else {
                return items;
            }*/
            if (item.product_strain) {
                if (item.product_strain.strain_type !== null && item.product_strain.strain_type !== undefined) {

                    let test =  item.product_strain.strain_type.toLowerCase().indexOf(filter.toLowerCase()) > -1;
                  //  console.log('got result: ' + item.product_strain.strain_type);
                    return test;
                } 

                if (item.product.strain_type !== null && item.product.strain_type !== undefined){
                    let result = item.product.strain_type.toLowerCase().indexOf(filter.toLowerCase()) > -1;
                    //console.log('got result: ' + item.product.strain_type);
                    return result;
                }
            }
        });

        filterMetadata.count = filteredItems.length;
     console.log('set filterMetaData count to : ' + filterMetadata.count  + 
            ' For category: ' + items[0].category);
        return filteredItems;
    }
}