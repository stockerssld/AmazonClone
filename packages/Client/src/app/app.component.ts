import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Client Amazono';
  isCollapsed = true;
  searchTerm = '';
  get token(){
    return localStorage.getItem('token');
  }
  collapse(){
    this.isCollapsed = true;
  }
  closeDropdown(dropdown){
    dropdown.closed();
  }
  logout(){

  }
  search(){

  }
  
}
