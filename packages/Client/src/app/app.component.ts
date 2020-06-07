import { DataService } from './data.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, public data: DataService){
    this.data.getProfile();
  }

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
    // tslint:disable-next-line: no-unused-expression
    dropdown.closed;
  }
  logout(){
    this.data.user = {};
    localStorage.clear();
    this.router.navigate(['']);
  }
  search(){
    if(this.searchTerm){
      this.collapse()
      this.router.navigate(['search', {query: this.searchTerm}])
    }
  }
}
