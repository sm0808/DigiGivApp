import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { Donation } from '../donation/donation';
import { Card } from '../card/card';
import { Account } from '../account/account';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tab {

  HomePage: any = HomePage;
  Card: any = Card;
  Donation: any = Donation;
  Account : any = Account;
  index   : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.index=this.navParams.get('index');
  }
}
