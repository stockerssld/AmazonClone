import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { RestApiService } from './../rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  password1 = '';
  isSeller = false;
  btnDisable = false;
  constructor(private router: Router, private data: DataService, private rest: RestApiService) { }

  ngOnInit(): void {
  }

  validate(){
    if(this.name){
      if(this.email){
        if(this.password){
          if(this.password1){
            if(this.password === this.password1){
              return true;
            }else{
              this.data.error('The password do not match')
            }
          }else{
            this.data.error('Confirmation Password is not entered')
          }
        }else{
          this.data.error('Password is not entered')
        }
      }else{
        this.data.error('Email is not entered');
      }
    }else{
      this.data.error('Email is not entered')
    }
  }
  async register(){
    this.btnDisable = true;
    try{
      if (this.validate()){
        const url = 'http://localhost:3000/api/accounts/signup';
        const data = await this.rest.post(
          url, {
            name: this.name,
            email: this.email,
            password: this.password,
            isSeller: this.isSeller
          });
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          await this.data.getProfile();
          this.router.navigate(['/profile/address']).then(()=>{
            this.data.success('Registro correcto, por favor agregue su dirección!');
          }).catch(error => this.data.error(error));
        }else{
          this.data.error(data['message']);
        }
      }
    }catch (error){
      this.data.error(error['message']);
    }
    this.btnDisable = false;
  }
}
