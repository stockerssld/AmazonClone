import { RestApiService } from './../rest-api.service';
import { DataService } from './../data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  btnDisable = false;
  constructor(
    private router: Router,
    private rest: RestApiService,
    private data: DataService
  ) { }

  ngOnInit(): void {
  }

  validate(){
    if (this.email){
      if (this.password){
        return true;
      } else{
        this.data.error('Password is not entered.');
      }
    } else {
      this.data.error('Email is not entered.')
    }
  }

  async login(){
    this.btnDisable = true;
    const url = 'http://localhost:3000/api/accounts/login';

    try{
      if (this.validate()){
        const data = await this.rest.post(
          url, {
            email: this.email,
            password: this.password
          }
        )
        // tslint:disable-next-line: no-string-literal
        if (data['success']){
        // tslint:disable-next-line: no-string-literal
          localStorage.setItem('token', data['token']);
          this.router.navigate(['/']);
        }else{
        // tslint:disable-next-line: no-string-literal
          this.data.error(data['message'])
        }
      }
    }catch (error){
      // tslint:disable-next-line: no-string-literal
      this.data.error(error['message'])
    }
    this.btnDisable = false;
  }
}
