import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategoriesService } from '../../categories/_services/categories.service';
import { SliderService } from '../_services/slider.service';

@Component({
  selector: 'app-delete-new-slider',
  templateUrl: './delete-new-slider.component.html',
  styleUrls: ['./delete-new-slider.component.scss']
})
export class DeleteNewSliderComponent implements OnInit {

  // DEFINO USERC QUE SE LO VOY A EMITIR AL PADRE CUANDO MODIFIQUE UN USUARIO
  @Output() SliderD: EventEmitter<any> = new EventEmitter();
  @Input() sliderSelected:any;


  constructor( public modal:NgbActiveModal,
              public sliderService: SliderService,
               public toaster: Toaster ) { }

  ngOnInit(): void {
    
  }

  delete(){
    this.sliderService.deleteSlider(this.sliderSelected._id).subscribe( (resp: any) =>{
      // Hago la emisión del usuario nuevo que va ir al padre y este lo recibirá
      this.SliderD.emit("");
      this.toaster.open(NoticyAlertComponent, {text:`success-'EL SLIDER SE ELIMINÓ CORRECTAMENTE'`});
      this.modal.close();
    }, (error) =>{
      if(error.error){
      this.toaster.open(NoticyAlertComponent, {text:`danger-${error.error.message}`});
      }
    })
  }

}
