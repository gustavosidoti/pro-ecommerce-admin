import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  // DEFINO USERC QUE SE LO VOY A EMITIR AL PADRE CUANDO MODIFIQUE UN USUARIO
  @Output() UserD: EventEmitter<any> = new EventEmitter();
  @Input() userSelected:any;


  constructor( public modal:NgbActiveModal,
              public userService: UsersService,
               public toaster: Toaster ) { }

  ngOnInit(): void {
    
  }

  delete(){
    console.log(`este es lo que va al service ${this.userSelected._id}`)
    this.userService.deleteUser(this.userSelected._id).subscribe( (resp: any) =>{
      // Hago la emisión del usuario nuevo que va ir al padre y este lo recibirá
      this.UserD.emit("");
      this.toaster.open(NoticyAlertComponent, {text:`success-'EL USUARIO SE ELIMINÓ CORRECTAMENTE'`});
      this.modal.close();
    }, (error) =>{
      if(error.error){
      this.toaster.open(NoticyAlertComponent, {text:`danger-${error.error.message}`});
      }
    })
  }

}
