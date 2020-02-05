import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserloginAction } from '../../redux/actions/user_login_action';
import { ThrowStmt } from '@angular/compiler';
import { AlertProvider } from '../../providers/alert-provider/alert_provider';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username:string;
  public password:string;
  public currLang : any;
  public direction : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private UserloginAction:UserloginAction,
    public AlertProvider:AlertProvider,
    public events: Events
  ) {
    let localLang = localStorage.getItem('direction');
    if(localLang == 'ltr'){
      this.currLang = 'en';
    }else if(localLang == 'rtl'){
      this.currLang = 'ar';
    }
  }

  ngDoCheck(){
    if(localStorage.getItem('detectChanges')){
      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.currLang = 'en';
        localStorage.removeItem('detectChanges');
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
        localStorage.removeItem('detectChanges');
      }
    }
  }
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
        this.direction = value;
        if(this.direction == 'rtl'){
          this.currLang = 'ar';
        }else if(this.direction == 'ltr'){
          this.currLang = 'en';
        }
    });
  };

  public login(){
    if(this.username == undefined ||this.username == "" ||this.username == null
       ||this.password == undefined ||this.password == "" ||this.password == null){

          if(this.username == undefined ||this.username == "" ||this.username == null){
              this.AlertProvider.openAlert("Username cannot be blank",1000)
          }else if(this.password == undefined ||this.password == "" ||this.password == null){
              this.AlertProvider.openAlert("Password cannot be blank",1000)
          }

       }else{
          let data = {
            username:this.username,
            password:this.password
          }
          this.UserloginAction.startUserLogin(data);
          this.AlertProvider.StartLoading();

       }

  }

}
