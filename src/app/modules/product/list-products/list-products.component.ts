import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { URL_BACKEND } from 'src/app/config/config';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteNewProductComponent } from '../delete-new-product/delete-new-product.component';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategoriesService } from '../../categories/_services/categories.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  URL_BACKEND: any =  URL_BACKEND
  isLoading$:any // 2-para que renderice la vista la plantilla METRONIC
  products:any = [];
  search:any=null;
  categorie:any=null;
  categories:any = [];

  constructor( public _productService:ProductService,
                public router: Router,
                public modalService: NgbModal,
                public toaster:Toaster,
                public _categorieService: CategoriesService) { }

  ngOnInit(): void {
    this.isLoading$ = this._productService.isLoading$; // 3 si o si para que renderice la vista la plantilla METRONIC 
    this.allProducts();

    // CARGA LAS CATEGORIAS
    this._categorieService.allCategories().subscribe((resp:any) => {
      console.log(resp);
      this.categories = resp.categories;
      // al ser un servicio que llama a otro debemos ejecutar esta funcion para que renderice
      this.loadServices();
    })
  }

  // truco porque no salio a la primera
  // funcion que renderiza una imagen de carga
  loadServices(){
    this._productService.isLoadingSubject.next(true);
    setTimeout(() => {
      this._productService.isLoadingSubject.next(false);
    }, 50);
  }

  allProducts(){
    this._productService.allProducts(this.search, this.categorie).subscribe((resp:any)=>{
      console.log(resp);
      this.products = resp.products;
    })
  }

  refresh(){
    this.categorie = null;
    this.search = null;
    this.allProducts();
  }

  editProduct(product){
    this.router.navigateByUrl("/productos/editar-producto/"+product._id)
  }
  delete(product){
    //ventana emergente
    const modalRef = this.modalService.open(DeleteNewProductComponent, {centered:true,size: 'md'});
    modalRef.componentInstance.product = product
    
    modalRef.componentInstance.ProductD.subscribe((resp:any) =>{
      let index = this.products.findIndex(item => item._id == product._id);
      if(index != -1){
        this.products.splice(index,1)
        this.toaster.open(NoticyAlertComponent, {text:`primary-'EL PRODUCTO SE ELIMINO CORRECTAMENTE'`});
      }
      
    })
  }
    
}
