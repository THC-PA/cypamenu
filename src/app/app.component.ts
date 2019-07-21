import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from 'src/models/menu.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CY+ New Kensington Menu';
  fullMenu: Menu = new Menu();
  searchComplete: boolean = false;
  searchText: string = '';

  constructor(private httpClient: HttpClient){}
    
  /*
  getFullMenu() {
      
      this.httpClient.get<Menu>(baseUrl, options)
        .subscribe(res => {
          this.fullMenu = res;
        
        });
  }*/

    search() {
      this.searchComplete = false;
      let baseUrl: string = 'https://api.crescolabs.com/p/inventory?limit=1000&search=' + this.searchText;
      let headers = new HttpHeaders();
      headers = headers.set('Accept', ['application/json','text/plain','*/*'])
        .set('ordering_app_id', 'fab9d05c-1bbd-47f0-a1e9-1d2ca132af0d')
        .set('store_id', '229')
        .set('x-api-key', 'wqrVgXbS7J1AalyxdMG6W4QIGRQrnptP2PnV2KfV');

      const options = { headers: headers };

        
      this.httpClient.get<Menu>(baseUrl, options)
        .subscribe(res => {
          this.fullMenu = res;
          this.searchComplete = true;
        });
    }

}
