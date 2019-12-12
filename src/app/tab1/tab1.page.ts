import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { note } from '../Model/note';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { Router } from '@angular/router';
import { Loading } from '../Utils/Loading';
import { Toast } from '../Utils/Toast';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public todoForm:FormGroup;

  constructor(private formBuilder:FormBuilder, 
    private todoS:TodoservicioService, 
    private router:Router,
    public myLoading:Loading,
    public myToast:Toast) {}

  ngOnInit(){
    this.todoForm=this.formBuilder.group({
      title:['', Validators.required],
      description:['']
    })
  }

  addNote(){
    let data:note;
    data={
      title:this.todoForm.get('title').value,
      description:this.todoForm.get('description').value
    };
    this.myLoading.presentLoading('Agregando');
    this.todoS.addTodo(data)
    .then((ok)=>{
      this.myToast.presentToast("Nota Agregada",2000,'success');
      this.todoForm.reset();
    })
    .catch((err)=>{
      this.myToast.presentToast('Error Agregando Nota',4000,'danger' )
    })
    .finally(()=>{
      this.myLoading.cerrarLoading();
      this.router.navigateByUrl('/tabs/tab2');
    })
  }

}
