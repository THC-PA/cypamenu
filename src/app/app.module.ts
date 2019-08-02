import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatSelectModule, MatExpansionModule, MatProgressSpinnerModule, MatGridListModule, MatDialogModule, MatChipsModule, MatBadgeModule} from '@angular/material';
import { MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } 
from '@angular/material';
import { SortByPipe } from './pipes/sortBy.pipe';
import { MenuFilterPipe } from './pipes/menuFilter.pipe';
import { ImagePreloadDirective } from './directives/imagePreload.directive';
import { ItemDetailsPopup } from './itemDetails.popup';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InventoryItemParser } from './services/inventoryItemParser.service';
import { NewItemsComponent } from './new-items/new-items.component';
import { FlowersComponent } from './flowers/flowers.component';
import { VapesComponent } from './vapes/vapes.component';
import { ConcentratesComponent } from './concentrates/concentrates.component';

@NgModule({
  declarations: [
    AppComponent,
    SortByPipe,
    ImagePreloadDirective,
    MenuFilterPipe,
    ItemDetailsPopup,
    NewItemsComponent,
    FlowersComponent,
    VapesComponent,
    ConcentratesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatExpansionModule,
    MatGridListModule,
    MatDialogModule,
    MatBadgeModule, 
    FlexLayoutModule,
    MatChipsModule
  ],
  exports: [SortByPipe, ImagePreloadDirective, MenuFilterPipe],
  providers: [InventoryItemParser],
  entryComponents: [ItemDetailsPopup],
  bootstrap: [AppComponent]
})
export class AppModule { }
