import { RestApiService } from './rest-api.service';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})

export class DataService {
  message = '';
  messageType = 'danger';

  user: any;

  constructor(private router: Router, private  rest: RestApiService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart){
        this.message = '';
      }
    })
  }

  error(message){
    this.messageType = 'dander';
    this.message = message;
  }

  succes(message){
    this.messageType = 'success';
    this.message = message;
  }
  
  warning(message){
    this.messageType = 'warning';
    this.message = message;
  }

  async getProfile(){
    const url = 'http://localhost:3000/api/accounts/profile';
    try{
      if (localStorage.getItem('token')){
        const data = await this.rest.get(url);
        this.user = data['user'];
      }
    } catch (error){
      this.error(error);
    }
  }
}
