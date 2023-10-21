import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteNewCuponeComponent } from '../delete-new-cupone/delete-new-cupone.component';
import { CuponeService } from '../_services/cupone.service';

@Component({
  selector: 'app-list-new-cupone',
  templateUrl: './list-new-cupone.component.html',
  styleUrls: ['./list-new-cupone.component.scss']
})
export class ListNewCuponeComponent implements OnInit {

  isLoading$:any = null;
  search:any = "";
  cupones:any = [];

  constructor(
    public _cuponService: CuponeService,
    public router: Router,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._cuponService.isLoading$;
    this.allCupons();
  }

  refresh(){
    this.search = "";
    this.allCupons();
  }

  allCupons(){
    this._cuponService.allCupons(this.search).subscribe((resp:any) =>{
      console.log(resp);
      this.cupones = resp.cupones;
    })
  }

  editCupon(cupon){
    this.router.navigateByUrl("/cupones/editar-cupon/"+cupon._id);
  }
  
  delete(cupon){
    //ventana emergente
    const modalRef = this.modalService.open(DeleteNewCuponeComponent, {centered:true,size: 'md'});
    modalRef.componentInstance.cuponSelected = cupon
    
    modalRef.componentInstance.CuponD.subscribe((resp:any) =>{
      let index = this.cupones.findIndex(item => item._id == cupon._id);
      if(index != -1){
        this.cupones.splice(index,1)
      }
      
    })
  }
}

