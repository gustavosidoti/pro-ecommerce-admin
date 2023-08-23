import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategoriesService } from '../_services/categories.service';

@Component({
  selector: 'app-delete-new-category',
  templateUrl: './delete-new-category.component.html',
  styleUrls: ['./delete-new-category.component.scss']
})
export class DeleteNewCategoryComponent implements OnInit {

  // DEFINO USERC QUE SE LO VOY A EMITIR AL PADRE CUANDO MODIFIQUE UN USUARIO
  @Output() CategorieD: EventEmitter<any> = new EventEmitter();
  @Input() categorieSelected:any;


  constructor( public modal:NgbActiveModal,
              public categorieService: CategoriesService,
               public toaster: Toaster ) { }

  ngOnInit(): void {
    
  }

  delete(){
    this.categorieService.deleteCategorie(this.categorieSelected._id).subscribe( (resp: any) =>{
      // Hago la emisión del usuario nuevo que va ir al padre y este lo recibirá
      this.CategorieD.emit("");
      this.toaster.open(NoticyAlertComponent, {text:`success-'LA CATEGORÍA SE ELIMINÓ CORRECTAMENTE'`});
      this.modal.close();
    }, (error) =>{
      if(error.error){
      this.toaster.open(NoticyAlertComponent, {text:`danger-${error.error.message}`});
      }
    })
  }

}
