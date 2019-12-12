import { Component } from '@angular/core';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Toast } from '../Utils/Toast';
import { Loading } from '../Utils/Loading';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public listadoPanel :any[]= [];
  textoBuscar= '';
  private todoForm:FormGroup;
  

  constructor(private todoS:TodoservicioService, 
    private myLoading:Loading,
    private router:Router, 
    public myToast:Toast,
    private formBuilder: FormBuilder,
    public alertController: AlertController) {
  }

  

  ngOnInit() {
    this.refrescar();
    console.log("Solicitada la peticion");
  }

  public editaNota(id:string){
    //this.myModal.presentModal();
  }


  public borraNota(id: string) {
    this.presentAlert(id);
    /*.then(()=>{
      this.todoS.deleteTodo(id).then((salida) => {
        this.refrescar();
        console.log("Borrando");
        this.myToast.presentToast('Nota Eliminada',2000,'success');
  
      }).catch((err) => {
        console.log(err);
      })
    })
    .catch((err)=>{
      console.log(err);
    })*/
  }

  public searchBar(evt){
    console.log(evt.target.value);
    let texto=evt.target.value;
    this.textoBuscar=texto;
  }


  public doRefresh(e:any){
      this.refrescar().then(()=>{
        e.target.complete()
      },
        error => {
          console.log('Refrescar fallido')
          e.target.complete()
        });
  }


  private async refrescar() {
    await this.myLoading.presentLoading('Cargando');
    this.listadoPanel = [];
    try{
      this.todoS.readTodo().subscribe((lista) => {
      this.listadoPanel = lista;
      this.myLoading.cerrarLoading();
      },
      error=>{
        console.log('Cargar fallido')
      });
    }catch{
      console.log('Cargar fallido')
      this.myLoading.cerrarLoading();
    }
  }

  public irNueva():void{
    this.router.navigateByUrl('/tabs/tab1')
  }


  async presentAlert(id:string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Deasea eliminar la nota',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: async () => {
            await this.todoS.deleteTodo(id).then((salida) => {
              this.refrescar();
              console.log("Borrando");
              this.myToast.presentToast('Nota Eliminada',2000,'success');
            }).catch((err) => {
              console.log(err);
            })
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
}