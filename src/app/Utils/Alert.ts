import {Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
  })
export class Alert {

  constructor(public alertController: AlertController) {}


  async presentAlert(head:string,msg:string) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.alertController.dismiss
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
    return await this.alertController.dismiss;
  }


}