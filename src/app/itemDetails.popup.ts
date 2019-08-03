import { Component, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InventoryItem } from '../models/inventoryItem.model';
import { InventoryItemParser } from './services/inventoryItemParser.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './itemDetails.popup.html',
})
export class ItemDetailsPopup implements AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  showFlower: boolean = false;
  isOrientationPortrait: boolean = false;

  isExtraSmallScreen: boolean = false;
  isSmallScreen: boolean = false;
  isMediumScreen: boolean = false;
  isLargeScreen: boolean = false;
  isExtraLargeScreen: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ItemDetailsPopup>,
    @Inject(MAT_DIALOG_DATA) public data: InventoryItem,
    private itemParser: InventoryItemParser,
    private breakpointObserver: BreakpointObserver) {

    this.breakpointObserver.observe([
      Breakpoints.XSmall
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result.matches) {
          this.isSmallScreen = false;
          this.isMediumScreen = false;
          this.isLargeScreen = false;
          this.isExtraLargeScreen = false;
          this.isExtraSmallScreen = true;
        }
      });

    this.breakpointObserver.observe([
      Breakpoints.Small
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result.matches) {
          this.isExtraSmallScreen = false;
          this.isSmallScreen = true;
          this.isMediumScreen = false;
          this.isLargeScreen = false;
          this.isExtraLargeScreen = false;
        }
      });

    this.breakpointObserver.observe([
      Breakpoints.Medium
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result.matches) {
          this.isSmallScreen = false;
          this.isExtraSmallScreen = false;
          this.isMediumScreen = true;
          this.isLargeScreen = false;
          this.isExtraLargeScreen = false;
        }
      });

    this.breakpointObserver.observe([
      Breakpoints.Large
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result.matches) {
          this.isExtraSmallScreen = false;
          this.isSmallScreen = false;
          this.isMediumScreen = false;
          this.isLargeScreen = true;
          this.isExtraLargeScreen = false;
        }
      });

    this.breakpointObserver.observe([
      Breakpoints.XLarge
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result.matches) {
          this.isExtraSmallScreen = false;
          this.isSmallScreen = false;
          this.isMediumScreen = false;
          this.isLargeScreen = false;
          this.isExtraLargeScreen = true;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDisplayName(item: InventoryItem): string {
    return this.itemParser.getDisplayName(item);
  }

  ngAfterViewInit() {
  //  document.body.scrollTop = 0;
    //window.scroll(0, 0);
    //mat-dialog-container
   // alert(document.querySelector('.mat-dialog-cotainer').scrollTop);
  }

  getImgStyle() {
    if (this.isExtraSmallScreen) {
      return {
        width: 'auto',
        height: '250px'
      }
    }
    if (this.isSmallScreen) {
      return {
        width: 'auto',
        height: '280px'
      }
    }
    if (this.isMediumScreen) {
      return {
        width: 'auto',
        height: '350px'
      }
    }

    return {
      width: 'auto',
      height: '380px'
    }
  }

  getType(item: InventoryItem): string {
    return this.itemParser.getType(item);
  }

  displayFlower() {
    this.showFlower = true;
  }

  hideFlower() {
    this.showFlower = false;
  }

  getContentStyle() {
    if (this.isExtraSmallScreen) {
      return {
        'margin-top': '545px'
      }
    }
    if (this.isSmallScreen) {
      //alert('its small');
      return {
        'margin-top': '45px'
      }
    }
    if (this.isMediumScreen) {
      //  alert('its medium');
    }
    if (this.isLargeScreen) {
      //  alert('tsi large')
    }
  }

  getDescription(item: InventoryItem): string {
    return this.itemParser.getDescription(item);
  }

}