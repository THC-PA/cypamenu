import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from 'src/models/menu.model';
import { InventoryItem } from 'src/models/inventoryItem.model';
import { Store } from 'src/models/store.model';
import { MatDialog } from '@angular/material';
import { ItemDetailsPopup } from './itemDetails.popup';
import { InventoryItemParser } from './services/inventoryItemParser.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Prices } from 'src/models/prices.model';
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

  selectedStore = '229';
  isLoading: boolean = false;
  searchPanelOpenState: boolean = false;

  currentScreenSize: CurrentScreenSize = new CurrentScreenSize();

  isOrientationPortrait: boolean = true;
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

  updateMyLayoutForOrientationChange(breakpointState: BreakpointState) {
    if (breakpointState.matches === true) {
      this.isOrientationPortrait = breakpointState.breakpoints[this.orientationPortrait];
    }
  }

  getCardStyle() {
    if (this.currentScreenSize.isExtraSmall) {
      return {
        width: '100px',
        'max-height': '340px',
        'min-height': '290px'
      }
    }

    if (this.currentScreenSize.isSmall) {
      return {
        width: '140px',
        'min-height': '300px'
      }
    }

    if (this.currentScreenSize.isMedium) {
      return {
        width: '150px',
        'min-height': '350px'
      }
    }

    if (this.currentScreenSize.isLarge) {
      return {
        width: '180px',
        'min-height': '360px'
      }
    }

    if (this.currentScreenSize.isExtraLarge) {
      return {
        width: '180px',
        'min-height': '360px'
      }
    }
  }

  getPotencyListStyle() {
    if (this.currentScreenSize.isExtraSmall) {
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
    this.isLoading = true;
    this.clearResults();

    let baseUrl: string = 'https://api.crescolabs.com/p/inventory?limit=10000';

    if (this.searchText !== null && this.searchText !== undefined && this.searchText !== '') {
      baseUrl += '&search=' + this.searchText;
    }

    if (this.selectedCategory !== 'all') {
      baseUrl += '&category=' + this.selectedCategory;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Accept', ['application/json', 'text/plain', '*/*'])
      .set('ordering_app_id', 'fab9d05c-1bbd-47f0-a1e9-1d2ca132af0d')
      .set('store_id', this.selectedStore)
      .set('x-api-key', 'wqrVgXbS7J1AalyxdMG6W4QIGRQrnptP2PnV2KfV');

    const options = { headers: headers };


    this.httpClient.get<Menu>(baseUrl, options)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
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

   compare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? -1 : 1;
}

  getTotalFlowers() {
    let length = 0;
     this.items.forEach(categoryGroup => {
     length += categoryGroup.filter(c => {
      return c.category === 'flower';
     }).length;
    });
    
    return length;
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

    const source = from(menu.data);
    source.pipe(
      groupBy(item => item.category.toLowerCase()),
      mergeMap(group => group.pipe(toArray())))
        .subscribe(i => {
        //  console.log('adding item: ' + JSON.stringify(i));
        this.items.push(i);
        });

      source.pipe(
       filter(item => (item.created_ago.toLowerCase().indexOf('hour') > -1
         || item.created_ago.toLowerCase().indexOf('day ago') > -1)))
         .subscribe(newItem => this.newItems.push(newItem));

   //   if (item.created_ago.toLowerCase().indexOf('hour') > -1
    //  || item.created_ago.toLowerCase().indexOf('day ago') > -1) {
  }

  clearResults() {
    this.items = [];
    this.searchComplete = false;
    this.newItems = [];
  }
}
