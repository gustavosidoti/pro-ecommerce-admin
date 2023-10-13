import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-delete-galeria-imagen',
  templateUrl: './delete-galeria-imagen.component.html',
  styleUrls: ['./delete-galeria-imagen.component.scss']
})
export class DeleteGaleriaImagenComponent implements OnInit {

   // DEFINO USERC QUE SE LO VOY A EMITIR AL PADRE CUANDO MODIFIQUE UN USUARIO
   @Output() ImagenD: EventEmitter<any> = new EventEmitter();
   @Input() imagen:any;
   @Input() product_id:any;
 
   constructor( public modal:NgbActiveModal,
                public _productService: ProductService,
                public toaster: Toaster ) { }
 
   ngOnInit(): void {
     
   }
 
   delete(){

    let data = {
      _id: this.product_id,
      __id: this.imagen._id
    }

     this._productService.deleteGaleria(data).subscribe( (resp: any) =>{
       // Hago la emisión del usuario nuevo que va ir al padre y este lo recibirá
       this.ImagenD.emit("");
       this.modal.close();
     }, (error) =>{
       if(error.error){
       this.toaster.open(NoticyAlertComponent, {text:`danger-${error.error.message}`});
       }
     })
   }

}
