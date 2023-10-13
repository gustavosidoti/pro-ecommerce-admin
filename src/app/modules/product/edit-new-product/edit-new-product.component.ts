import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../categories/_services/categories.service';
import { ProductService } from '../_services/product.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteNewVariedadComponent } from '../variedades/delete-new-variedad/delete-new-variedad.component';
import { EditNewVariedadComponent } from '../variedades/edit-new-variedad/edit-new-variedad.component';
import { DeleteGaleriaImagenComponent } from '../delete-galeria-imagen/delete-galeria-imagen.component';

@Component({
  selector: 'app-edit-new-product',
  templateUrl: './edit-new-product.component.html',
  styleUrls: ['./edit-new-product.component.scss']
})
export class EditNewProductComponent implements OnInit {

  product_id:any = null;
  product_selected:any = null;
  type_inventario:any = 1;

  title: any = null;
  sku: any = null;
  categories:any = [];
  categorie:any = "";
  priceUSD:any = 0;
  priceEuro:any = 0;
  imagen_file:any = null;
  imagen_previsualizacion:any = null;
  resumen:any = null;
  description:any = null;
  // los tags
  tag:any = null;
  tags:any = [];
  stock:any = 0;
  stock_multiple:any = 0;
  valor_multiple:any = 0;
  variedades:any = [];
 
  isLoading$:any;

  imagen_file_galeria:any=null;
  imagen_previz_galeria:any=null;
  galerias:any = [];

  constructor(public _productService:ProductService,
              public router:Router,
              public _categorieService: CategoriesService,
              public activeRouter: ActivatedRoute,
              public toaster:Toaster,
              public modalService:NgbModal ) {  // este nos permite pasar parametros por URL

              }

  ngOnInit(): void {
    this.isLoading$ = this._productService.isLoading$;
    this.activeRouter.params.subscribe((resp:any) => {
      console.log(resp)
      this.product_id = resp.id;
    });
    // CARGA EL PRODUCTO SELECCIONADO
    this._productService.showProduct(this.product_id).subscribe((resp:any) =>{
      this.product_selected = resp.product;

      this.title = this.product_selected.title;
      this.sku = this.product_selected.sku;
      this.categorie = this.product_selected.categorie._id;
      this.priceUSD = this.product_selected.priceUSD;
      this.priceEuro = this.product_selected.priceEuro;
      this.stock = this.product_selected.stock;
      this.imagen_previsualizacion = this.product_selected.imagen;
      this.resumen = this.product_selected.resumen;
      this.description = this.product_selected.description;
      this.tags = this.product_selected.tags;
      this.variedades = this.product_selected.variedades;
      this.type_inventario = this.product_selected.type_inventario;

      this.galerias = this.product_selected.galerias;
    })


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

  processFile($event){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.imagen_previsualizacion = null;
      this.toaster.open(NoticyAlertComponent, {text:`danger-'Upss! Necesitas ingresar un archivo de tipo imagen'`});
      return;
    }
    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => {
      this.imagen_previsualizacion = reader.result;
    }
    this.loadServices();
  }

