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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  
  selectedStore = '229';
  isLoading: boolean = false;
  searchPanelOpenState: boolean = false;

  isExtraSmallScreen: boolean = false;
  isSmallScreen: boolean = false;
  isMediumScreen: boolean = false;
  isLargeScreen: boolean = false;
  isExtraLargeScreen: boolean = false;

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
  filterMetadata = { count: 0 };
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
      /*const layoutChanges = this.breakpointObserver.observe([
        '(orientation: portrait)',
        '(orientation: landscape)',
      ]);*/
      /*this.breakpointObserver.observe([
        Breakpoints.XSmall
      ]).subscribe(result => {
        if (result.matches) {
          this.isExtraSmallScreen = true;
          alert('found extra small screen with breakpoints: ' + JSON.stringify(result.breakpoints));
          //alert('New observer HANDSET: ' + JSON.stringify(result));
       //alert('found extra small  screen');
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.Small
      ]).subscribe(result => {
        if (result.matches) {
          this.isSmallScreen = true;
          alert('found small screen with breakpoints: ' + JSON.stringify(result.breakpoints));
          //alert('New observer HANDSET: ' + JSON.stringify(result));
      // alert('found small  screen');
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.HandsetPortrait
      ]).subscribe(result => {
        if (result.matches) {
          this.isHandset = true;
          this.isOrientationPortrait = true;
          this.isMediumScreen = false;
          this.isLargeScreen = false;
          this.isExtraLargeScreen = false;
         // alert('found Handset PORTRAIT with breakpoints: ' + JSON.stringify(result.breakpoints));
          
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.HandsetLandscape
      ]).subscribe(result => {
        if (result.matches) {
          this.isOrientationPortrait = false;
          this.isHandset = true;
          this.isMediumScreen = false;
          this.isLargeScreen = false;
          this.isExtraLargeScreen = false;
        //  alert('found Handset LANDSCAPE with breakpoints: ' + JSON.stringify(result.breakpoints));
        
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.TabletLandscape
      ]).subscribe(result => {
        if (result.matches) {
        //  this.isOrientationPortrait = false;
        //  this.isHandset = true;
         // this.isMediumScreen = false;
          //this.isLargeScreen = false;
          //this.isExtraLargeScreen = false;
         // alert('found TABLET LANDSCAPE with breakpoints: ' + JSON.stringify(result.breakpoints));
        
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.TabletPortrait
      ]).subscribe(result => {
        if (result.matches) {
        //  this.isOrientationPortrait = false;
        //  this.isHandset = true;
         // this.isMediumScreen = false;
          //this.isLargeScreen = false;
          //this.isExtraLargeScreen = false;
          //alert('found TABLET PORTRAIT with breakpoints: ' + JSON.stringify(result.breakpoints));
        
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.WebLandscape
      ]).subscribe(result => {
        if (result.matches) {
        //  this.isOrientationPortrait = false;
        //  this.isHandset = true;
         // this.isMediumScreen = false;
          //this.isLargeScreen = false;
          //this.isExtraLargeScreen = false;
         // alert('found WEB Landscape with breakpoints: ' + JSON.stringify(result.breakpoints));
        
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.WebPortrait
      ]).subscribe(result => {
        if (result.matches) {
        //  this.isOrientationPortrait = false;
        //  this.isHandset = true;
         // this.isMediumScreen = false;
          //this.isLargeScreen = false;
          //this.isExtraLargeScreen = false;
        //  alert('found WEB PORTRAIT with breakpoints: ' + JSON.stringify(result.breakpoints));
        
        }
      });*/
      this.breakpointObserver.observe([
        Breakpoints.XSmall
      ]).subscribe(result => {
        if (result.matches) {
          //this.isHandset = false;
          this.isSmallScreen = false;
          this.isMediumScreen = false; 
          this.isLargeScreen = false;
          this.isExtraLargeScreen = false;
          this.isExtraSmallScreen = true;
          //alert('found  Medium screen with breakpoints: ' + JSON.stringify(result.breakpoints));
          //found  Medium screen with breakpoints: {"(min-width: 960px) and (max-width: 1279.99px)":true}
          //alert('New observer HANDSET: ' + JSON.stringify(result));
      // alert('found small  screen');
        }
      });


      this.breakpointObserver.observe([
        Breakpoints.Small
      ]).subscribe(result => {
        if (result.matches) {
          //this.isHandset = false;
          this.isExtraSmallScreen = false;
          this.isSmallScreen = true;
          this.isMediumScreen = false; 
          this.isLargeScreen = false;
          this.isExtraLargeScreen = false;
          //alert('found  Medium screen with breakpoints: ' + JSON.stringify(result.breakpoints));
          //found  Medium screen with breakpoints: {"(min-width: 960px) and (max-width: 1279.99px)":true}
          //alert('New observer HANDSET: ' + JSON.stringify(result));
      // alert('found small  screen');
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.Medium
      ]).subscribe(result => {
        if (result.matches) {
         // this.isHandset = false;
         this.isSmallScreen = false;
         this.isExtraSmallScreen = false;
          this.isMediumScreen = true; 
          this.isLargeScreen = false;
          this.isExtraLargeScreen = false;
          //alert('found  Medium screen with breakpoints: ' + JSON.stringify(result.breakpoints));
          //found  Medium screen with breakpoints: {"(min-width: 960px) and (max-width: 1279.99px)":true}
          //alert('New observer HANDSET: ' + JSON.stringify(result));
      // alert('found small  screen');
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.Large
      ]).subscribe(result => {
        if (result.matches) {
          this.isExtraSmallScreen = false;
          this.isSmallScreen = false;
         // this.isHandset = false;
          this.isMediumScreen = false;
          this.isLargeScreen = true;
          this.isExtraLargeScreen = false;
         // alert('found  large screen with breakpoints: ' + JSON.stringify(result.breakpoints));
          //alert('New observer HANDSET: ' + JSON.stringify(result));
      // alert('found small  screen');
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.XLarge
      ]).subscribe(result => {
        if (result.matches) {
         // this.isHandset = false;
         this.isExtraSmallScreen = false;
         this.isSmallScreen = false;
          this.isMediumScreen = false;
          this.isLargeScreen = false;
          this.isExtraLargeScreen = true;
         // alert('found extra large screen with breakpoints: ' + JSON.stringify(result.breakpoints));
          //alert('New observer HANDSET: ' + JSON.stringify(result));
      // alert('found small  screen');
        }
      });
      
     // layoutChanges.subscribe(result => {
        //alert('orientation change: ' + JSON.stringify(result));
        
        //this.updateMyLayoutForOrientationChange(result);
     // });

    this.title = 'CY+ ' + this.stores.find(x => x.id === this.selectedStore).name + ' Menu';
  }

  ngOnInit() {
    this.search();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /*getCardFlex(): number {
    if (this.isHandset) {
      if (this.isOrientationPortrait) {
        
        return 44;
      } else {
        return 22;
      }
    } else {
      if (this.isMediumScreen) {
        //alert('setting medium card')
        return 11;
      }
      if (this.isLargeScreen) {
        alert('setting large card')
        return 44;
      } 
      if (this.isExtraLargeScreen) {
        return 55;
      } else {
        return 11;
      }
    }
  }*/

  updateMyLayoutForOrientationChange(breakpointState: BreakpointState) {
    if (breakpointState.matches === true) {
      this.isOrientationPortrait = breakpointState.breakpoints[this.orientationPortrait];
    }
  }

  setLargeTabletLandscape(): number {
   // alert('setting large tablet');
    return 33;
  }

  /*
  getFlexXs(): number {
    if (this.isOrientationPortrait) {
       return 44;
    } else {
      return 22;
    }
  }*/

  getCardStyle() {
    if (this.isExtraSmallScreen) {
      return {
        width: '100px',
        'max-height': '340px',
        'min-height': '290px'
      }
    }

    if (this.isSmallScreen) {
      return {
        width: '140px',
        'min-height': '300px'
      }
    }

    if (this.isMediumScreen) {
      return {
        width: '150px',
        'min-height': '350px'
      }
    }

    if (this.isLargeScreen) {
      return {
        width: '180px',
        'min-height': '360px'
      }
    }

    if (this.isExtraLargeScreen) {
      return {
        width: '180px',
        'min-height': '360px'
      }
    }
  }

  getPotencyListStyle() {
    if (this.isExtraSmallScreen) {
      return { 'font-size': '10px' };
    }
  }

  getFlexSm(): number {
    /*if (this.isOrientationPortrait) {
      return 44;
    } else {
      return 22;
    }*/

    return 33;
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
   // let height = '30px;';
/*
    if (this.isHandset && !this.isOrientationPortrait) {
      height = '300px';
    }
*/
    const dialogRef = this.dialog.open(ItemDetailsPopup, { 
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
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

  categoryChanged() {
   // this.clearResults();
  }

    search() {
      //this.searchPanelOpenState = !this.searchPanelOpenState;

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
/*
    isExtraLargeScreen() { 
      return this.breakpointObserver.isMatched('(min-width: 1920px)')
        && this.breakpointObserver.isMatched('(max-width: 5000px)');
    }

    isLargeScreen() {
      return this.breakpointObserver.isMatched('(min-width: 1280px)')
        && this.breakpointObserver.isMatched('(max-width: 1919px)');
    }

    isMediumScreen() {
      return this.breakpointObserver.isMatched('(min-width: 960px)')
        && this.breakpointObserver.isMatched('(max-width: 1279px)');
    }
    
    isSmallScreen() {
      return this.breakpointObserver.isMatched('(min-width: 600px)')
        && this.breakpointObserver.isMatched('(max-width: 959px)');
    }

    isExtraSmallScreen() {
      return this.breakpointObserver.isMatched('(max-width: 599px)');
    }*/

    getWeight(item: InventoryItem): string {
      return this.itemParser.getWeight(item);
    }

    getType(item: InventoryItem): string {
      return this.itemParser.getType(item);
    }

    processMenuResults(menu: Menu){ 
      menu.data.forEach(item => {
        let category = item.category.toLowerCase(); 
        item.prices = [];
    
       // if (category.indexOf('flower') > -1) {
        //  if (item.product !== null && item.product !== undefined){
           // alert('product - sativa: ' + item.product.sativa_pct + ' indica: ' + item.product.indica_pct);
         // }
       /*  if (item.bt_potency_cbd && (item.bt_potency_cbd > item.bt_potency_thc || item.bt_potency_cbd > item.bt_potency_) ) {
           
          item.type = '(CBD Dominant)'
         }*/
          item.type = this.itemParser.getType(item);
         
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

            if (category.indexOf('flower') > -1) {
              let context = this;
              let currItemDisplayName = this.itemParser.getDisplayName(item);
    
              let exists = this.flowers.find(filterItem => {
                let fName = context.itemParser.getDisplayName(filterItem);
                if (currItemDisplayName.indexOf(fName) > -1 
                    && item.category === filterItem.category) {
                  
                  return true;
                }
              });
              
              if (exists) {
               // console.log('found existing item ' + item.name + ', weight: ' + this.itemParser.getWeight(item));
                  let prices = new Prices();
                  let prices1 = new Prices();
                 // let existingPrice = exists.price_point[0].price;
                 // let existingWeight = this.itemParser.getWeight(exists);
               
                  prices1.price = exists.price_point.prices[0].price;
                  prices1.weight = this.itemParser.getWeight(exists);
    
                  prices.price = item.price_point.prices[0].price;
                  prices.weight = this.itemParser.getWeight(item);
                 // console.log('adding to prices: ' + JSON.stringify(prices));
                 // console.log('adding to prices: ' + JSON.stringify(prices1));
                  //item.prices.push(prices);
                  //item.prices.push(prices1);
                  if (item.name.toLowerCase().includes('golden goat') && item.category === 'flower') {
                    alert('adding weight from price-points: ' + JSON.stringify(item.price_point));
                    alert('but also has prices list : ' + JSON.stringify(item.prices));
                  }
                  let newPrices: Prices[] = [prices];
                  newPrices.push(prices1);
    
                  let updateIndex = this.flowers.findIndex(i => (i.id === exists.id));
    
                  if (updateIndex > -1) {
                    this.flowers[updateIndex].prices = newPrices;
                  }
                 
                 // this.flowers.push(item);
                  
                  //item.prices.push(new Prices());
              } else {
                let price = new Prices();
                price.price = item.price_point.prices[0].price;
                price.weight = this.itemParser.getWeight(item);
                item.prices.push(price);
                if (item.name.toLowerCase().includes('golden goat') && item.category === 'flower') {
                  alert('adding weight from price-points: ' + JSON.stringify(item.price_point));
                  alert('but also has prices list : ' + JSON.stringify(item.prices));
                }
                this.newItems.push(item);
              }
            } else {
              if (item.name.toLowerCase().includes('golden goat') && item.category === 'flower') {
                alert('adding weight from price-points: ' + JSON.stringify(item.price_point));
                alert('but also has prices list : ' + JSON.stringify(item.prices));
              }
              this.newItems.push(item);
            }

             
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
          let context = this;
          let currItemDisplayName = this.itemParser.getDisplayName(item);

          let exists = this.flowers.find(filterItem => {
            let fName = context.itemParser.getDisplayName(filterItem);
            if (currItemDisplayName.indexOf(fName) > -1) {
              
              return true;
            }
          });
          
          if (exists) {
           // console.log('found existing item ' + item.name + ', weight: ' + this.itemParser.getWeight(item));
              let prices = new Prices();
              let prices1 = new Prices();
             // let existingPrice = exists.price_point[0].price;
             // let existingWeight = this.itemParser.getWeight(exists);
              prices1.price = exists.price_point.prices[0].price;
              prices1.weight = this.itemParser.getWeight(exists);

              prices.price = item.price_point.prices[0].price;
              prices.weight = this.itemParser.getWeight(item);
             // console.log('adding to prices: ' + JSON.stringify(prices));
             // console.log('adding to prices: ' + JSON.stringify(prices1));
              //item.prices.push(prices);
              //item.prices.push(prices1);
              let newPrices: Prices[] = [prices];
              newPrices.push(prices1);

              let updateIndex = this.flowers.findIndex(i => (i.id === exists.id));

              if (updateIndex > -1) {
                this.flowers[updateIndex].prices = newPrices;
              }
             
             // this.flowers.push(item);
              
              //item.prices.push(new Prices());
          } else {
            let price = new Prices();
            price.price = item.price_point.prices[0].price;
            price.weight = this.itemParser.getWeight(item);
            item.prices.push(price);
            this.flowers.push(item);
          }
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
