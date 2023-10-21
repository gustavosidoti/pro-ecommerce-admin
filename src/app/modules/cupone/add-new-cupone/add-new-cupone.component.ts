import { Component, OnInit } from '@angular/core';
import { CuponeService } from '../_services/cupone.service';
import { ProductsComponent } from '../../e-commerce/products/products.component';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from '../../../componets/notifications/noticy-alert/noticy-alert.component';
import { element } from 'protractor';

@Component({
  selector: 'app-add-new-cupone',
  templateUrl: './add-new-cupone.component.html',
  styleUrls: ['./add-new-cupone.component.scss']
})
export class AddNewCuponeComponent implements OnInit {

isLoading$:any;

products:any = [];
product:any = "";
categories:any = [];
categorie:any = "";

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
    public toaster:Toaster
  ) { }

  ngOnInit(): void {
    this.isLoading$= this._cuponService.isLoading$;

    this._cuponService.cuponConfig().subscribe((resp:any) =>{
      console.log(resp);
      this.categories = resp.categories;
      this.products = resp.products;
    })
  }

  checkedTypeDiscount(value){

    this.type_discount = value;

  }

  checkedTypeCount(value){
    this.type_count = value;
  }

  checkedTypeSegment(value){
    this.type_segment = value;
    this.categories_selected = [];
    this.products_selected = [];
  }

  addProductOrCategorie(){
        if(this.type_segment == 1){
    
          // valido si ya seleccione ese producto antes en la lista, no lo muestre
          let INDEX = this.products_selected.findIndex(item => item._id == this.product);
          if(INDEX != -1){
            this.toaster.open(NoticyAlertComponent,{ text:`danger-'UPPS ! EL PRODUCTO YA EXISTE, SELECCIONA OTRO'`});
            return;
          }else{
            let PRODUCT_S = this.products.find(item => item._id == this.product);
            this.product = null;
            this.products_selected.unshift(PRODUCT_S);
          }
        }else{
          // valido si ya seleccione ese producto antes en la lista, no lo muestre
          let INDEX = this.categories_selected.findIndex(item => item._id == this.categorie);
          if(INDEX != -1){
            this.toaster.open(NoticyAlertComponent,{ text:`danger-'UPPS ! LA CATEGORIA YA EXISTE, SELECCIONA OTRA'`});
            return;
          }else{
            let CATEGORIE_S = this.categories.find(item => item._id == this.categorie);
            this.categorie = null;
            this.categories_selected.unshift(CATEGORIE_S);
        }
      }
  }

  // remueve los productos de la lista
  removeProduct(product){
    let INDEX = this.products_selected.findIndex(item => item._id == product._id);
    if(INDEX != -1){
      this.products_selected.splice(INDEX,1);
    }
  }
  // remueve las categorías de la lista
  removeCategorie(categorie){
    let INDEX = this.categories_selected.findIndex(item => item._id == categorie._id);
    if(INDEX != -1){
      this.categories_selected.splice(INDEX,1);
    }
  }

  save(){
    // validaciones de campos vacios
    if(!this.code || !this.discount){

      this.toaster.open(NoticyAlertComponent,{ text:`danger-'UPPS ! ALGUNOS CAMPOS ESTAN VACIOS'`});
      return;
    }

    if(this.type_discount == 2){
        if(this.type_discount == 0){
           this.toaster.open(NoticyAlertComponent,{ text:`danger-'UPPS ! TIENES QUE DIGITAR EL NUMERO DE USOS'`});
           return;
        }
      }   

      if(this.type_segment == 1){
        if(this.products_selected == 0){
           this.toaster.open(NoticyAlertComponent,{ text:`danger-'UPPS ! TIENES QUE SELECCIONAR UN PRODUCTO AL MENOS'`});
           return;
        }
      }   

      if(this.type_segment == 2){
        if(this.categories_selected.length == 0){
           this.toaster.open(NoticyAlertComponent,{ text:`danger-'UPPS ! TIENES QUE SELECCIONAR UNA CATEGORIA AL MENOS'`});
           return;
        }
      }   


    let PRODUCTS = [];
    let CATEGORIES = [];

    this.products_selected.forEach(element =>{
      PRODUCTS.push({_id: element._id});
    });

    this.categories_selected.forEach(element =>{
      CATEGORIES.push({_id: element._id});
    })

    let data = {
      code: this.code,
      type_discount: this.type_discount,
      discount: this.discount,
      type_count: this.type_count,
      num_use: this.num_use,
      type_segment: this.type_segment,
      products: PRODUCTS,
      categories: CATEGORIES
    };
    this._cuponService.createCupone(data).subscribe((resp:any)=>{
      console.log(resp);

      if(resp.message == 403){
        this.toaster.open(NoticyAlertComponent,{ text:`danger-'${resp.message_text}'`});
        return;
      }else{
        this.toaster.open(NoticyAlertComponent,{ text:`primary-'${resp.message_text}'`});

        this.products_selected = [];
        this.categories_selected = [];
        this.code = null;
        this.type_discount = 1;
        this.discount = null;
        this.type_count = 1;
        this.num_use = null;
        this.type_segment = 1;

        return;
      }

    })
  }



 // fin de la clase
}
