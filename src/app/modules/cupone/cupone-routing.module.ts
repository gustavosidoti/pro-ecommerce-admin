import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuponeComponent } from './cupone.component';
import { AddNewCuponeComponent } from './add-new-cupone/add-new-cupone.component';
import { EditNewCuponeComponent } from './edit-new-cupone/edit-new-cupone.component';
import { ListNewCuponeComponent } from './list-new-cupone/list-new-cupone.component';

const routes: Routes = [{

  path: '',
  component: CuponeComponent,
  children:[
    {
      path:'registrar-cupon',
      component: AddNewCuponeComponent
    },
    {
      path: 'editar-cupon/:id',
      component: EditNewCuponeComponent
    },
    {
      path: 'listar-cupones',
      component: ListNewCuponeComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuponeRoutingModule { }
