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
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    SortByPipe,
    ImagePreloadDirective,
    MenuFilterPipe,
    ItemDetailsPopup
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
    LayoutModule
  ],
  exports: [SortByPipe, ImagePreloadDirective, MenuFilterPipe],
  providers: [],
  entryComponents: [ItemDetailsPopup],
  bootstrap: [AppComponent]
})
export class AppModule { }
