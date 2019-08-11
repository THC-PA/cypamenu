import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from 'src/models/menu.model';
import { InventoryItem } from 'src/models/inventoryItem.model';
import { Store } from 'src/models/store.model';
import { MatDialog } from '@angular/material'; 
import { InventoryItemParser } from './services/inventoryItemParser.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout'; 
import { CurrentScreenSize } from 'src/models/currentScreenSize.model';
import { Subject, from } from 'rxjs';
import { takeUntil, groupBy, mergeMap, toArray, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  items: any[] = [];
  initialLoad = true;
  selectedStore = '229';
  isLoading: boolean = false;
  searchPanelOpenState: boolean = false;

  currentScreenSize: CurrentScreenSize = new CurrentScreenSize();

  stores: Store[] = [
    new Store('New Kensington', '229'),
    new Store('Butler', '202'),
    new Store('Pittsburgh', '203')
  ];
  title = 'CY+ Menu';
  selectedCategory = 'all';
  newWithinHours = 24;

  orientationPortrait: string = '(orientation: portrait)';
  orientationLandscape: string = '(orientation: landscape)';

  cart: InventoryItem[] = [];

  newItems: Array<InventoryItem> = [];

  //orderBy: string = ''

  searchComplete: boolean = false;
  searchText: string = '';
  sortBy: string = 'bt_potency_thca';
  categories: string[] = ['all', 'flower', 'vapes', 'concentrates',
    'tinctures', 'tinctures', 'topicals', 'accessories'];
  filters: string[] = ['All', 'Indica', 'Sativa', 'Hybrid'];
  selectedFilter = 'All';

  constructor(private httpClient: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private itemParser: InventoryItemParser) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result.matches) {
          this.currentScreenSize.isSmall = false;
          this.currentScreenSize.isMedium = false;
          this.currentScreenSize.isLarge = false;
          this.currentScreenSize.isExtraLarge = false;
          this.currentScreenSize.isExtraSmall = true;
        }
      });


    this.breakpointObserver.observe([
      Breakpoints.Small
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result.matches) {
          this.currentScreenSize.isExtraSmall = false;
          this.currentScreenSize.isSmall = true;
          this.currentScreenSize.isMedium = false;
          this.currentScreenSize.isLarge = false;
          this.currentScreenSize.isExtraLarge = false;
        }
      });

    this.breakpointObserver.observe([
      Breakpoints.Medium
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result.matches) {
          this.currentScreenSize.isSmall = false;
          this.currentScreenSize.isExtraSmall = false;
          this.currentScreenSize.isMedium = true;
          this.currentScreenSize.isLarge = false;
          this.currentScreenSize.isExtraLarge = false;
        }
      });

    this.breakpointObserver.observe([
      Breakpoints.Large
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result.matches) {
          this.currentScreenSize.isExtraSmall = false;
          this.currentScreenSize.isSmall = false;
          this.currentScreenSize.isMedium = false;
          this.currentScreenSize.isLarge = true;
          this.currentScreenSize.isExtraLarge = false;
        }
      });

    this.breakpointObserver.observe([
      Breakpoints.XLarge
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result.matches) {
          this.currentScreenSize.isExtraSmall = false;
          this.currentScreenSize.isSmall = false;
          this.currentScreenSize.isMedium = false;
          this.currentScreenSize.isLarge = false;
          this.currentScreenSize.isExtraLarge = true;
        }
      });
    this.title = 'CY+ ' + this.stores.find(x => x.id === this.selectedStore).name + ' Menu';
  }

  ngOnInit() {
    this.search();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  clearCart() {
    this.cart = [];
  }

  storeChanged() {
    this.title = 'CY+ ' + this.stores.find(x => x.id === this.selectedStore).name + ' Menu';
  }
  /*
    addToNewList(item: InventoryItem) {
      if (item.created_ago.toLowerCase().indexOf('hour') > -1
        || item.created_ago.toLowerCase().indexOf('day ago') > -1) {
  
        if (item.category.toLowerCase().indexOf('flower') > -1) {
          let exists = this.newItems.find(filterItem => {
            let first10Incoming = item.name.substr(0, 10);
            let first10Existing = filterItem.name.substr(0, 10);
            if (first10Existing.indexOf(first10Incoming) > -1
              && filterItem.category === item.category) {
              return true;
            }
          });
  
          if (exists) {
            let newWeight = this.itemParser.getWeight(item);
            if (!newWeight) {
              newWeight = this.itemParser.getWeightFromName(item.name);
            }
  
            let existingItem = this.newItems.find(f => f.name.toLowerCase().substr(0, 10).trim() === item.name.toLowerCase().substr(0, 10).trim());
            let index = this.newItems.indexOf(existingItem);
            let newPrice = new Prices(item.price_point.prices[0].price, newWeight, item.price_point.prices[0].price);
  
            if (this.newItems[index].price_point.prices[0].weight !== newPrice.weight) {
              this.newItems[index].price_point.prices.push(newPrice);
            }
          } else {
            let actualWeight = item.bt_weight;
            if (!actualWeight) {
              actualWeight = this.itemParser.getWeightFromName(item.name);
            }
            item.price_point.prices[0].weight = actualWeight;
  
            this.newItems.push(item);
          }
        } else {
          let actualWeight = item.bt_weight;
          if (!actualWeight) {
            actualWeight = this.itemParser.getWeightFromName(item.name);
          }
  
          item.price_point.prices[0].weight = actualWeight;
  
          this.newItems.push(item);
        }
      }
    }
  
    addToFlowers(item: InventoryItem) {
      let exists = this.flowers.find(filterItem => {
        let first10Incoming = item.name.substr(0, 10);
        let first10Existing = filterItem.name.substr(0, 10);
        if (first10Existing.indexOf(first10Incoming) > -1
          && filterItem.category === item.category) {
          return true;
        }
      });
  
      if (exists) {
        let newWeight = this.itemParser.getWeight(item);
        if (!newWeight) {
          newWeight = this.itemParser.getWeightFromName(item.name);
        }
  
        let existingItem = this.flowers.find(f => f.name.toLowerCase().substr(0, 10).trim() === item.name.toLowerCase().substr(0, 10).trim());
        let index = this.flowers.indexOf(existingItem);
        let newPrice = new Prices(item.price_point.prices[0].price, newWeight, item.price_point.prices[0].price);
  
        if (this.flowers[index].price_point.prices[0].weight !== newPrice.weight) {
          this.flowers[index].price_point.prices.push(newPrice);
        }
  
      } else {
        let actualWeight = item.bt_weight;
        if (!actualWeight) {
          actualWeight = this.itemParser.getWeightFromName(item.name);
        }
  
        item.price_point.prices[0].weight = actualWeight;
        
        this.flowers.push(item);
      }
    }*/

  search() {
   // this.isLoading = true;
    //this.clearResults();
    let baseUrl = 'https://api.crescolabs.com/p/inventory?limit=2000';
    //https://shop.cydispensary.com/products/flower?strain_type=indica&order_by=name_desc&order=desc&brand=Ilera
    //https://shop.cydispensary.com/products/vapes?strain_type=hybrid&order_by=name&brand=GTI&cultivator=Cresco%20Labs
   ////https://api.crescolabs.com/p/inventory?category=flower&order_by=name&limit=50&search=cherry

   /*
   if (this.selectedCategory === 'all' && this.selectedFilter === 'All') {
    baseUrl += '/p/inventory?limit=10000';
   } else {
    if (this.selectedCategory !== 'all') {
      baseUrl += '/products/' + this.selectedCategory;
     }
  
     if (this.selectedFilter !== 'All') {
       baseUrl += 'strain_type=' + this.selectedFilter;
     } 

     //TODO: DO NOT SEARCH API, SEARCH LOCALLY IT IS MORE ACCURATE!

   
   if (this.selectedCategory !== 'all') {
    baseUrl += '&category=' + this.selectedCategory;
   } 

   if (this.selectedFilter !== 'All') {
     baseUrl += 'strain_types=' + this.selectedFilter;
   } 
*/

   /* if (this.searchText !== null && this.searchText !== undefined && this.searchText !== '') {
      baseUrl += '&search=' + this.searchText;
    }*/

    let headers = new HttpHeaders();
    headers = headers.set('Accept', ['application/json', 'text/plain', '*/*'])
      .set('ordering_app_id', 'fab9d05c-1bbd-47f0-a1e9-1d2ca132af0d')
      .set('store_id', this.selectedStore)
      .set('x-api-key', 'wqrVgXbS7J1AalyxdMG6W4QIGRQrnptP2PnV2KfV');

    const options = { headers: headers };


    if (this.initialLoad) {
      this.httpClient.get<Menu>(baseUrl, options)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.processMenuResults(res);
        this.initialLoad = false;
      });
    } else {
      console.log('NOT initial load, filtering locally from total items: ' + this.items.length);
     
      let context = this;
     // let filteredList = this.items.map(g => g.filter(i =>  {
       let filteredList = this.items.filter(g => g.every(i => {
        //console.log('WTF IS I?? --> ' + i.type);
        let typeMatch = false; 
        let weightMatch = false; 
        let brandMatch = false;

        if (i.type) {  
          typeMatch = i.type.toLowerCase().indexOf(context.searchText) > -1;
        }

         if(context.itemParser.getBrand(i)) {
          brandMatch = context.itemParser.getBrand(i).toLowerCase().indexOf(context.searchText) > -1;
         }

        if (context.itemParser.getWeight(i)) {
          weightMatch = context.itemParser.getWeight(i).toString().toLowerCase().indexOf(context.searchText) > -1;
        }

        return context.itemParser.getDisplayName(i).toLowerCase().indexOf(context.searchText) > -1
         || brandMatch
         || weightMatch
         || typeMatch
       })); 

      

     //  console.log('filtered list: ' + JSON.stringify(filteredList));
       console.log('items: ' + JSON.stringify(this.items));
       this.items = filteredList;



       /*

          filtered list: [[],[{"id":41487,"location_id":25,"bt_inventory_id":null,"price_point":{"prices":[{"price":70,"units":"","weight":1,"quantity":1,"is_default":true,"location_id":1,"post_tax_price":70,"member_discount_id":0}],"hasErrors":false},"name":"Lime Sorbet LLR Cartridge 500mg","bt_inventory_type_name":null,"bt_product_strain":null,"bt_inventory_strain":null,"bt_remaining_quantity":100,"hidden":false,"updated":"2019-08-06T15:20:21.145Z","bt_weight":0.5,"category":"vapes","sub_category":"live_cartridge","brand_name":null,"sub_category_01":null,"bt_product_category_name":null,"bt_product_vendor_name":null,"product_id":379,"bt_usable_weight":null,"bt_inventory_room_id":null,"bt_inventory_room_name":null,"brand":"RESERVE","image_url_main":null,"image_url_alt":null,"tags":null,"product_strain_id":5,"hash":null,"total_weight":null,"usable_thc":null,"usable_cbd":null,"bt_potency_cbd":null,"bt_potency_cbda":null,"bt_potency_thc":67.64,"bt_potency_thca":5.23,"bt_potency_total":null,"name_override":null,"cultivator":"Cresco Labs","bt_product_name":null,"product":{"id":379,"sku":null,"name":"RESERVE Rest LLR Cart","tags":[],"brand":"RESERVE","hidden":false,"created":"2019-07-24T20:33:19.059177","deleted":null,"effects":[],"flavors":[],"lineage":null,"updated":"2019-07-24T20:33:19.059177","category":"vapes","symptoms":[],"terpenes":[],"exclusive":false,"cultivator":"Cresco Labs","indica_pct":null,"sativa_pct":null,"avg_thc_low":null,"description":null,"strain_type":"indica","avg_thc_high":null,"product_type":"product","sub_category":"live_cartridge","image_url_alt":"https://s3-us-west-2.amazonaws.com/prod-secure-cresco-uploads/f5b7c81f-c25b-4e7f-a91d-6cf43e1dc4da.jpg","image_url_main":"https://s3-us-west-2.amazonaws.com/prod-secure-cresco-uploads/1dc2a4ef-365e-4dcd-b857-21e17cf419b0.jpg","sub_category_01":null,"available_states":null,"is_shown_strain_finder":false},"product_strain":{"id":5,"sku":null,"name":"Indica","tags":null,"brand":null,"hidden":false,"created":"2019-02-28T21:32:16.991294","deleted":null,"effects":null,"flavors":null,"lineage":null,"updated":"2019-02-28T21:32:16.991294","category":null,"symptoms":null,"terpenes":null,"exclusive":false,"cultivator":null,"indica_pct":85,"sativa_pct":15,"avg_thc_low":null,"description":null,"strain_type":"indica","avg_thc_high":null,"product_type":"strain","sub_category":null,"image_url_alt":null,"image_url_main":null,"sub_category_01":null,"available_states":null,"is_shown_strain_finder":null},"store_id":229,"store":{"id":229,"name":"CY+","city":"New Kensington"},"last_updated":"5 days ago","updated_ago":"5 days ago","created_ago":"a month ago"},{"id":41471,"location_id":25,"bt_inventory_id":null,"price_point":{"prices":[{"price":50,"units":"","weight":1,"quantity":1,"is_default":true,"location_id":1,"post_tax_price":50,"member_discount_id":0}],"hasErrors":false},"name":"Kosher Tangie LLR Cartridge 500mg","bt_inventory_type_name":null,"bt_product_strain":null,"bt_inventory_strain":null,"bt_remaining_quantity":100,"hidden":false,"updated":"2019-08-05T19:05:55.287Z","bt_weight":0.5,"category":"vapes","sub_category":"live_cartridge","brand_name":null,"sub_category_01":null,"bt_product_category_name":null,"bt_product_vendor_name":null,"product_id":224,"bt_usable_weight":null,"bt_inventory_room_id":null,"bt_inventory_room_name":null,"brand":"Cresco","image_url_main":null,"image_url_alt":null,"tags":null,"product_strain_id":293,"hash":null,"total_weight":null,"usable_thc":null,"usable_cbd":null,"bt_potency_cbd":null,"bt_potency_cbda":null,"bt_potency_thc":66.016,"bt_potency_thca":9.491,"bt_potency_total":null,"name_override":null,"cultivator":"Cresco Labs","bt_product_name":null,"product":{"id":224,"sku":null,"name":"Cresco Refresh BHO Cart","tags":[],"brand":"Cresco","hidden":false,"created":"2019-06-20T21:48:20.921058","deleted":"2019-07-31T20:29:48.403572","effects":[],"flavors":[],"lineage":null,"updated":"2019-07-31T14:30:07.390087","category":"vapes","symptoms":[],"terpenes":[],"exclusive":false,"cultivator":"Cresco Labs","indica_pct":null,"sativa_pct":null,"avg_thc_low":null,"description":null,"strain_type":"hybrid","avg_thc_high":null,"product_type":"product","sub_category":"cartridge","image_url_alt":"https://s3-us-west-2.amazonaws.com/prod-secure-cresco-uploads/d0a2c0e2-e637-432e-8ecc-8a018b863aed.jpg","image_url_main":"https://s3-us-west-2.amazonaws.com/prod-secure-cresco-uploads/ad1be2da-29ff-4cfd-805f-762f113aac44.jpg","sub_category_01":"bho","available_states":null,"is_shown_strain_finder":false},"product_strain":{"id":293,"sku":null,"name":"Kosher Tangie","tags":[],"brand":null,"hidden":false,"created":"2019-06-24T16:22:41.340401","deleted":null,"effects":["uplifted","relaxed"],"flavors":[],"lineage":"Tangie, Kosher Kush","updated":"2019-06-24T16:22:41.340401","category":null,"symptoms":["depression","stress","pain

       */
        //return i.type.toLowerCase().indexOf(context.searchText) > -1 
       // || context.itemParser.getDisplayName(i).toLowerCase().indexOf(context.searchText) > -1
       // || context.itemParser.getBrand(i).toLowerCase().indexOf(context.searchText) > -1
       // || context.itemParser.getWeight(i).toString().toLowerCase().indexOf(context.searchText) > -1
      //})); 
     // this.items.forEach(group => {})
      // groupBy(item => item.category.toLowerCase()),
      /*from(this.items)
        .pipe(
          //groupBy(item => item.category.toLowerCase()),
          //mergeMap(group => group.pipe(toArray())),
      //    filter(item => this.itemParser.getDisplayName(item).indexOf(this.searchText) > -1),
      //  filter(item => (this.itemParser.getWeight(item) + 'g').indexOf(this.searchText) > -1),
       // filter(item => item.brand.toLowerCase().indexOf(this.searchText) > -1), 
        filter(item => item[0].type.toLowerCase().indexOf(this.searchText) > -1)
        )
        .subscribe(res => {
          console.log('filtered res: ' + res);


          
        });*/
    }
   
  }

  compare(a, b) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }

  processMenuResults(menu: Menu) {
    const context = this;
    let sortOrder = {
      'flower': 0,
      'vapes': 1,
      'concentrates': 2,
      'capsules': 3,
      'tinctures': 4,
      'topicals': 5,
      'accessories': 6
    };

    menu.data.sort(function (a, b) {
      // First compare corresponding values
      var index_result = context.compare(sortOrder[a.category],
        sortOrder[b.category]);

      // If they are equal
      if (index_result === 0) {

        // Return the result of comparing
        return context.compare(a.category, b.category);
      }

      return index_result;
    });

    /*
       source.pipe(
        filter(item => this.itemParser.getDisplayName(item).indexOf(this.searchText) > -1),
        filter(item => (this.itemParser.getWeight(item) + 'g').indexOf(this.searchText) > -1),
        filter(item => item.brand.toLowerCase().indexOf(this.searchText) > -1),
        filter(item => item.type.toLowerCase().indexOf(this.searchText) > -1),
        groupBy(item => item.category.toLowerCase()),
        mergeMap(group => group.pipe(toArray())))
        .subscribe(i => {
          //  console.log('adding item: ' + JSON.stringify(i));
          this.items.push(i);
        });
        */
    const source = from(menu.data);

    /*
      source.pipe(
        filter(item => this.itemParser.getDisplayName(item).indexOf(this.searchText) > -1),
        filter(item => (this.itemParser.getWeight(item) + 'g').indexOf(this.searchText) > -1),
        filter(item => item.brand.toLowerCase().indexOf(this.searchText) > -1),
        filter(item => item.type.toLowerCase().indexOf(this.searchText) > -1),
        groupBy(item => item.category.toLowerCase()),
        mergeMap(group => group.pipe(toArray())))
        .subscribe(i => {
          //  console.log('adding item: ' + JSON.stringify(i));
          this.items.push(i);
        });
   */
      source.pipe(
        groupBy(item => item.category.toLowerCase()),
        mergeMap(group => group.pipe(toArray())))
        .subscribe(i => {
          //  console.log('adding item: ' + JSON.stringify(i));
          this.items.push(i);
        });
      

    source
      .pipe(
        filter(item => (item.created_ago.toLowerCase().indexOf('hour') > -1
          || item.created_ago.toLowerCase().indexOf('day ago') > -1)))
       //   || this.itemParser.getWeight(item).toString().toLowerCase().indexOf('7g') > -1)))
      .subscribe(newItem => this.newItems.push(newItem));


    setTimeout(() => {
      this.isLoading = false;
      this.searchComplete = true;
    }, 100);
    //   if (item.created_ago.toLowerCase().indexOf('hour') > -1
    //  || item.created_ago.toLowerCase().indexOf('day ago') > -1) {
  }

  clearResults() {
    this.items = [];
    this.searchComplete = false;
    this.newItems = [];
  }
}
