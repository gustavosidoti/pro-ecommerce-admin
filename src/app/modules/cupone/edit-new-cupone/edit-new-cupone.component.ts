import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CuponeService } from '../_services/cupone.service';

@Component({
  selector: 'app-edit-new-cupone',
  templateUrl: './edit-new-cupone.component.html',
  styleUrls: ['./edit-new-cupone.component.scss']
})
export class EditNewCuponeComponent implements OnInit {

  isLoading$:any;

products:any = [];
product:any = "";
categories:any = [];
categorie:any = "";
state:any = 1;
cupone_id:any = null;

code:any = null;
type_discount:any = 1;
discount:any = 0;
type_count:any = 1;
num_use:any = 0;
type_segment:any = 1;
products_selected:any = [];
categories_selected:any = [];

cupone_selected:any = null;

  constructor(
    public _cuponService:CuponeService,
    public toaster:Toaster,
    public activeRouter: ActivatedRoute // para capturar el id del cupon en la ruta.
  ) { }

  ngOnInit(): void {
    this.isLoading$= this._cuponService.isLoading$;

    // método para capturar el id pasado por parametro en la ruta
    this.activeRouter.params.subscribe((resp:any) =>{
      console.log(resp);
      this.cupone_id = resp["id"];
    })

    // metodo que rellena los campos con el producto a editar desde la BD
    this._cuponService.showCupon(this.cupone_id).subscribe((resp:any) =>{
      console.log(resp);
      this.cupone_selected = resp.cupon;

      this.code = this.cupone_selected.code;
      this.type_discount = this.cupone_selected.type_discount;
      this.discount = this.cupone_selected.discount;
      this.type_count = this.cupone_selected.type_count;
      this.num_use = this.cupone_selected.num_use;
      this.type_segment = this.cupone_selected.type_segment;
      this.state = this.cupone_selected.state ? this.cupone_selected.state : 1;
      
      
    })

    // Rellena los combobox con el listado de productos y categorias
    this._cuponService.cuponConfig().subscribe((resp:any) =>{
      console.log(resp);
      this.categories = resp.categories;
      this.products = resp.products;
      // para mostrar los datos seleccionados de las tablas de categorias y productos
      this.showCupon();
    })
  }

  showCupon(){
    // validamos para rellenar los datos de las tablas
    if(this.type_segment == 1){
      this.cupone_selected.products.forEach(product_s => {
        this.products.forEach(product => {
          if(product._id == product_s._id){
            this.products_selected.push(product);
          }
        });
      });
    }else{
      this.cupone_selected.categories.forEach(categorie_s => {
        this.categories.forEach(categorie => {
          if(categorie._id == categorie_s._id){
            this.categories_selected.push(categorie);
          }
        });
      });
    }
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

  update(){
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
      _id: this.cupone_id,
      code: this.code,
      type_discount: this.type_discount,
      discount: this.discount,
      type_count: this.type_count,
      num_use: this.num_use,
      state: this.state,
      type_segment: this.type_segment,
      products: PRODUCTS,
      categories: CATEGORIES
    };
    this._cuponService.updateCupone(data).subscribe((resp:any)=>{
      console.log(resp);

      if(resp.message == 403){
        this.toaster.open(NoticyAlertComponent,{ text:`danger-'${resp.message_text}'`});
        return;
      }else{
        this.toaster.open(NoticyAlertComponent,{ text:`primary-'${resp.message_text}'`});
        return;
      }

    })
  }


}
