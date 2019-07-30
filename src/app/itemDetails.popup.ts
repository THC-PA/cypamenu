import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InventoryItem } from '../models/inventoryItem.model';
import { InventoryItemParser } from './services/inventoryItemParser.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: './itemDetails.popup.html',
  })
  export class ItemDetailsPopup {
  showFlower: boolean = false;
  isLargeScreen: boolean = false;
  isOrientationPortrait: boolean = false;
  isHandset: boolean = false;
  isMediumScreen: boolean = false;
  isExtraSmallScreen: boolean = false;
  isSmallScreen: boolean = false;
  isExtraLargeScreen: boolean = false;
    constructor(
      public dialogRef: MatDialogRef<ItemDetailsPopup>,
      @Inject(MAT_DIALOG_DATA) public data: InventoryItem,
      private itemParser: InventoryItemParser,
      private breakpointObserver: BreakpointObserver) { 

      this.breakpointObserver.observe([
        Breakpoints.HandsetPortrait
      ]).subscribe(result => {
        if (result.matches) {
          this.isHandset = true;
          this.isOrientationPortrait = true;
          this.isMediumScreen = false;
          this.isLargeScreen = false;
          this.isExtraLargeScreen = false;
         // alert('found Handset PORTRAIT');
          //alert('New observer HANDSET: ' + JSON.stringify(result));
      // alert('found small  screen');
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
        // alert('found Handset LANDSCAPE ');
          //alert('New observer HANDSET: ' + JSON.stringify(result));
      // alert('found small  screen');
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.XSmall
      ]).subscribe(result => {
        if (result.matches) {

          if (this.isHandset) {
            //alert('Found that its a handset, but also found XSmall screen?');
          }
          this.isHandset = false;
          this.isMediumScreen = false; 
          this.isLargeScreen = false;
          this.isExtraLargeScreen = false;
          this.isSmallScreen = false;
          this.isExtraSmallScreen = true;
          
        //  alert('found  Medium screen with breakpoints: ' + JSON.stringify(result.breakpoints));
          //found  Medium screen with breakpoints: {"(min-width: 960px) and (max-width: 1279.99px)":true}
          //alert('New observer HANDSET: ' + JSON.stringify(result));
      // alert('found small  screen');
        }
      });

      this.breakpointObserver.observe([
        Breakpoints.Small
      ]).subscribe(result => {
        if (result.matches) {
          if (this.isHandset) {
           // alert('Found that its a handset, but also found Small screen?');
          }
          this.isHandset = false;
          this.isMediumScreen = false; 
          this.isLargeScreen = false;
          this.isExtraLargeScreen = false;
          this.isSmallScreen = true;
         
        //  alert('found  Medium screen with breakpoints: ' + JSON.stringify(result.breakpoints));
          //found  Medium screen with breakpoints: {"(min-width: 960px) and (max-width: 1279.99px)":true}
          //alert('New observer HANDSET: ' + JSON.stringify(result));
      // alert('found small  screen');
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
        //  alert('found  Medium screen with breakpoints: ' + JSON.stringify(result.breakpoints));
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
          //alert('found  large screen with breakpoints: ' + JSON.stringify(result.breakpoints));
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
        //  alert('found extra large screen with breakpoints: ' + JSON.stringify(result.breakpoints));
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

    /*
        [ngStyle.md]="{
          width: 'auto',
          'height': '200px',
          'margin': 'auto'
        }"
        [ngStyle.sm]="{
          width: 'auto',
          'height': '110px',
          'margin-top': '10px'
        }"
        [ngStyle.xs]="{
          width: 'auto',
          'height': '100px',
          'margin': 'auto'
        }"
    */

    getImgStyle() {
      if (this.isHandset && !this.isOrientationPortrait) {
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
      }
    }

    displayFlower() {
      this.showFlower = true;
    }

    hideFlower() {
      this.showFlower = false;
    }

    getContentStyle() {

        if (this.isExtraSmallScreen) {
        //  alert('its extra small');
        }
        if (this.isSmallScreen) {
          //alert('its small');
          return {
            height: '150px',
            'overflow-y': 'auto'
          }
        }
        if (this.isMediumScreen) {
        //  alert('its medium');
        }
         if (this.isLargeScreen) {
         //  alert('tsi large')
         }
      
    }
  
  }