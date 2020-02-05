import { Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";
import { UserloginAction } from "../actions/user_login_action";
import { Events } from "ionic-angular";
import { AlertProvider } from "../../providers/alert-provider/alert_provider";

@Injectable()
export class UserloginEpics{

    constructor(
        public userloginaction : UserloginAction, 
        private http : Http,
        private event:Events,
        public AlertProvider:AlertProvider

    ){}
    
    startUserlogin = (action$ : ActionsObservable<any>) => {
        return action$.ofType(UserloginAction.START_LOGIN)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/LoginUser/"+payload.username + "/"+payload.password + "")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/LoginUser/"+payload.username + "/"+payload.password + "")
                .subscribe((data:any) => {
                    if(data){
                        // console.log(data);
                        // console.log(data._body);
                        if(data._body == ""){
                            this.AlertProvider.StopLoading();
                            this.AlertProvider.openAlert("Username or Password invalid",1000)
                            localStorage.setItem('userData',"")
                        }else{                            
                            let uData = data.json();
                            // console.log(JSON.stringify(uData));
                            localStorage.setItem('userData',JSON.stringify(uData));
                            // let username = uData.UserName.substring(15);
                            // let username = uData.UserName;
                            // localStorage.setItem('userId',uData.ID);
                            // localStorage.setItem('userName',username);
                            // localStorage.setItem('useremail',uData.eMail);
                            // localStorage.setItem('employeeName',uData.EmployeeName);
                            this.AlertProvider.StopLoading();
                            this.userloginaction.successUserLogin(data.json());
                            this.event.publish("login:check");
                        }
                    }
                    // if(data.ok == true){
                        // let aboutData = data.json();
                        // console.log(aboutData);

                        // this.userloginaction.successUserLogin(aboutData);
                    // }
                },(error)=>{this.AlertProvider.StopLoading(); this.AlertProvider.openAlert("Username or Password invalid",1000);console.log("error is : ",error)})
            })
        })
    }
}