import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../_services/categories.service';
import { AddNewCategoryComponent } from '../add-new-category/add-new-category.component';
import { URL_BACKEND } from 'src/app/config/config';
import { EditNewCategoryComponent } from '../edit-new-category/edit-new-category.component';
import { DeleteNewCategoryComponent } from '../delete-new-category/delete-new-category.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  categories:any = [];
  isLoading$:any;
  search:any = "";
  
  

  URL_BACKEND:any = URL_BACKEND;

  constructor(public _serviceCategorie: CategoriesService,
              public modalService: NgbModal
              ) { }

  ngOnInit(): void {
    this.isLoading$ = this._serviceCategorie.isLoading$;
    this.allCategories();
  }

  allCategories(){
    this._serviceCategorie.allCategories(this.search).subscribe((resp:any) =>{
      this.categories = resp.categories;
    })
  }

  refresh(){
    this.search = "";
    this.allCategories();
  }

  openCreate(){
    //ventana emergente
    const modalRef = this.modalService.open(AddNewCategoryComponent, {centered:true,size: 'md'});

    modalRef.componentInstance.CategorieC.subscribe((categorie:any) =>{
      this.categories.unshift(categorie);
    })
  }

  editCategorie(categorie){
    //ventana emergente
    const modalRef = this.modalService.open(EditNewCategoryComponent, {centered:true,size: 'md'});
    modalRef.componentInstance.categorieSelected = categorie
    
    modalRef.componentInstance.CategorieE.subscribe((resp:any) =>{
      let index = this.categories.findIndex(item => item._id == resp._id);
      if(index != -1){
        this.categories[index] = resp;
      }
      
    })
  }

  delete(categorie:any){
    //ventana emergente
    const modalRef = this.modalService.open(DeleteNewCategoryComponent, {centered:true,size: 'md'});
    modalRef.componentInstance.categorieSelected = categorie
    
    modalRef.componentInstance.CategorieD.subscribe((resp:any) =>{
      let index = this.categories.findIndex(item => item._id == categorie._id);
      if(index != -1){
        this.categories.splice(index,1)
      }
      
    })
  }

  // fin de la clase
}

