import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../_services/product.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-delete-new-variedad',
  templateUrl: './delete-new-variedad.component.html',
  styleUrls: ['./delete-new-variedad.component.scss']
})
export class DeleteNewVariedadComponent implements OnInit {

   // DEFINO USERC QUE SE LO VOY A EMITIR AL PADRE CUANDO MODIFIQUE UN USUARIO
   @Output() VariedadD: EventEmitter<any> = new EventEmitter();
   @Input() variedad:any;
 
 
   constructor( public modal:NgbActiveModal,
                public _productService: ProductService,
                public toaster: Toaster ) { }
 
   ngOnInit(): void {
     
   }
 
   delete(){
     this._productService.deleteVariedad(this.variedad._id).subscribe( (resp: any) =>{
       // Hago la emisión del usuario nuevo que va ir al padre y este lo recibirá
       this.VariedadD.emit("");
       this.modal.close();
     }, (error) =>{
       if(error.error){
       this.toaster.open(NoticyAlertComponent, {text:`danger-${error.error.message}`});
       }
     })
   }

}
