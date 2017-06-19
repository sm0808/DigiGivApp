import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

//Service and Storage
import { Digiservice } from '../../providers/digiservice';
import {Storage} from '@ionic/storage';
import localforage from "localforage";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the Donation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-donation',
  templateUrl: 'donation.html',
})
export class Donation {
  gaming          : string = "n64";
  gender          : string = "m";
  Frequency       : string = "0";
  os              : string;
  music           : string;
  month           : string;
  year            : number;
  token           : any;
  selectCard      : any  = "";
  amount          : any  = "";
  startDate       : any  = "";
  cycles          : any  = "";
  endStatus       : any  = "0";
  selectCampaign  : any  = "";
  selectChurch    : any  = "";
  churchName      : any;
  churchID        : any;
  tempCampaigns   : any;
  tempPayment     : any;
  tempBank        : any;
  key             : any;
  Date            : any  = "";
  FutureDate      : any  = "";
  Year            : any  = "";
  Month           : any  = "";
  Day             : any  = "";
  Time            : any  = "";
  checkChurch     : any  = 0;
  tempChurches    : any;


  //Copied




/*
  selectedChurch: any;
  campaignID: any;
  selectedCampaign: any;
  selectedPaymentType: any;
  tempcard: any;
  value: any;
  chequeNo: any = 0;

  selectedFrequency: any = 0;

  endDate: any;
  selectedEnding: any = 0;
  afterTimes: any;
  tempSelect: any = 0;
  selectedStartDate: any;
  SelectedIdentifier: any = 'A'; */

  musicAlertOpts: { title: string, subTitle: string };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public service: Digiservice, public formBuilder: FormBuilder) {
      this.musicAlertOpts = {
        title: '1994 Music',
        subTitle: 'Select your favorite'
      };
      //Populate Date picker
      this.DatePicker();

      // If parameters are passed from HomePage
      if(this.navParams.get('churchID')){
        this.churchName = this.navParams.get('churchName');
        this.churchID = this.navParams.get('churchID');
        this.selectChurch = this.churchID;
        this.getCampaigns(this.churchID);
        this.checkChurch = 1;
      }
      else{
        this.getChurchesVisited();
        this.checkChurch = 2;
      }
      this. getPaymentTypes();

  }

  //------getChurches-----//

getChurchesVisited(){
  console.log('in getChurchesVisited method of give-donations.')
  this.service.getChurchesVisitedService().then((data)=>{
    this.tempChurches = [];
    if(data){
      this.tempChurches = data;
        console.log('in if.', this.tempChurches);
     }
    else {
     }
    })
  }

  //------getCampaigns------//

  getCampaigns(churchID){
  console.log('in getCampaigns method of give donations.')
    this.service.getCampaignsService(churchID).then((data)=>{
        this.tempCampaigns = [];
        if(data){
          this.tempCampaigns = data;
          console.log('in if of getCampaigns.', this.tempCampaigns);
        }
        else {
        }
    })
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

 //------Setting Curret and Future Dates------//

DatePicker(){
  this.Date = new Date().toISOString();
  this.Year = this.Date.split("-")[0];
  this.Year = parseInt(this.Year);

  this.Month = this.Date.split("-")[1] - 1;
  this.Month = parseInt(this.Month);


  this.Day = ( this.Date.split("-")[2] );
  this.Day = parseInt(this.Day);
  this.Day = this.Day + 1.9;

  //Starting date
  this.startDate = new Date(this.Year, this.Month, this.Day).toISOString();

  //Future date
  this.Year = this.Year + 10;
  this.FutureDate = new Date(this.Year, this.Month, this.Day).toISOString();
}

 //--------Donate----------//

 giveDonation(){
  console.log('in giveDonations method of give donations.');

  //checks for valid data
  if(this.selectChurch == ""){
    this.presentAlert('Error','Select a Church')
  }
  else if(this.selectCampaign == ""){
    this.presentAlert('Error','Select a Campaign')
  }
  else if(this.amount < 1 || this.amount == ""){
    this.presentAlert('Error','Invalid Amount')
  }
  else if(this.startDate == ""){
    this.presentAlert('Error','Enter a Date')
  }
  else if(this.startDate < this.Date){
    this.presentAlert('Error','Enter a Future Date')
  }
  else if(this.endStatus == 1 && (this.cycles == "" || this.cycles < 1)){
    this.presentAlert('Error','Enter Valid Cycles')
  }
  else if(this.selectCard == ""){
    this.presentAlert('Error','Select A Card')
  }
  else{
    localforage.getItem('token').then((val) => {
      this.token = val;
      this.service.DonationService(this.token[0]['token'], this.amount, this.selectCard, this.startDate, this.cycles, this.endStatus, this.Frequency, this.selectCampaign, this.selectChurch).then((data)=>{
          if(data == 1){
            this.presentAlert('Success', 'Donation was made Successfully');

            //Empty tthe feilds after successful transaction
            this.selectChurch    = "";
            this.selectCampaign  = "";
            this.amount          = "";
            this.Frequency       = "0";
            this.selectCard      = "";
            this.endStatus       = "0";
            this.cycles          = "";
            this.DatePicker();
            this.selectCard      = "";
          }
          else {
            this.presentAlert('Failed', 'Donation Failed');
          }
      })
    })
   }
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


  stpSelect() {
      console.log(this.startDate);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Donation');
  }

}
