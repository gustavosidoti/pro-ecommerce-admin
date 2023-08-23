
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { URL_BACKEND } from 'src/app/config/config';
import { CategoriesService } from '../_services/categories.service';

@Component({
  selector: 'app-edit-new-category',
  templateUrl: './edit-new-category.component.html',
  styleUrls: ['./edit-new-category.component.scss']
})
export class EditNewCategoryComponent implements OnInit {

 // DEFINO USERC QUE SE LO VOY A EMITIR AL PADRE CUANDO AGREGUE UN USUARIO
 @Output() CategorieE: EventEmitter<any> = new EventEmitter();
 @Input() categorieSelected:any

 isLoading$:any;
 name:any = null;

 imagen_file:any = null;
 imagen_previsualizacion:any = null;
 state:any = null;
 

 constructor(public modal: NgbActiveModal,
             public toaster: Toaster,
             public _categorieService: CategoriesService) { }

 ngOnInit(): void {
  this.name = this.categorieSelected.title;
  this.state = this.categorieSelected.state;
  this.imagen_previsualizacion = URL_BACKEND+'api/categories/uploads/categorie/'+this.categorieSelected.imagen;
   
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
 }

 save(){
   // Si falta algún campo - validación
   if(!this.name){
     this.toaster.open(NoticyAlertComponent, {text:`danger-'Upss! Necesitas ingresar todos los campos'`});
     return;
   }

   let formData = new FormData();
   formData.append('_id', this.categorieSelected._id);
   formData.append('title', this.name);
   formData.append('state', this.state);
   // Si viene imagen la carga, sino continua
   if(this.imagen_file){
     formData.append('portada', this.imagen_file);
   }
   //

   this._categorieService.updateCategorie(formData).subscribe((resp:any)=>{
     console.log(resp.categorie.title + "paso por aca");
     // emitimos al padre la categoria creada
     this.CategorieE.emit(resp.categorie);
     // cerramos la ventana de agregación
     this.modal.close();
   })
 }

}


