import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Pages
import { Account } from '../account/account';
import { Tab } from '../pages/tabs/tabs';
import { Login } from '../../pages/login/login';
import { Donation } from '../donation/donation';

//Service and Storage
import {AlertController } from 'ionic-angular';
import { Digiservice } from '../../providers/digiservice';
import {Storage} from '@ionic/storage';
import localforage from "localforage";
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	searchQuery           : string='';
	items                 : string[];
	token                 : any;
	tempData              : any;
	index                 : any;
	churchID              : any;
	name                  : any;
	address               : any;
	city                  : any;
	state                 : any;
	country               : any;
	nearestChurchID       : any;
	nearestChurchName     : any;
	nearestChurchAddress  : any = 'Nearest Church...';
	nearestChurchCity     : any;
	nearestChurchState    : any;
	nearestChurchCountry  : any;
	nearestChurchTemp     : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: Digiservice, public Geolocation: Geolocation) {

  }

  searchChurch() {
		console.log('in SearchChurch method of HomePage.')
		localforage.getItem('token').then((val) => {
			this.token = val;
			console.log('SearchQuery - Your are: ', this.token[0]['token']);
			this.service.searchChurchService(this.searchQuery, this.token[0]['token']).then((data)=>{
					this.tempData = [];
					if(data){
						this.tempData = data;
						console.log('in if.', this.tempData);
					}
					else {

					}
			})
	})
  }

  nearestChurch(){
	this.Geolocation.getCurrentPosition().then((position) => {
		console.log('Current Location', position.coords.longitude, position.coords.latitude);
		this.service.nearestChurchService(position.coords.latitude, position.coords.longitude).then((val)=>{
			if(val){
				this.nearestChurchTemp = val;
				console.log(this.nearestChurchTemp);
				this.nearestChurchID = val[0]['id'];
				this.nearestChurchName = val[0]['name'];
				this.nearestChurchAddress = val[0]['address'];
				this.nearestChurchCity = val[0]['city'];
				this.nearestChurchState = val[0]['state'];
				this.nearestChurchCountry = val[0]['country'];
				this.nearestChurchAddress = this.nearestChurchAddress +", "+ this.nearestChurchCity +", "+ this.nearestChurchState +", "+  this.nearestChurchCountry;
				console.log('Nearest Church: ', val[0]['id'], this.nearestChurchName, this.nearestChurchAddress);
			}
			this.nearestChurchTemp = [];
		})
	})
  }

  giveNow(id, name){
  	console.log('giveNow of home.', id);
  	this.navCtrl.push(Donation, {'churchID': id, 'churchName': name});
  }

  giveNowNearest(id, name){
  	console.log('giveNowNearest of home.', id, name);
  	this.navCtrl.push(Donation, {'churchID': this.nearestChurchID, 'churchName': this.nearestChurchName});
  }

  giveNowButton(){
		console.log('giveNowButton of home.');
	  //this.navCtrl.push(GiveDonationsPage, {'churchID': ''});
  }

}
