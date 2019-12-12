import {Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
  }) 
  
export class Loading {

    constructor(public loadingController: LoadingController) { }

    async presentLoading(msg:string) {
        let loading = await this.loadingController.create({
            message: msg,
        });
        await loading.present();
    }

    async cerrarLoading() {
        this.loadingController.dismiss();
    }

}