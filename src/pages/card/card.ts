import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { ModalController, Platform, ViewController } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';

//Service and Storage
import { Digiservice } from '../../providers/digiservice';
import {Storage} from '@ionic/storage';
import localforage from "localforage";
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { Events } from 'ionic-angular';

/**
 * Generated class for the Card page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class Card {

  tempPayment     : any;
  tempBank        : any;
  key             : any;
  token           : any;
  setupid         : any;
  link            : any = "";
  linkT           : any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public service: Digiservice, public events: Events, public platform: Platform, public themeableBrowser: ThemeableBrowser, public Dom: DomSanitizer, public InAppBrowser: InAppBrowser, public modalCtrl: ModalController) {
    this.getPaymentTypes();

    //Event listener
    events.subscribe('card:added', () => {
      console.log("Event Occured");
      this.getPaymentTypes();
    });
  }

  //------getCards------//

 getPaymentTypes(){
  console.log('in getPaymentTypes method of give donations.')
  localforage.getItem('token').then((val) => {
   this.token = val;
   this.service.getCards(this.token[0]['token']).then((data)=>{
       this.tempPayment = [];
       if(data){
         this.tempBank = data;
       }
       else {

       }
    })
  })
 }

 //-------showModal-------//
 openModal() {

  let modal = this.modalCtrl.create(ModalContentPage);
  modal.present();
}

//--------Launch a url in InAppBrowser-----//
launch(url) {
  /*var win = window.open( "http://google.com", "_blank", "location=yes" );
  win.addEventListener( "loadstop", function() {
    //code goes here
    var win2 = this.InAppBrowser.create(url, "_self","location=yes");

    win2.executeScript({
        code: "localStorage.setItem('name', '')"
    });

});*/

  this.platform.ready().then(()=>{
   //var ref = this.InAppBrowser.create(url, "_self",{location:'no',hidden : 'no'});
   var ref = this.InAppBrowser.create(url, "_system","location=no");
      console.log(ref);
 });

 
}

//--------Get setupId and launch the Add card---------//
getSetupID(){
 console.log('in getPaymentTypes method of give donations.')
 localforage.getItem('token').then((val) => {
  this.token = val;
  this.service.getSetupID(this.token[0]['token']).then((data)=>{
      if(data){
        this.setupid = data[0]['setupid'];
        //this.link = 'https://certtransaction.hostedpayments.com/mobile/?TransactionSetupID='+this.setupid;
        this.link = 'http://app.digigiv.org/userprofile/addcard/addcard.php?token='+this.token[0]['token'];
        console.log(this.link);
        //this.linkT = this.Dom.bypassSecurityTrustResourceUrl(this.link);
        //this.linkT = this.Dom.bypassSecurityTrustResourceUrl(this.link);
        //this.linkT = this.Dom.bypassSecurityTrustUrl(this.link);
        this.launch(this.link);
        //console.log(this.linkT);
      }
      else {

      }
   })
 })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Card');
  }

}

@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Add a Card
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <iframe [src]="link | iframe" width="100%" height="320" frameborder="0" allowfullscreen></iframe>
</ion-content>
`
})
export class ModalContentPage {
  character;
  setupid         : any;
  key             : any;
  token           : any;
  link            : any = "";
  linkT           : any = "";


  constructor( public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public events: Events, public Dom: DomSanitizer, public alertCtrl: AlertController, public service: Digiservice) {
    this.getSetupID();

  }

  //------get SetupID------//

 getSetupID(){
  console.log('in getPaymentTypes method of give donations.')
  localforage.getItem('token').then((val) => {
   this.token = val;
   this.service.getSetupID(this.token[0]['token']).then((data)=>{
       if(data){
         this.setupid = data[0]['setupid'];
        // this.link = 'https://certtransaction.hostedpayments.com/mobile/?TransactionSetupID='+this.setupid;
         this.link = 'http://app.digigiv.org/userprofile/addcard/addcard.php?token='+this.token[0]['token'];
         //this.linkT = this.Dom.bypassSecurityTrustResourceUrl(this.link);
         //this.linkT = this.Dom.bypassSecurityTrustUrl(this.link);
         console.log(this.linkT);
       }
       else {

       }
    })
  })
 }

  dismiss() {
    this.viewCtrl.dismiss();
    this.events.publish('card:added');
  }
}
