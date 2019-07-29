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
  isLargeScreen: boolean; 
  isOrientationPortrait: boolean;
  isHandset: boolean;
  isMediumScreen: boolean;
  isExtraLargeScreen: boolean;
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
        //  alert('found Handset PORTRAIT with breakpoints: ' + JSON.stringify(result.breakpoints));
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
         // alert('found Handset LANDSCAPE with breakpoints: ' + JSON.stringify(result.breakpoints));
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

    getImgStyle() {
      if (this.isHandset && !this.isOrientationPortrait) {
          return {
            'width': '120px',
            'height': 'auto',
            'margin-top': '25px'
           // 'height': 'auto',
           // 'margin-top': '5px'
          }
      } 

      if (this.isHandset && this.isOrientationPortrait){
        return {
          'width': 'auto',
          'height': '100px',
         // 'height': 'auto',
          'margin-top': '10px'
        }
      }
    }

    getContentStyle() {
      if (this.isHandset && !this.isOrientationPortrait) {
        return {
          'height': '90%',
          'width': 'auto'
        }
      }

      if (this.isHandset && this.isOrientationPortrait) {
        return {
          'height': '60%',
          'width':'auto'
        }
      }
    }
  
  }