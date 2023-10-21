import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CuponeService } from '../_services/cupone.service';

@Component({
  selector: 'app-delete-new-cupone',
  templateUrl: './delete-new-cupone.component.html',
  styleUrls: ['./delete-new-cupone.component.scss']
})
export class DeleteNewCuponeComponent implements OnInit {

  // DEFINO USERC QUE SE LO VOY A EMITIR AL PADRE CUANDO MODIFIQUE UN USUARIO
  @Output() CuponD: EventEmitter<any> = new EventEmitter();
  @Input() cuponSelected:any;


  constructor( public modal:NgbActiveModal,
               public _cuponService: CuponeService,
               public toaster: Toaster ) { }

  ngOnInit(): void {
    
  }

  delete(){
    this._cuponService.deleteCupone(this.cuponSelected._id).subscribe( (resp: any) =>{
      // Hago la emisión del usuario nuevo que va ir al padre y este lo recibirá
      this.CuponD.emit("");
      this.toaster.open(NoticyAlertComponent, {text:`success-'EL CUPON SE ELIMINO CORRECTAMENTE'`});
      this.modal.close();
    }, (error) =>{
      if(error.error){
      this.toaster.open(NoticyAlertComponent, {text:`danger-${error.error.message}`});
      }
    })
  }

}
