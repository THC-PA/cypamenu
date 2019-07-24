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

        let filteredItems = items.filter(item => {
            if (item.type) {
               return item.type.indexOf(filter) !== -1;
            } else {
                return items;
            }
        });

        filterMetadata.count = filteredItems.length;
        console.log('set filterMetaData count to : ' + filterMetadata.count);
        return filteredItems;
    }
}