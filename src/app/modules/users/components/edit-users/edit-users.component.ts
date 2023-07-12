import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  // DEFINO USERC QUE SE LO VOY A EMITIR AL PADRE CUANDO MODIFIQUE UN USUARIO
  @Output() UserE: EventEmitter<any> = new EventEmitter();
  @Input() userSelected:any;

  name:any = null;
  surname: any = null;
  email:any = null;
  password:any = null;
  repeatPassword:any = null;

  constructor( public modal:NgbActiveModal,
              public userService: UsersService,
               public toaster: Toaster ) { }

  ngOnInit(): void {
    this.name = this.userSelected.name
    this.surname = this.userSelected.surname
    this.email = this.userSelected.email
  }

  save(){
    if(!this.name || !this.surname || !this.email){
      // 1ra validacion TODOS LOS CAMPOS SON OBLIGATORIOS
      this.toaster.open(NoticyAlertComponent, {text:`danger-'Upss! Necesitas ingresar todos los campos'`});
      return;
    }
    /*  // 2da validacion CONTRASEÑAS IGUALES
    if(this.password != this.repeatPassword){
      this.toaster.open(NoticyAlertComponent, {text:`danger-'Upss! Necesitas ingresar contraseñas iguales'`});
      return;
    }*/
      // CICLO NORMAL DE GUARDAR USUARIO
    let data = {
      _id: this.userSelected._id,
      name: this.name,
      surname: this.surname,
      email: this.email,  
    }
    this.userService.updateUser(data).subscribe( (resp: any) =>{
      // Hago la emisión del usuario nuevo que va ir al padre y este lo recibirá
      this.UserE.emit(resp.user);
      this.toaster.open(NoticyAlertComponent, {text:`success-'EL USUARIO SE ACTUALIZÓ CORRECTAMENTE'`});
      this.modal.close();
    }, (error) =>{
      if(error.error){
      this.toaster.open(NoticyAlertComponent, {text:`danger-${error.error.message}`});
      }
    })
  }

}
