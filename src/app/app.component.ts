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

  search() {
    // this.isLoading = true;
    //this.clearResults();
    let baseUrl = 'https://api.crescolabs.com/p/inventory?limit=2000';
    //https://shop.cydispensary.com/products/flower?strain_type=indica&order_by=name_desc&order=desc&brand=Ilera
    //https://shop.cydispensary.com/products/vapes?strain_type=hybrid&order_by=name&brand=GTI&cultivator=Cresco%20Labs
    ////https://api.crescolabs.com/p/inventory?category=flower&order_by=name&limit=50&search=cherry


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
        this.initialLoad = false;
      });
  }

  compare(a, b) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }

  processMenuResults(menu: Menu) {
    this.clearResults();
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

    if (this.selectedFilter !== 'All' && this.searchText) {
      source.pipe(
        filter(i => context.itemParser.getDisplayName(i).toLowerCase().indexOf(this.searchText.toLowerCase()) > -1),
        filter(i => context.itemParser.getType(i).toLowerCase().indexOf(this.selectedFilter.toLowerCase()) > -1),
        groupBy(item => item.category.toLowerCase()),
        mergeMap(group => group.pipe(toArray())))
        .subscribe(i => {
          this.items.push(i);
        });

    } else if (this.selectedFilter !== 'All' && !this.searchText) {
      source.pipe(
        filter(i => context.itemParser.getType(i).toLowerCase().indexOf(this.selectedFilter.toLowerCase()) > -1),
        groupBy(item => item.category.toLowerCase()),
        mergeMap(group => group.pipe(toArray())))
        .subscribe(i => {
          this.items.push(i);
        });

    } else {
      source.pipe(
        filter(i => context.itemParser.getDisplayName(i).toLowerCase().indexOf(this.searchText.toLowerCase()) > -1),
        groupBy(item => item.category.toLowerCase()),
        mergeMap(group => group.pipe(toArray())))
        .subscribe(i => {
          this.items.push(i);
        });

    }

    source
      .pipe(
        filter(item => (item.created_ago.toLowerCase().indexOf('hour') > -1
          || item.created_ago.toLowerCase().indexOf('day ago') > -1)))
      .subscribe(newItem => this.newItems.push(newItem));


    setTimeout(() => {
      this.isLoading = false;
      this.searchComplete = true;
    }, 100);
  }

  clearResults() {
    this.items = [];
    this.searchComplete = false;
    this.newItems = [];
  }
}
