import { RestApiService } from './../rest-api.service';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { __await } from 'tslib';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  btnDisabled = false;
  currentAddress: any;

  constructor(private data: DataService, private rest: RestApiService) { }

  async ngOnInit() {
    const url = 'http://localhost:3000/api/accounts/address';
    try {
      const data = await this.rest.get(
        url
      );
      if ( JSON.stringify(data['address']) === '{}' && this.data.message === ''){
        this.data.warning(
          'Tu no tienes una direccion de envio... Por favor ingrese una.'
        );
      }
      this.currentAddress = data['address'];
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async updateAddress(){
    const url = 'http://localhost:3000/api/accounts/address';
    this.btnDisabled = true;
    try {
      const rest = await this.rest.post(url, this.currentAddress);
      rest['success'] ? (this.data.succes(rest['message']), await this.data.getProfile()) : this.data.error(rest['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
