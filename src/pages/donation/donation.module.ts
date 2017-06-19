import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Donation } from './donation';

@NgModule({
  declarations: [
    Donation,
  ],
  imports: [
    IonicPageModule.forChild(Donation),
  ],
  exports: [
    Donation
  ]
})
export class DonationModule {}
