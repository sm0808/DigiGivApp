import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Tabs } from 'ionic-angular';
import { HttpModule } from '@angular/http';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Donation } from '../pages/donation/donation';
import { Card } from '../pages/card/card';
import { ModalContentPage } from '../pages/card/card';
import { Account } from '../pages/account/account';
import { Payment } from '../pages/payment/payment';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { Tab } from '../pages/tabs/tabs';

//Services
import { IFrame } from '../pipes/i-frame';
import { Digiservice } from '../providers/digiservice';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Donation,
    Card,
    ListPage,
    Login,
    Tab,
    Account,
    Payment,
    IFrame,
    ModalContentPage
    ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsPlacement:'top'}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Donation,
    Card,
    ListPage,
    Login,
    Tab,
    Account,
    Payment,
    ModalContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Digiservice,
    Geolocation,
    InAppBrowser,
    ThemeableBrowser,
  ]
})
export class AppModule {}
