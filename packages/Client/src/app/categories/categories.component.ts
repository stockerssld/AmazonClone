import { RestApiService } from './../rest-api.service';
import { Component, OnInit } from '@angular/core';
import {DataService} from './../data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  newCategory: '';
  btnDisabled = false;
  constructor(
    private data: DataService,
    private rest: RestApiService
  ) { }

  async ngOnInit() {
    const url = 'http://localhost:3000/api/categories';
    try{
      const data = await this.rest.get(url);
      data['success']?(this.categories = data['categories']) : this.data.error(data['message']);
    }catch(error){
      this.data.error(error['message']);
    }
  }
  
  async addCategory() {
    this.btnDisabled = true;
    console.log(this.newCategory);
    try {
      const data = await this.rest.post(
        'http://localhost:3000/api/categories',
        { name: this.newCategory }
      );
      data['success']
        ? this.data.success(data['message'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

}

