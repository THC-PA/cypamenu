import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from 'src/models/menu.model';
import { InventoryItem } from 'src/models/inventoryItem.model';
import { Store } from 'src/models/store.model';
import { MatDialog } from '@angular/material'; 
import { ItemDetailsPopup } from './itemDetails.popup';
import { InventoryItemParser } from './services/inventoryItemParser.service';
import {LayoutModule, BreakpointObserver, BreakpointState, Breakpoints} from '@angular/cdk/layout';
import { Prices } from 'src/models/prices.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  selectedStore = '229';
  isLoading: boolean = false;
/*
  isExtraSmallScreen: boolean = false;
  isSmallHandset: boolean = false;
  isMediumHandset: boolean = false;

  isLargeTablet: boolean = false;
  isSmallTablet: boolean = false;
  */

  //isSmallHandset: boolean = false;
/*
  isExtraSmallScreen: boolean = false;
  isSmallScreen: boolean = false;
  isMediumScreen: boolean = false;
  isLargeScreen: boolean = false;
  isExtraLargeScreen: boolean = false;*/

  isMediumScreen: boolean = false;
  isLargeScreen: boolean = false;
  isExtraLargeScreen: boolean = false;

  isHandset: boolean = false;

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
      });*/

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
      });


      this.breakpointObserver.observe([
        Breakpoints.Medium
      ]).subscribe(result => {
        if (result.matches) {
          this.isHandset = false;
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
          this.isHandset = false;
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
          this.isHandset = false;
          this.isMediumScreen = false;
          this.isLargeScreen = false;
          this.isExtraLargeScreen = true;
         // alert('found extra large screen with breakpoints: ' + JSON.stringify(result.breakpoints));
          //alert('New observer HANDSET: ' + JSON.stringify(result));
      // alert('found small  screen');
        }
      });

      /*
      this.breakpointObserver.observe([
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait
      ]).subscribe(result => {
        if (result.matches) {
          //alert('New observer HANDSET: ' + JSON.stringify(result));
          this.isSmallScreen = true;
          if (result.breakpoints['(max-width: 959.99px) and ' + this.orientationLandscape] || 
            result.breakpoints['(max-width: 959px) and ' + this.orientationLandscape] ) {
              this.isOrientationPortrait = false;
          } 

          if (result.breakpoints['(max-width: 959.99px) and ' + this.orientationPortrait] || 
            result.breakpoints['(max-width: 959px) and ' + this.orientationPortrait] ) {
              this.isOrientationPortrait = true;
          } 
        }
      });*/


      /*
      New observer results: 
      {"matches":true,
      "breakpoints":{
       "(max-width: 959.99px) and (orientation: landscape)":true,
       "(max-width: 599.99px) and (orientation: portrait)":false}}


orientation change: {"matches":true,"breakpoints":{"(orientation: portrait)":true,"(orientation: landscape)":false}}
      */
      
     // layoutChanges.subscribe(result => {
        //alert('orientation change: ' + JSON.stringify(result));
        
        //this.updateMyLayoutForOrientationChange(result);
     // });

    this.title = 'CY+ ' + this.stores.find(x => x.id === this.selectedStore).name + ' Menu';
  }

  ngOnInit() {
    this.search();
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
    if (this.isHandset && !this.isOrientationPortrait) {
      return {
        //'width' : '120px',
        'width': '20vw',
        'height': '50%'
        //'height': '235px'
      }
    }

    if (this.isHandset && this.isOrientationPortrait) {
      return  {
        'width': '100px',
        'height': '50%'
      }
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
              console.log('adding to prices: ' + JSON.stringify(prices));
              console.log('adding to prices: ' + JSON.stringify(prices1));
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