  processFileGaleria($event){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.imagen_previz_galeria = null;
      this.toaster.open(NoticyAlertComponent, {text:`danger-'Upss! Necesitas ingresar un archivo de tipo imagen'`});
      return;
    }
    this.imagen_file_galeria = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file_galeria);
    reader.onloadend = () => {
      this.imagen_previz_galeria = reader.result;
    }
    this.loadServices();
  }

  addTag(){
    this.tags.push(this.tag)
    this.tag = "";
  }
  removeTag(i){
    this.tags.splice(i,1);
  }

  update(){
    if(!this.title ||!this.categorie ||!this.priceEuro ||!this.priceUSD || !this.resumen || !this.description 
      || !this.sku || this.tags.length == 0 ){

      this.toaster.open(NoticyAlertComponent, {text:`danger-'Upss! NECESITAS DIGITAR TODOS LOS CAMPOS DEL FORMULARIO'`});  
      return;

    }
    let formData = new FormData();
    formData.append("_id",this.product_id);
    formData.append("title",this.title);
    formData.append("categorie",this.categorie);
    formData.append("sku",this.sku);
    formData.append("priceEuro",this.priceEuro);
    formData.append("priceUSD",this.priceUSD);
    formData.append("description",this.description);
    formData.append("resumen",this.resumen);
    formData.append("type_inventario",this.type_inventario);
    formData.append("tags",JSON.stringify(this.tags));
    formData.append("stock",this.stock);
    if(this.imagen_file){
       formData.append("imagen",this.imagen_file);
    }

    this._productService.updateProducts(formData).subscribe((resp:any) => {
      console.log(resp);
      if(resp.code == 403){
        this.toaster.open(NoticyAlertComponent, {text:`danger-'UPSS! EL PRODUCTO YA EXISTE, DIGITAR OTRO NOMBRE'`});  
        return;
      }
      else{
        this.toaster.open(NoticyAlertComponent, {text:`primary-'EL PRODUCTO SE ACTUALIZÓ CORRECTAMENTE'`});

        return;
      }
    })
  }

  listProduct(){
    this.router.navigateByUrl('/productos/lista-de-todos-los-productos')
  }

  checkedInventario(value){
    this.type_inventario = value;
  }

  saveVariedad(){

    if(!this.valor_multiple || !this.stock_multiple){
      this.toaster.open(NoticyAlertComponent, {text:`danger-'ES NECESARIO DIGITAR UN VALOR Y UNA CANTIDAD'`});
      return;
    }

    let data = {
      product: this.product_id,
      valor: this.valor_multiple,
      stock: this.stock_multiple
    }
    this._productService.createVariedad(data).subscribe((resp:any)=>{
      console.log(resp)
      
      this.valor_multiple = null;
      this.stock_multiple = null;
      
      // PARA MOSTRAR LA VARIEDAD ACTUALIZADA SE HACE ESTO
      let index = this.variedades.findIndex(item => item._id == resp.variedad._id);
      if(index != -1){
        this.variedades[index] = resp.variedad;
        this.toaster.open(NoticyAlertComponent, {text:`primary-'LA VARIEDAD SE EDITO CORRECTAMENTE'`});
      }else{
        this.variedades.unshift(resp.variedad);
        this.toaster.open(NoticyAlertComponent, {text:`primary-'LA VARIEDAD SE REGISTRÓ CORRECTAMENTE'`});
      }
    })
  }

  editVariedad(variedad){
      //ventana emergente
    const modalRef = this.modalService.open(EditNewVariedadComponent, {centered:true,size: 'md'});
    modalRef.componentInstance.variedad = variedad
    
    modalRef.componentInstance.VariedadE.subscribe((resp:any) =>{
      let index = this.variedades.findIndex(item => item._id == resp._id);
      if(index != -1){
        this.variedades[index] = resp;
        this.toaster.open(NoticyAlertComponent, {text:`primary-'LA VARIEDAD SE EDITO CORRECTAMENTE'`});
      }
      
    })
  }

  deleteVariedad(variedad){
    //ventana emergente
    const modalRef = this.modalService.open(DeleteNewVariedadComponent, {centered:true,size: 'md'});
    modalRef.componentInstance.variedad = variedad
    
    modalRef.componentInstance.VariedadD.subscribe((resp:any) =>{
      let index = this.variedades.findIndex(item => item._id == variedad._id);
      if(index != -1){
        this.variedades.splice(index,1)
        this.toaster.open(NoticyAlertComponent, {text:`primary-'LA VARIEDAD SE ELIMINO CORRECTAMENTE'`});
      }
      
    })
  }

  storeImagen(){
      // VALIDAMOS SI LA IMAGEN NO EXISTE
    if(!this.imagen_file_galeria){
      this.toaster.open(NoticyAlertComponent, {text:`danger-'NECESITAS SELECCIONAR UNA IMAGEN'`});
      return;
    }

    let formData = new FormData();
    formData.append("_id",this.product_id);
    formData.append("imagen",this.imagen_file_galeria);
    formData.append("__id",new Date().getTime().toString());

    this._productService.createGaleria(formData).subscribe((resp:any) =>{
      console.log(resp);
      this.imagen_file_galeria = null;
      this.imagen_previz_galeria = null;
      this.galerias.unshift(resp.imagen);
    })

  }

  removeImagen(imagen){
    //ventana emergente
    const modalRef = this.modalService.open(DeleteGaleriaImagenComponent, {centered:true,size: 'md'});
    modalRef.componentInstance.imagen = imagen
    modalRef.componentInstance.product_id = this.product_id;
    
    modalRef.componentInstance.ImagenD.subscribe((resp:any) =>{
      let index = this.galerias.findIndex(item => item._id == imagen._id);
      if(index != -1){
        this.galerias.splice(index,1)
        this.toaster.open(NoticyAlertComponent, {text:`primary-'LA IMAGEN SE ELIMINO CORRECTAMENTE'`});
      }
      
    })
  }

  // fin de la clase
  }


