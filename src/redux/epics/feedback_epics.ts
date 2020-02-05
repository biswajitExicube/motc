import { Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, RequestOptions, Headers } from "@angular/http";
import { FeedbackAction } from "../actions/feedback_action";
import { AlertProvider } from "../../providers/alert-provider/alert_provider";

@Injectable()
export class FeedbackEpics{

    constructor(
        public feedbackAction : FeedbackAction, 
        private http : Http,
        public alertProvider:AlertProvider
        ){}
        
    feedBack = (action$ : ActionsObservable<any>) => {
        return action$.ofType(FeedbackAction.FEEDBACK_FETCH)
        .mergeMap(({payload}) => {
            console.log(payload)
            return new Observable(() => {
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                // this.http.post("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/AddFeedBack", payload, options)
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/AddFeedBack", payload, options)
                .subscribe((data:any)=>{
                    if(data._body == "true"){
                        console.log(data);
                        // this.alertProvider.StopLoading();
                        // console.log("csdcdscsdcsdc : ", data.json());
                        let result = data.json();
                        this.feedbackAction.feedbackDataSuccess(result);
                        this.alertProvider.openAlert("Thank you for your Feedback.",1000)
                    }else{this.alertProvider.openAlert("There was an internal issue, Please try some time letter",1000)}
                  
                },(error=>{
                    //console.log("data error is : ", error);
                    alert(error);
                    // let data:any = []
                    // this.allSearchAction.SuccessAnnouncement(data);
                }))

            })
        })
    }
}