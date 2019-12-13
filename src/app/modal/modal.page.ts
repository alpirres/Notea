import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { Router } from '@angular/router';
import { Loading } from '../Utils/Loading';
import { Toast } from '../Utils/Toast';
import { note } from '../Model/note';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  private id: any;
  private titulo: any;
  private descripcion: any;
  public todoForm:FormGroup;

  constructor(private modalController: ModalController,
    private formBuilder:FormBuilder, 
    private todoS:TodoservicioService, 
    private navParams: NavParams,
    private router:Router,
    public myLoading:Loading,
    public myToast:Toast) { 
      this.id= this.navParams.get("id");
      this.titulo = this.navParams.get("titulo");
      this.descripcion = this.navParams.get("descripcion");
    }

  ngOnInit() {
    this.todoForm=this.formBuilder.group({
      title:[this.titulo, Validators.required],
      description:[this.descripcion]
    })
    
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async editNote(){
    let data:note;
    data={
      title:this.todoForm.get('title').value,
      description:this.todoForm.get('description').value
    };
    this.myLoading.presentLoading('Editando');
    this.todoS.updateTodo(this.id,data)
    .then((ok)=>{
      this.myToast.presentToast("Nota Editada",2000,'success');
      this.dismiss;
    })
    .catch((err)=>{
      this.myToast.presentToast('Error Editando Nota',4000,'danger' )
    })
    .finally(()=>{
      this.dismiss;
      this.myLoading.cerrarLoading();
      this.router.navigateByUrl('/tabs/tab2');
    })
  }

}

