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
import { LazyForDirective } from './directives/lazyFor.directive';
import { ItemDetailsPopup } from './itemDetails.popup';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InventoryItemParser } from './services/inventoryItemParser.service';
import { NewItemsComponent } from './new-items/new-items.component';
import { FlowersComponent } from './flowers/flowers.component';
import { VapesComponent } from './vapes/vapes.component';
import { ConcentratesComponent } from './concentrates/concentrates.component';
import { TincturesComponent } from './tinctures/tinctures.component';
import { CapsulesComponent } from './capsules/capsules.component';
import { TopicalsComponent } from './topicals/topicals.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { GroupByNamePipe } from './pipes/groupByName.pipe';
import { FlowerPopup } from './flower.popup';

@NgModule({
  declarations: [
    AppComponent,
    SortByPipe,
    GroupByNamePipe,
    ImagePreloadDirective,
    LazyForDirective,
    MenuFilterPipe,
    FlowerPopup,
    ItemDetailsPopup,
    NewItemsComponent,
    FlowersComponent,
    VapesComponent,
    ConcentratesComponent,
    TincturesComponent,
    CapsulesComponent,
    TopicalsComponent,
    AccessoriesComponent
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
    MatChipsModule,
    DeferLoadModule
  ],
  exports: [SortByPipe, GroupByNamePipe, ImagePreloadDirective, MenuFilterPipe],
  providers: [InventoryItemParser],
  entryComponents: [ItemDetailsPopup, FlowerPopup],
  bootstrap: [AppComponent]
})
export class AppModule { }
