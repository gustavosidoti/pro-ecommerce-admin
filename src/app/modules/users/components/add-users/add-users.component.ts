import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { UsersService } from '../../_services/users.service';
import { NoticyAlertComponent } from '../../../../componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  
  // DEFINO USERC QUE SE LO VOY A EMITIR AL PADRE CUANDO AGREGUE UN USUARIO
  @Output() UserC: EventEmitter<any> = new EventEmitter();

  name:any = null;
  surname: any = null;
  email:any = null;
  password:any = null;
  repeatPassword:any = null;

  constructor( public modal:NgbActiveModal,
              public userService: UsersService,
               public toaster: Toaster ) { }

  ngOnInit(): void {
  }

  save(){
    if(!this.name || !this.surname || !this.email || !this.password || !this.repeatPassword){
      // 1ra validacion TODOS LOS CAMPOS SON OBLIGATORIOS
      this.toaster.open(NoticyAlertComponent, {text:`danger-'Upss! Necesitas ingresar todos los campos'`});
      return;
    }
      // 2da validacion CONTRASEÑAS IGUALES
    if(this.password != this.repeatPassword){
      this.toaster.open(NoticyAlertComponent, {text:`danger-'Upss! Necesitas ingresar contraseñas iguales'`});
      return;
    }
      // CICLO NORMAL DE GUARDAR USUARIO
    let data = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword,  
    }
    this.userService.createUser(data).subscribe( (resp: any) =>{
      // Hago la emisión del usuario nuevo que va ir al padre y este lo recibirá
      this.UserC.emit(resp.user);
      this.toaster.open(NoticyAlertComponent, {text:`success-'El usuario se registró correctamente'`});
      this.modal.close();
    }, (error) =>{
      if(error.error){
      this.toaster.open(NoticyAlertComponent, {text:`danger-${error.error.message}`});
      }
    })
  }

}
