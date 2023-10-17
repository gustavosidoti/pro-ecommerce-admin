import { Component, OnInit } from '@angular/core';
import { CuponeService } from '../_services/cupone.service';

@Component({
  selector: 'app-add-new-cupone',
  templateUrl: './add-new-cupone.component.html',
  styleUrls: ['./add-new-cupone.component.scss']
})
export class AddNewCuponeComponent implements OnInit {

isLoading$:any;
code:any = null;
type_discount:any = 1;
discount:any = 0;
type_count:any = 1;
num_use:any = 0;
type_segment:any = 1;
products_selected:any = [];
categories_selected:any = [];

  constructor(
    public _cuponService:CuponeService,

  ) { }

  ngOnInit(): void {
    this.isLoading$= this._cuponService.isLoading$;
  }

  checkedTypeDiscount(value){

    this.type_discount = value;

  }

  checkedTypeCount(value){
    this.type_count = value;
  }

}
