import { Injectable } from "@angular/core";
import { AlertController, ToastController, LoadingController } from "ionic-angular";

@Injectable()
export class AlertProvider{
  public alert:any;
  public customLoading:any;
    constructor(
      public alertCtrl : AlertController, 
      public toastCtrl : ToastController,
      public loadingCtrl:LoadingController
    ){}
    
    openAlert(message, time){
        this.alert = this.alertCtrl.create({
            message: message,
            cssClass: "alertStyle",
            buttons: [
              {
                text: 'Done',
                handler: () => {
                  // this.navCtrl.pop();
                }
              }
            ]
          });
          this.alert.present();
    }

    dismissAlert(){
      this.alert.dismiss();
    }

    openToast(message){
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            cssClass : 'toastStyle',
            position: 'bottom'
          });  
          toast.onDidDismiss(() => {
            //console.log('Dismissed toast');
          });  
          toast.present();
    }



    /* LoadingController Loading Start function */
    StartLoading(){
        this.customLoading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
      
        this.customLoading.present();
    }

    /* LoadingController Loading Stop function */
    StopLoading(){
      this.customLoading.dismiss();
    }
}