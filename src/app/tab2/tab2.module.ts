import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, Pipe  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { PipesModule } from '../pipes/pipes.module';
import { ModalPage } from '../modal/modal.page';


@NgModule({
  
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
  ],
  declarations: [Tab2Page, ModalPage],
  entryComponents:[
    ModalPage
  ]
})
export class Tab2PageModule {}
