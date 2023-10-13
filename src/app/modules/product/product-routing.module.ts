import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { EditNewProductComponent } from './edit-new-product/edit-new-product.component';

// ESTO ES PARA ORGANIZAR LAS RUTAS Y LAS VISTAS DE ESTE COMPONENTE
// hay vistas sin ventanas emergentes como lo es categorias y usuarios
const routes: Routes = [{
  path: '',
  component: ProductComponent,
  children:[
    {
      path: 'registrar-producto',
      component: AddNewProductComponent
    },
    // este será una vista diferente sin ventanas emergentes
    {
      path: 'editar-producto/:id',
      component: EditNewProductComponent
    },
    {
      path: 'lista-de-todos-los-productos',
      component: ListProductsComponent
    },
  ]
}];






@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
