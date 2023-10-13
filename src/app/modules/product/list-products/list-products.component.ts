import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { URL_BACKEND } from 'src/app/config/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  URL_BACKEND: any =  URL_BACKEND
  isLoading$:any // 2-para que renderice la vista la plantilla METRONIC
  products:any = [];

  constructor( public _productService:ProductService,
                public router: Router) { }

  ngOnInit(): void {
    this.isLoading$ = this._productService.isLoading$; // 3 si o si para que renderice la vista la plantilla METRONIC 
    this._productService.allProducts().subscribe((resp:any)=>{
      console.log(resp);
      this.products = resp.products;
    })
    
  }

  editProduct(product){
    this.router.navigateByUrl("/productos/editar-producto/"+product._id)
  }
  delete(product){}

}
