import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import localforage from "localforage";
import { Events } from 'ionic-angular';

/*
  Generated class for the Digiservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Digiservice {
  data1: any = '';
  data: any = '';
  public emailInput: any;
  public passwordInput: any;
  public url: any;
  public token: any;
  public authStatus: any;
  //public local: Storage = new Storage(LocalStorage);

  constructor(public http: Http, public events: Events) {
    console.log('Hello Digiservice Provider');
  }

  //////login service///////


  login(emailInput, passwordInput) {
	console.log(emailInput);
	this.url = 'http://www.api.digigiv.org/login/index.php?email='+emailInput+'&pass='+passwordInput;
  // don't have the data yet
  return new Promise((resolve) => {
		this.http.get(this.url)
		.map(res => res.json())
		.subscribe(data => {
        this.data1 = data;

	  localforage.setItem('token', this.data1);
  	localforage.length().then((keys)=>{
			console.log('keysStored on loginDIGIGIVService: ', keys);
    });
		  resolve(this.data1);
		});
  });
 }

 ///  Validate User Service ///

validateUser(token){
 this.url = 'http://www.api.digigiv.org/login/validate.php?token='+token;
 // don't have the data yet
 return new Promise((resolve) => {
   this.http.get(this.url)
   .map(res => res.json())
   .subscribe(data => {
       this.data = data;
       if(this.data[0]['status'] == "false"){
         this.events.publish('token:expired');
       }
   console.log('Validate User Function: ', this.data);
       resolve(this.data);
     });
 });
}

 /// Change Email service ////

 changeEmailService(cEmail, Password, nEmail, token){
  console.log('in changeEmailService of digigiv-sevice.');
  this.url = 'http://api.digigiv.org/donar/email.php?token='+token+'&old='+cEmail+'&new='+nEmail+'&pass='+Password;
  console.log(this.url);
  // don't have the data yet
  return new Promise((resolve) => {
 	 this.http.get(this.url)
 	 .map(res => res.json())
 	 .subscribe(data => {
 			 this.data = data;
 			 resolve(this.data);
 		 });
  });
 }

 /// Change Password service ///

 changePasswordService(cPassword, nPassword, token){
 console.log('in changePasswordService of digigiv-sevice.');
 this.url = 'http://api.digigiv.org/donar/password.php?token='+token+'&old='+cPassword+'&new='+nPassword;
 console.log(this.url);
 // don't have the data yet
 return new Promise((resolve) => {
   this.http.get(this.url)
   .map(res => res.json())
   .subscribe(data => {
       this.data = data;
       resolve(this.data);
     });
  });
 }

 /// Get Personal info service ///

 getPersonalInfoService(token) {
 console.log('in getPersonalInfoService of digigiv-sevice.');
 this.url = 'http://api.digigiv.org/userdetails/index.php?token='+token;
 //console.log(this.url);
 // don't have the data yet
 return new Promise((resolve) => {
   this.http.get(this.url)
   .map(res => res.json())
   .subscribe(data => {
       this.data1 = data;
       //console.log(this.data1);

      localforage.setItem('userdetails', this.data1);
      localforage.length().then((keys)=>{
        console.log('keysStored on loginDIGIGIVService: ', keys);
       });
       resolve(this.data1);
     });
  });
 }

 /// Search Church service ///

 searchChurchService(searchQuery, token){
 console.log('in searchChurchService of digigiv-sevice.');
 this.url = 'http://api.digigiv.org/church/getbysearch.php?token='+token+'&search='+searchQuery;
 // don't have the data yet
 return new Promise((resolve) => {
   this.http.get(this.url)
   .map(res => res.json())
   .subscribe(data => {
       this.data1 = data;
       console.log(this.data1);
       resolve(this.data1);
     });
  });
 }

 /// Nearest Church service ///

 nearestChurchService(latitude, longitude){
 console.log('in nearestChurchService of digigiv-sevice.');
 this.url = 'http://api.digigiv.org/church/getbylocation.php?lat='+latitude+'&lon='+longitude;
 console.log(this.url);
 // don't have the data yet
 return new Promise((resolve) => {
   this.http.get(this.url)
   .map(res => res.json())
   .subscribe(data => {
       this.data = data;
       resolve(this.data);
     });
  });
 }

 /// Get Churches list ///

 getChurchesVisitedService(){
 console.log('in getChurchesVisitedService of digigiv-sevice.');
 this.url = 'http://api.digigiv.org/donation/getchurches.php';
 //this.url = 'http://api.digigiv.org/church/getdonationchurches.php?token='+token;
 // don't have the data yet
 return new Promise((resolve) => {
   this.http.get(this.url)
   .map(res => res.json())
   .subscribe(data => {
       this.data = data;
       resolve(this.data);
     });
 });
}

/// Get campaigns ///

getCampaignsService(churchid){
    this.url = 'http://api.digigiv.org/donation/getcampaigns.php?orgID='+churchid;
		return new Promise((resolve) => {
			this.http.get(this.url)
			.map(res => res.json())
			.subscribe(data => {
  			this.data = data;
  			resolve(this.data);
			});
		});
 }

 /// Get User Cards ///

 getCards(token){
   this.validateUser(token);
    this.url = 'http://api.digigiv.org/donation/getcards.php?token='+token;
    console.log(this.url);
		return new Promise((resolve) => {
			this.http.get(this.url)
			.map(res => res.json())
			.subscribe(data => {
  			this.data = data;
        console.log(this.data);
  			resolve(this.data);
			});
		});
  }

  //--------giveDonations Service-------//
  DonationService(token, amount, selectCard, startDate, cycles, endStatus, Frequency, selectCampaign, selectChurch){

      if(Frequency == 0){
        this.url = 'http://api.digigiv.org/donation/makedonation.php?token=='+ token +'&amount='+ amount +'&paccountid='+ selectCard +'&sdate='+ startDate +'&cycles=0&endstatus=&frequency='+ Frequency +'&campaignid='+ selectCampaign +'&organizationid='+ selectChurch +'';
        return new Promise((resolve) => {
          this.http.get(this.url)
          .map(res => res.json())
          .subscribe(data => {
          this.data = data;
          resolve(this.data);
          });
        });
      }
      else if(Frequency != 0 && endStatus != 0){
        this.url = 'http://api.digigiv.org/donation/makedonation.php?token=='+ token +'&amount='+ amount +'&paccountid='+ selectCard +'&sdate='+ startDate +'&cycles='+ cycles +'&endstatus='+ endStatus +'&frequency='+ Frequency +'&campaignid='+ selectCampaign +'&organizationid='+ selectChurch +'';
  	  	return new Promise((resolve) => {
  				this.http.get(this.url)
  				.map(res => res.json())
  				.subscribe(data => {
  				this.data = data;
  				resolve(this.data);
  				});
  			});
  		}
      else if(Frequency != 0 && endStatus == 0){
        this.url = 'http://api.digigiv.org/donation/makedonation.php?token=='+ token +'&amount='+ amount +'&paccountid='+ selectCard +'&sdate='+ startDate +'&cycles=0&endstatus='+ endStatus +'&frequency='+ Frequency +'&campaignid='+ selectCampaign +'&organizationid='+ selectChurch +'';
        return new Promise((resolve) => {
          this.http.get(this.url)
          .map(res => res.json())
          .subscribe(data => {
          this.data = data;
          resolve(this.data);
          });
        });
      }
  }

  /// Get SetupID ///

  getSetupID(token){
     this.url = 'http://api.digigiv.org/addcard/getid.php?action=getsetupid&token='+token;
     console.log(this.url);
     return new Promise((resolve) => {
       this.http.get(this.url)
       .map(res => res.json())
       .subscribe(data => {
         this.data = data;

         localforage.setItem('setupid', this.data);
         localforage.length().then((keys)=>{
           console.log('keysStored on loginDIGIGIVService: ', keys);
         });

         resolve(this.data);
       });
     });
   }

   /// Get SetupID ///

   getACardPage(token){
      this.url = 'http://api.digigiv.org/addcard/getid.php?action=getsetupid&token='+token;
      console.log(this.url);
      return new Promise((resolve) => {
        this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;

          localforage.setItem('setupid', this.data);
          localforage.length().then((keys)=>{
            console.log('keysStored on loginDIGIGIVService: ', keys);
          });

          resolve(this.data);
        });
      });
    }

}
