import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InventoryItem } from '../models/inventoryItem.model';
import { InventoryItemParser } from './services/inventoryItemParser.service';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: './itemDetails.popup.html',
  })
  export class ItemDetailsPopup { 
    constructor(
      public dialogRef: MatDialogRef<ItemDetailsPopup>,
      @Inject(MAT_DIALOG_DATA) public data: InventoryItem,
      private itemParser: InventoryItemParser) { }
  
    onNoClick(): void { 
      this.dialogRef.close();
    }

    getDisplayName(item: InventoryItem): string {
      return this.itemParser.getDisplayName(item);
    }
  
  }