import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { URL_BACKEND } from 'src/app/config/config';
import { SliderService } from '../_services/slider.service';

@Component({
  selector: 'app-edit-new-slider',
  templateUrl: './edit-new-slider.component.html',
  styleUrls: ['./edit-new-slider.component.scss']
})
export class EditNewSliderComponent implements OnInit {

  // DEFINO USERC QUE SE LO VOY A EMITIR AL PADRE CUANDO AGREGUE UN USUARIO
  @Output() SliderE: EventEmitter<any> = new EventEmitter();
  @Input() sliderSelected:any;

  isLoading$:any;
  name:any = null;
  link:any = null;
  state:any = 1;

  imagen_file:any = null;
  imagen_previsualizacion:any = null;

  

  constructor(public modal: NgbActiveModal,
              public toaster: Toaster,
              public _sliderService: SliderService) { }

  ngOnInit(): void {
    this.name = this.sliderSelected.title;
    this.link = this.sliderSelected.link;
    this.state = this.sliderSelected.state;
    this.imagen_previsualizacion = URL_BACKEND+'api/slider/uploads/slider/'+this.sliderSelected.imagen;
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
    if(!this.name || !this.link){
      this.toaster.open(NoticyAlertComponent, {text:`danger-'Upss! Necesitas ingresar todos los campos'`});
      return;
    }

    let formData = new FormData();
    formData.append('_id',this.sliderSelected._id);
    formData.append('title', this.name);
    formData.append('link', this.link);
    formData.append('state', this.state);
    formData.append('portada', this.imagen_file);
    //

    this._sliderService.updateSlider(formData).subscribe((resp:any)=>{
      console.log(resp);
      // emitimos al padre la categoria creada
      this.SliderE.emit(resp.slider);
      // cerramos la ventana de agregación
      this.modal.close();
    })
  }

}
