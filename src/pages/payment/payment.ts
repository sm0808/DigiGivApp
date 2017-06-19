import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';


//Service and Storage
import { Digiservice } from '../../providers/digiservice';
import {Storage} from '@ionic/storage';
import localforage from "localforage";
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the Payment page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class Payment {

  videos : any[] = [
      {
        title: 'Flashlight App',
        video: 'https://certtransaction.hostedpayments.com/?TransactionSetupID=14B8EF00-7DB3-46F3-AC54-CAF54193ED77',
      },
      {
        title: 'SMS App',
        video: 'https://www.youtube.com/embed/KHa9KOyD438',
      }
  ]
  token : any;
  setupid : any;
  link : any = "";
  linkT : any = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, public service: Digiservice, public Dom: DomSanitizer, public platform: Platform, public InAppBrowser: InAppBrowser) {
    this.getSetupID();
  //  this.link = Dom.bypassSecurityTrustResourceUrl(this.linkT);
    //console.log(this.link);
    this.platform = platform;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Payment');
  }

  launch(url) {
    this.platform.ready().then(()=>{
     var ref = this.InAppBrowser.create(url, "_self","location=yes");
     console.log(ref);
     //var ref = cordova.InAppBrowser.open(url, target, options);
    });
  }

  getSetupID(){
   console.log('in getPaymentTypes method of give donations.')
   localforage.getItem('token').then((val) => {
    this.token = val;
    this.service.getSetupID(this.token[0]['token']).then((data)=>{
        if(data){
          this.setupid = data[0]['setupid'];
          this.link = 'https://certtransaction.hostedpayments.com/mobile/?TransactionSetupID='+this.setupid;
          console.log(this.link);
          //this.linkT = this.Dom.bypassSecurityTrustResourceUrl(this.link);
          //this.linkT = this.Dom.bypassSecurityTrustResourceUrl(this.link);
          //this.linkT = this.Dom.bypassSecurityTrustUrl(this.link);
          //this.launch(this.link);
          //console.log(this.linkT);
        }
        else {

        }
     })
   })
  }

}
