import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from 'src/models/menu.model';
import { InventoryItem } from 'src/models/inventoryItem.model';
import { Store } from 'src/models/store.model';
import { MatDialog } from '@angular/material'; 
import { ItemDetailsPopup } from './itemDetails.popup';
import { InventoryItemParser } from './services/inventoryItemParser.service';
import { BreakpointObserver, BreakpointState, Breakpoints} from '@angular/cdk/layout';
import { Prices } from 'src/models/prices.model';
import { CurrentScreenSize } from 'src/models/currentScreenSize.model';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  
  selectedStore = '229';
  isLoading: boolean = false;
  searchPanelOpenState: boolean = false;
  
  currentScreenSize: CurrentScreenSize = new CurrentScreenSize();

  //isHandset: boolean = false;

  isOrientationPortrait : boolean = true;
  stores: Store[] = [
    new Store('New Kensington', '229'),
    new Store('Butler', '202'),
    new Store('Pittsburgh', '203')
  ];
  flowerResult: Array<InventoryItem> = [];
  title = 'CY+ Menu';
  selectedCategory = 'all';
  //filterMetadata = { count: 0 };
  newWithinHours = 24;

  orientationPortrait: string = '(orientation: portrait)';
  orientationLandscape: string = '(orientation: landscape)';

  cart: InventoryItem[] = [];

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

  constructor(private httpClient: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private itemParser: InventoryItemParser){
      this.breakpointObserver.observe([
        Breakpoints.XSmall
      ]).subscribe(result => {
        if (result.matches) {
          this.currentScreenSize.isSmallScreen = false;
          this.currentScreenSize.isMediumScreen = false; 
          this.currentScreenSize.isLargeScreen = false;
          this.currentScreenSize.isExtraLargeScreen = false;
          this.currentScreenSize.isExtraSmallScreen = true;
        }
      });


      this.breakpointObserver.observe([
        Breakpoints.Small
      ]).subscribe(result => {
        if (result.matches) {
          this.currentScreenSize.isExtraSmallScreen = false;
          this.currentScreenSize.isSmallScreen = true;
          this.currentScreenSize.isMediumScreen = false; 
          this.currentScreenSize.isLargeScreen = false;
          this.currentScreenSize.isExtraLargeScreen = false;
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.Medium
      ]).subscribe(result => {
        if (result.matches) {
          this.currentScreenSize.isSmallScreen = false;
          this.currentScreenSize.isExtraSmallScreen = false;
          this.currentScreenSize.isMediumScreen = true; 
          this.currentScreenSize.isLargeScreen = false;
          this.currentScreenSize.isExtraLargeScreen = false;
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.Large
      ]).subscribe(result => {
        if (result.matches) {
          this.currentScreenSize.isExtraSmallScreen = false;
          this.currentScreenSize.isSmallScreen = false;
         // this.isHandset = false;
         this.currentScreenSize.isMediumScreen = false;
          this.currentScreenSize.isLargeScreen = true;
          this.currentScreenSize.isExtraLargeScreen = false;
         // alert('found  large screen with breakpoints: ' + JSON.stringify(result.breakpoints));
          //alert('New observer HANDSET: ' + JSON.stringify(result));
      // alert('found small  screen');
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.XLarge
      ]).subscribe(result => {
        if (result.matches) {
         this.currentScreenSize.isExtraSmallScreen = false;
         this.currentScreenSize.isSmallScreen = false;
         this.currentScreenSize.isMediumScreen = false;
          this.currentScreenSize.isLargeScreen = false;
          this.currentScreenSize.isExtraLargeScreen = true;
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


  updateMyLayoutForOrientationChange(breakpointState: BreakpointState) {
    if (breakpointState.matches === true) {
      this.isOrientationPortrait = breakpointState.breakpoints[this.orientationPortrait];
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

  getPotencyListStyle() {
    if (this.currentScreenSize.isExtraSmallScreen) {
      return { 'font-size': '10px' };
    }
  }

  filterChanged() {

  }

  clearCart() {
    this.cart = [];
  }

  getDisplayName(item: InventoryItem) {
   return this.itemParser.getDisplayName(item);
  }

  displayDetails(item: InventoryItem): void {
    const dialogRef = this.dialog.open(ItemDetailsPopup, { 
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result !== undefined && result !== null) {
       this.cart.push(result);
     }
    });
  }

  getBrand(item: InventoryItem) {
    return this.itemParser.getBrand(item);
  }
  storeChanged() {
    this.title = 'CY+ ' + this.stores.find(x => x.id === this.selectedStore).name + ' Menu';
  }

  addToNewList(item: InventoryItem) {
     if (item.created_ago.toLowerCase().indexOf('hour') > -1 
      ||  item.created_ago.toLowerCase().indexOf('day ago') > -1) {

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
          
          //let currentPrice = item.price_point.prices[0].price;
          //let currentWeight = item.price_point.prices[0].weight;
         // if (currentWeight === 1 && currentPrice > 30) {
            item.price_point.prices[0].weight = actualWeight;
          //}
           
            this.newItems.push(item);
          }
        } else {
          let actualWeight = item.bt_weight;
          if (!actualWeight) {
            actualWeight = this.itemParser.getWeightFromName(item.name);
          }
        
        //let currentPrice = item.price_point.prices[0].price;
        //let currentWeight = item.price_point.prices[0].weight;
      // if (currentWeight === 1 && currentPrice > 30) {
          item.price_point.prices[0].weight = actualWeight;
        //}
      
          this.newItems.push(item);
          //    this.newItems.push(item);
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
    
    //let currentPrice = item.price_point.prices[0].price;
    //let currentWeight = item.price_point.prices[0].weight;
   // if (currentWeight === 1 && currentPrice > 30) {
      item.price_point.prices[0].weight = actualWeight;
    //}
      this.flowers.push(item);
    }
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
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
          this.fullMenu = res;
          this.processMenuResults(res);
          this.searchComplete = true;
          this.isLoading = false;
           
        });
    }

    getWeight(item: InventoryItem): number {
      return this.itemParser.getWeight(item);
    }

    getType(item: InventoryItem): string {
      return this.itemParser.getType(item);
    }

    processMenuResults(menu: Menu){  
      menu.data.forEach(item => {
        let category = item.category.toLowerCase(); 
        //item.prices = [];
    
       // if (category.indexOf('flower') > -1) {
        //  if (item.product !== null && item.product !== undefined){
           // alert('product - sativa: ' + item.product.sativa_pct + ' indica: ' + item.product.indica_pct);
         // }
       /*  if (item.bt_potency_cbd && (item.bt_potency_cbd > item.bt_potency_thc || item.bt_potency_cbd > item.bt_potency_) ) {
           
          item.type = '(CBD Dominant)'
         }*/
          item.type = this.itemParser.getType(item);

        if (item.created_ago !== null && item.created_ago !== undefined) {
          this.addToNewList(item);
        }
    
        if (category.indexOf('flower') > -1) {
          this.addToFlowers(item);
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
