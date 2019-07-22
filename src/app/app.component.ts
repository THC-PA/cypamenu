import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from 'src/models/menu.model';
import { InventoryItem } from 'src/models/inventoryItem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CY+ New Kensington Menu';
  fullMenu: Menu = new Menu();
  flowers: Array<InventoryItem> = [];
  concentrates: Array<InventoryItem> = [];
  vapes: Array<InventoryItem> = [];
  tinctures:Array<InventoryItem> = [];
  capsules: Array<InventoryItem> = [];
  topicals: Array<InventoryItem> = [];
  accessories: Array<InventoryItem> = [];
  searchComplete: boolean = false;
  searchText: string = '';

  constructor(private httpClient: HttpClient){}

    search() {
      this.clearResults();

      let baseUrl: string = 'https://api.crescolabs.com/p/inventory?limit=1000&search=' + this.searchText;
      let headers = new HttpHeaders();
      headers = headers.set('Accept', ['application/json','text/plain','*/*'])
        .set('ordering_app_id', 'fab9d05c-1bbd-47f0-a1e9-1d2ca132af0d')
        .set('store_id', '229')
        .set('x-api-key', 'wqrVgXbS7J1AalyxdMG6W4QIGRQrnptP2PnV2KfV');

      const options = { headers: headers };

        
      this.httpClient.get<Menu>(baseUrl, options)
        .subscribe(res => {
          this.fullMenu = res;
          this.processMenuResults(res);
          this.searchComplete = true;
        });
    }

    processMenuResults(menu: Menu){
      // TODO: Add code to create a list per category???
      // how to know what categories?  hard code list types?  No need i don't think.
      // Could I create a list for each distinct category? Object per category, since I need a title?  IDK

      //TODO: Something like this... Create a list of lists?? **************************************************************************
      //class SomeClass {
      //public someVariable: Array<Array<AnyTypeYouWant>>;

      menu.data.forEach(item => {
        let category = item.category.toLowerCase(); 
        
        if (category.indexOf('flower') > -1) {
          this.flowers.push(item);
        }
        if (category.indexOf('concentrate') > -1) {
          this.concentrates.push(item);
        }
        if (category.indexOf('vape') > -1) {
          this.vapes.push(item);
        }
        if (category.indexOf('tincture') > -1) {
          this.tinctures.push(item);
        }
        if (category.indexOf('capsule') > -1) {
          this.capsules.push(item);
        }
        if (category.indexOf('topical') > -1) {
          this.topicals.push(item);
        }
        if (category.indexOf('accessories') > -1) {
          this.accessories.push(item);
        }
      });
    }

    clearResults() {
      this.searchComplete = false;
      this.flowers = [];
      this.concentrates = [];
      this.topicals = [];
      this.vapes = [];
      this.tinctures = [];
      this.accessories = [];
    }
}
