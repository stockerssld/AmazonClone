import { RestApiService } from './../rest-api.service';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.scss']
})

export class MyProductComponent implements OnInit {

  products: any;

  constructor(
    private data:DataService, private rest:RestApiService
  ) { }

  async ngOnInit(){
    try{
      const data = await this.rest.get('http://localhost:3000/api/seller/products');
        data['success'] ? (this.products=data['products']):this.data.error(data['message']);
    }catch(error){
      this.data.error(error['message']);
    }
  }

}
