import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategoriesService } from '../../categories/_services/categories.service';
import { SliderService } from '../_services/slider.service';

@Component({
  selector: 'app-add-new-slider',
  templateUrl: './add-new-slider.component.html',
  styleUrls: ['./add-new-slider.component.scss']
})
export class AddNewSliderComponent implements OnInit {

  // DEFINO USERC QUE SE LO VOY A EMITIR AL PADRE CUANDO AGREGUE UN USUARIO
  @Output() SliderC: EventEmitter<any> = new EventEmitter();

  isLoading$:any;
  name:any = null;
  link:any = null;

  imagen_file:any = null;
  imagen_previsualizacion:any = null;

  

  constructor(public modal: NgbActiveModal,
              public toaster: Toaster,
              public _sliderService: SliderService) { }

  ngOnInit(): void {
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
    if(!this.name || !this.imagen_file || !this.link){
      this.toaster.open(NoticyAlertComponent, {text:`danger-'Upss! Necesitas ingresar todos los campos'`});
      return;
    }

    let formData = new FormData();
    formData.append('title', this.name);
    formData.append('link', this.link);
    formData.append('portada', this.imagen_file);
    //

    this._sliderService.createSlider(formData).subscribe((resp:any)=>{
      console.log(resp);
      // emitimos al padre la categoria creada
      this.SliderC.emit(resp);
      // cerramos la ventana de agregación
      this.modal.close();
    })
  }

}
