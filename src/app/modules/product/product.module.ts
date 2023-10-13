import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { EditNewProductComponent } from './edit-new-product/edit-new-product.component';
import { DeleteNewProductComponent } from './delete-new-product/delete-new-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EditNewVariedadComponent } from './variedades/edit-new-variedad/edit-new-variedad.component';
import { DeleteNewVariedadComponent } from './variedades/delete-new-variedad/delete-new-variedad.component';
import { DeleteGaleriaImagenComponent } from './delete-galeria-imagen/delete-galeria-imagen.component';


@NgModule({
  declarations: [ProductComponent, AddNewProductComponent, EditNewProductComponent, DeleteNewProductComponent, ListProductsComponent, EditNewVariedadComponent, DeleteNewVariedadComponent, DeleteGaleriaImagenComponent],
  imports: [
    CommonModule,
    ProductRoutingModule, // este nos permitirá acceder a otros componentes
    //
    HttpClientModule, // para comunicarnos con el backend y otros sitios
    FormsModule, // formularios
    NgbModule,// este es para trabajar con bootstrap
    ReactiveFormsModule, // formularios reactivos que son otros tipos de formularios 
    InlineSVGModule, // lo trae metronic
    CRUDTableModule, // lo trae metronic
    NgbModalModule, // este es para trabajar con las ventanas emergentes con bootstrap
    NgbDatepickerModule, // maneja fechas con bootstrap
    EditorModule // este es para editar las características de los productos con formularios
  ]
})
export class ProductModule { }
