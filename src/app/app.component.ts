import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from 'src/models/menu.model';
import { InventoryItem } from 'src/models/inventoryItem.model';
import { Store } from 'src/models/store.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedStore = '229';
  isLoading: boolean = false;
  stores: Store[] = [
    new Store('New Kensington', '229'),
    new Store('Butler', '202'),
    new Store('Pittsburgh', '203')
  ];
  flowerResult: Array<InventoryItem> = [];
  title = 'CY+ Menu';
  selectedCategory = 'all';
  filterMetadata = { count: 3 };
  newWithinHours = 24;
  fullMenu: Menu = new Menu();
  flowers: Array<InventoryItem> = [];
  newItems: Array<InventoryItem> = [];
  concentrates: Array<InventoryItem> = [];
  vapes: Array<InventoryItem> = [];
  tinctures:Array<InventoryItem> = [];
  capsules: Array<InventoryItem> = [];
  topicals: Array<InventoryItem> = [];
  accessories: Array<InventoryItem> = [];
  searchComplete: boolean = false;
  searchText: string = '';
  sortBy: string = 'bt_potency_thca';
  categories:string[] = ['all', 'flower', 'vapes', 'concentrates',
    'tinctures', 'tinctures', 'topicals', 'accessories'];
    filters: string[] = ['All', 'Indica', 'Sativa', 'Hybrid'];
    selectedFilter = 'All';

  constructor(private httpClient: HttpClient){
    this.title = 'CY+ ' + this.stores.find(x => x.id === this.selectedStore).name + ' Menu';
  }

  ngOnInit() {
    this.search();
  }

  filterChanged() {

  }

  storeChanged() {
    this.title = 'CY+ ' + this.stores.find(x => x.id === this.selectedStore).name + ' Menu';
  }

  categoryChanged() {
    this.clearResults();
  }

    search() {
      this.isLoading = true;
      this.clearResults();

      let baseUrl: string = 'https://api.crescolabs.com/p/inventory?limit=1000';

      if (this.searchText !== null && this.searchText !== undefined && this.searchText !== '') {
        baseUrl += '&search=' + this.searchText;
      }

      if (this.selectedCategory !== 'all') {
        baseUrl += '&category=' + this.selectedCategory;
      }
 
      let headers = new HttpHeaders();
      headers = headers.set('Accept', ['application/json','text/plain','*/*'])
        .set('ordering_app_id', 'fab9d05c-1bbd-47f0-a1e9-1d2ca132af0d')
        .set('store_id', this.selectedStore)
        .set('x-api-key', 'wqrVgXbS7J1AalyxdMG6W4QIGRQrnptP2PnV2KfV');

      const options = { headers: headers };

        
      this.httpClient.get<Menu>(baseUrl, options)
        .subscribe(res => {
          this.fullMenu = res;
          this.processMenuResults(res);
          this.searchComplete = true;
          this.isLoading = false;
        });
    }

    processMenuResults(menu: Menu){ 
      menu.data.forEach(item => {
        let category = item.category.toLowerCase(); 

       // if (category.indexOf('flower') > -1) {
        //  if (item.product !== null && item.product !== undefined){
           // alert('product - sativa: ' + item.product.sativa_pct + ' indica: ' + item.product.indica_pct);
         // }
       /*  if (item.bt_potency_cbd && (item.bt_potency_cbd > item.bt_potency_thc || item.bt_potency_cbd > item.bt_potency_) ) {
           
          item.type = '(CBD Dominant)'
         }*/
          if (item.product_strain !== null && item.product_strain !== undefined){
           // alert('product_strain - sativa: ' + item.product_strain.sativa_pct + ' indica: ' + item.product_strain.indica_pct);
            if (item.product_strain.indica_pct && item.product_strain.indica_pct > 0 
                && item.product_strain.sativa_pct && item.product_strain.sativa_pct > 0) {
                  
                  if (item.product_strain.indica_pct > item.product_strain.sativa_pct) {
                  //  item.type = 'Indica Dominant Hybrid';
                  item.type = '(H/I)';
                  } 
                  else if (item.product_strain.sativa_pct > item.product_strain.indica_pct) {
                    item.type = '(H/S)';
                  } 
                  else if (item.product_strain.indica_pct == 0) {
                    item.type = '(S)';
                  }
                  else if (item.product_strain.sativa_pct == 0){
                    item.type = '(I)';
                  }
                  else {
                    //item.type = item.product_strain.strain_type;
                    item.type = '(H)';
                  }
            } 
            else if(item.product_strain) {
              if (item.product_strain.strain_type){
                if (item.product_strain.strain_type == 'indica'){
                  item.type = '(I)';
                } else if (item.product_strain.strain_type == 'sativa') {
                  item.type = '(S)';
                } else { 
                  item.type = '(H)';
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
         
        /*if (item.updated !== null && item.updated !== undefined) {
          let oneDay = 60 * 60 * 24 * 1000;
          let now = new Date().getTime();
          let updated = new Date(item.updated).getTime();
         // let result = now - updated;

          
          if (item.name.toLowerCase().indexOf('lucinda') > -1 && item.name.toLowerCase().indexOf('7g') > -1) {
         
          }
      
          if ((now - updated) < oneDay) {
            //alert('new item name: ' + item.name + 'updated date: ' + item.updated);
           this.newItems.push(item);
         }
         
        }*/


        if (item.created_ago !== null && item.created_ago !== undefined) {
           
          if (item.created_ago.toLowerCase().indexOf('hour') > -1 
          ||  item.created_ago.toLowerCase().indexOf('day ago') > -1) {
              this.newItems.push(item);
             // let createdAgoStr = item.created_ago.substring(0, 2).trim();

             // let createdAgo = parseInt(createdAgoStr);
              
              //if (createdAgo < this.newWithinHours) {
             //   this.newItems.push(item);
             // }
            
            }
          
        /*  if (item.name.toLowerCase().indexOf('lucinda') > -1) {
            alert(createdAgoStr);

          alert(parseInt(createdAgoStr));
          }
          let createdAgo = parseInt(createdAgoStr);

          if (createdAgo < 2) {
            this.newItems.push(item);
          }*/
        }

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
      this.newItems = [];
      this.flowers = [];
      this.capsules = [];
      this.concentrates = [];
      this.topicals = [];
      this.vapes = [];
      this.tinctures = [];
      this.accessories = [];
    } 
}
