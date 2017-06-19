import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Events } from 'ionic-angular';

//Pages
import { HomePage } from '../home/home';
import { Tab } from '../tabs/tabs';

//Service and Storage
import { Digiservice } from '../../providers/digiservice';
import {Storage} from '@ionic/storage';
import localforage from "localforage";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
	public token: any;
	public emailInput: any;
	public passwordInput: any;
	public data: any;
	public name: any;
	public email: any;
	public tempToken: any;
  public appObject: MyApp;


  constructor(public navCtrl: NavController, public navParams: NavParams, public service: Digiservice, public events: Events, public alertCtrl: AlertController) {
  this.navCtrl = navCtrl;
    localforage.getItem('token').then((val) => {
    if(val){
      console.log(val);
      this.navCtrl.setRoot(Tab);
      this.events.publish('user:login');
    }
  });
}

login(){
this.service.login(this.emailInput, this.passwordInput).then((token) => {
  console.log(token);
  if(token[0]['token']){
    this.getPersonalInfo(token[0]['token']);
    this.navCtrl.setRoot(Tab);
  } else {
    this.presentAlert('Login Failed', 'Invalid Username or Password');
    console.log('Not ok');
  }
})
}

getPersonalInfo(token){
  this.service.getPersonalInfoService(token).then((data) => {
  if(data){
    console.log('personal info received.');
    //this.appObject.Email = data[0]['email'];
    this.name = data[0]['username'];
    this.email = data[0]['email'];
    this.events.publish('user:login');
  } else {
    console.log('personal info not received.');
  }
 })
}

//------Notify Alert--------//
presentAlert(title, message) {
 let alert = this.alertCtrl.create({
 cssClass: 'alertClass',
 title: title,
   subTitle: message,
   buttons: ['OK']
 });
 alert.present();
}

/*  login(){
	this.service.login(this.emailInput, this.passwordInput).then((token) => {
		if(token[0].token != null){
			console.log('method login of login-page (after)', token);
			this.navCtrl.setRoot(HomePage);

			//this.navCtrl.push(TabsPage, {index: 0});
			//this.navCtrl.push(HomePage);
			//this.getPersonalInfo(token);
		} else {
			console.log('Not ok');
		}
	})
} */

/*  getPersonalInfo(token){
		this.service.getPersonalInfoService(token).then((data) => {
		if(data){
			this.name = data[0]['username'];
			this.email = data[0]['email'];
		} else {
			console.log('personal info not received.');
		}
	})
	}

 loadMenu(){
	console.log('in openMenu method of loginpage.');
	this.menuCtrl.open('menu');
 }

 forgotPassword(){
	this.navCtrl.push(ForgotPasswordPage);
 }

 createAccount(){
	this.navCtrl.push(CreateAccountPage);
 }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  } */

}
