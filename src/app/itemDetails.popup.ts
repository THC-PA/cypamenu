import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InventoryItem } from '../models/inventoryItem.model';
import { InventoryItemParser } from './services/inventoryItemParser.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: './itemDetails.popup.html',
  })
  export class ItemDetailsPopup implements AfterViewInit {
  showFlower: boolean = false;
  isOrientationPortrait: boolean = false;
  //isHandset: boolean = false;
  
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
        ]).subscribe(result => {
          if (result.matches) {
            console.log('*** EXTRA small screen detected.');
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
            console.log('*** small screen detected.');
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
            console.log('*** Medium screen detected.');
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
            console.log('*** Large screen detected.');
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
           console.log('*** EXTRA large screen detected.');
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
      }
  
    onNoClick(): void { 
      this.dialogRef.close();
    }

    getDisplayName(item: InventoryItem): string {
      return this.itemParser.getDisplayName(item);
    }

    ngAfterViewInit() {
      document.body.scrollTop = 0;
      window.scroll(0, 0);
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

     /* if (this.isHandset && !this.isOrientationPortrait) {
       // alert('111');  
        return {
            width: 'auto',
            height: '110px'
          }
      } 

      if (this.isHandset && this.isOrientationPortrait){
       // alert('222');  
        return {
          'width': 'auto',
          'height': '200px',
         // 'height': 'auto',
          'margin-top': 'auto'
        }
      }

      if (!this.isHandset) {
        if (this.isExtraSmallScreen) {
         // alert('orientation portait? --> ' + this.isOrientationPortrait)
        }
        if (this.isSmallScreen) {
         // alert('x11111');  
          return {
            width: 'auto',
            height: '150px',
            'margin-top':'140px'
          }
        }
        if (this.isMediumScreen) {
        //  alert('its medium');
        }
         if (this.isLargeScreen) {
         // alert('tsi large')
         }
      }*/
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