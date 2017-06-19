import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Pages
import { HomePage } from '../home/home';
import { Tabs } from '../pages/tabs/tabs';
import { Login } from '../../pages/login/login';

//Service and Storage
import {AlertController } from 'ionic-angular';
import { Digiservice } from '../../providers/digiservice';
import {Storage} from '@ionic/storage';
import localforage from "localforage";
/**
 * Generated class for the Account page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class Account {
  public value           : any;
  public cEmailInput     : any;
  public nEmailInput     : any;
  public passwordInput   : any;
  public token           : any;
  public valuepass       : any;
  public cPasswordInput  : any;
  public nPasswordInput  : any;
  public val1            : any;
  public val2            : any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public service: Digiservice) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad Account');
  }

  onChangeEmail(val){
    console.log(val);
  if (val == '1') {
      this.value = 1;
      this.val2 = false;
    } else if (val == '0'){
      this.value = 0;
    }

  }

  onChangePassword(val){
  if (val == '1') {
      this.valuepass = 1;
      this.val1 = false;
    } else if (val == '0'){
      this.valuepass = 0;
    }

  }

  submitData(){
    if(this.val1){
      localforage.getItem('token').then((val) => {
          this.token = val;
          console.log('submiData - Change Email - Your is: ', this.token[0]['token']);
          this.service.changeEmailService(this.cEmailInput, this.passwordInput, this.nEmailInput, this.token[0]['token']).then((data)=>{
              console.log('changeEmail return status: ', data[0]['status']);
              if(data[0]['status']=="true"){
                //this.reloadPage();
                this.presentAlert('Success', 'Email Updated!');
              }
              else {
                this.presentAlert('Failed', 'Incorrect Email or Password')
              }
        })
      })
    }

   if(this.val2){
     localforage.getItem('token').then((val) => {
         this.token = val;
         console.log(this.token[0]['token']);
         this.service.changePasswordService(this.cPasswordInput, this.nPasswordInput, this.token[0]['token']).then((data)=>{
           console.log(data[0]);
           if(data[0]['status']=="true"){
             //this.reloadPage();
             this.presentAlert('Success', 'Password changed successful!');
           }
           else {
             this.presentAlert('Failed', 'Incorrect Password')
           }
         })

       })
   }
 }

  presentAlert(title, message) {
  let alert = this.alertCtrl.create({
  cssClass: 'alertClass',
  title: title,
    subTitle: message,
    buttons: ['OK']
  });
  alert.present();
}

  logout(){
  localforage.removeItem('token');
  this.navCtrl.setRoot(Login);
  }

  reloadPage(){
  this.navCtrl.pop();
  this.navCtrl.push(Account);
  }

}
