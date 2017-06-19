import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Service and Storage
import { Digiservice } from '../providers/digiservice';
import {Storage} from '@ionic/storage';
import localforage from "localforage";
import {Events} from 'ionic-angular';

// Pages
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Account } from '../pages/account/account';
import { Card } from '../pages/card/card';
import { Payment } from '../pages/payment/payment';
import { Login } from '../pages/login/login';
import { Donation } from '../pages/donation/donation';
import { Tab } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;
  Name: any = '';
  Email: any = '';


  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public service: Digiservice, private events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Donation', component: Donation },
      { title: 'Cards', component: Card },
      { title: 'Account', component: Account },
      { title: 'Feedback', component: HomePage },
    ];

    //Event listener
    events.subscribe('user:login', () => {
      this.loadPersonalInfo();
    });

    events.subscribe('token:expired', () => {
      this.logout();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  loadPersonalInfo(){
    localforage.getItem('userdetails').then((data)=>{
          var data1 = data;
          console.log('token in menu: ', data1);
          this.Name = data1[0]['username'];
          this.Email = data1[0]['email'];
        });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page['title']);
      if(page['title'] == 'Home')
      {
          this.nav.setRoot(Tab, {index: 0});
      }
      else if(page['title'] == 'Donation')
      {
          this.nav.setRoot(Tab, {index: 1});
      }
      else if(page['title'] == 'Cards')
      {
          this.nav.setRoot(Tab, {index: 2});
      }
      else if(page['title'] == 'Account')
      {
          this.nav.setRoot(Tab, {index: 3});
      }
      else
      {
          this.nav.setRoot(page.component);
      }
  }

  logout(){
    localforage.removeItem('token');
    this.nav.setRoot(Login);
  }
}
