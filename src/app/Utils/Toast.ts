import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Toast {

  constructor(public toastController:ToastController) {}


  async presentToast(msg:string, dur:number=2000,color:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: dur,
      color: color
    });
    toast.present();
  }


  async cerrarToast(){
    this.toastController.dismiss();
  }

}