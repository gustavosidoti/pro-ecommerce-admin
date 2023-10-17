import { Component, OnInit } from '@angular/core';
import { SliderService } from '../_services/slider.service';
import { DeleteNewSliderComponent } from '../delete-new-slider/delete-new-slider.component';
import { EditNewSliderComponent } from '../edit-new-slider/edit-new-slider.component';
import { AddNewSliderComponent } from '../add-new-slider/add-new-slider.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-list-slider',
  templateUrl: './list-slider.component.html',
  styleUrls: ['./list-slider.component.scss']
})
export class ListSliderComponent implements OnInit {

  sliders:any = [];
  isLoading$:any;
  search:any = "";
  
  

  URL_BACKEND:any = URL_BACKEND;

  constructor(public _serviceSlider: SliderService,
              public modalService: NgbModal
              ) { }

  ngOnInit(): void {
    this.isLoading$ = this._serviceSlider.isLoading$;
    this.allSliders();
  }

  allSliders(){
    this._serviceSlider.allSlider(this.search).subscribe((resp:any) =>{
      console.log(resp);
      this.sliders = resp.slider;
    })
  }

  refresh(){
    this.search = "";
    this.allSliders();
  }

  openCreate(){
    //ventana emergente
    const modalRef = this.modalService.open(AddNewSliderComponent, {centered:true,size: 'md'});

    modalRef.componentInstance.SliderC.subscribe((slider:any) =>{
      this.sliders.unshift(slider);
    })
  }

  editSlider(slider){
    //ventana emergente
    const modalRef = this.modalService.open(EditNewSliderComponent, {centered:true,size: 'md'});
    modalRef.componentInstance.sliderSelected = slider
    
    modalRef.componentInstance.SliderE.subscribe((resp:any) =>{
      let index = this.sliders.findIndex(item => item._id == resp._id);
      if(index != -1){
        this.sliders[index] = resp;
      }
      
    })
  }

  

  delete(slider:any){
    //ventana emergente
    const modalRef = this.modalService.open(DeleteNewSliderComponent, {centered:true,size: 'md'});
    modalRef.componentInstance.sliderSelected = slider
    
    modalRef.componentInstance.SliderD.subscribe((resp:any) =>{
      let index = this.sliders.findIndex(item => item._id == slider._id);
      if(index != -1){
        this.sliders.splice(index,1)
      }
      
    })
  }

  // fin de la clase

}
