import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuponeRoutingModule } from './cupone-routing.module';
import { CuponeComponent } from './cupone.component';
import { AddNewCuponeComponent } from './add-new-cupone/add-new-cupone.component';
import { EditNewCuponeComponent } from './edit-new-cupone/edit-new-cupone.component';
import { DeleteNewCuponeComponent } from './delete-new-cupone/delete-new-cupone.component';
import { ListNewCuponeComponent } from './list-new-cupone/list-new-cupone.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';
import { UsersRoutingModule } from '../users/users-routing.module';


@NgModule({
  declarations: [CuponeComponent, AddNewCuponeComponent, EditNewCuponeComponent, DeleteNewCuponeComponent, ListNewCuponeComponent],
  imports: [
    CommonModule,
    CuponeRoutingModule,
    UsersRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
  ]
})
export class CuponeModule { }