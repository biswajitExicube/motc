import { Injectable } from "@angular/core";
import { SurveysAction } from "../actions/surveys_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Events } from "ionic-angular";
import { AlertProvider } from "../../providers/alert-provider/alert_provider";

@Injectable()
export class SurveysEpics{
    constructor(
        public surveysAction : SurveysAction, 
        public http : Http,
        public events:Events,
        public alertprovider:AlertProvider
    ){}
    
    surveyNew = (action$ : ActionsObservable<any>) => {
        return action$.ofType(SurveysAction.SURVEYS_AVIALABLE_FETCH)
            .mergeMap(({payload}) => {
                return new Observable(() => {
                    // this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload+"/GetOldSurveys")
                    this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload+"/GetAviableSurveys")
                    .subscribe((data) => {
                        if(data.ok == true){
                            let newSurveys = data.json();
                            // console.log(newSurveys);
                            this.surveysAction.surveysNewSuccess(newSurveys);
                        }
                    })
                    // this.surveysAction.surveysNewSuccess("newSurveys");
                })
            })
    }

    surveyOld = (action$ : ActionsObservable<any>) => {
        return action$.ofType(SurveysAction.SURVEYS_OLD_FETCH)
            .mergeMap(({payload}) => {
                return new Observable(() => {
                    // this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload+"/GetAviableSurveys")
                    this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload+"/GetOldSurveys")
                    .subscribe((data) => {
                        if(data.ok == true){
                            let oldSurveys = data.json();
                            // console.log(oldSurveys);
                            this.surveysAction.surveysOldSuccess(oldSurveys);
                        }
                    })
                })
            })
    }

    submitSurvey = (action$ : ActionsObservable<any>) => {
        return action$.ofType(SurveysAction.SUBMIT_SURVEY)
            .mergeMap(({payload}) => {
                return new Observable(() => {
                    // console.log(payload);
                    let headers = new Headers ({ 'Content-Type': 'application/json' });
                    let options = new RequestOptions({ headers: headers });
                    // console.log("submit survet calling ....... .... ... .. ", payload)
                    this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/"+payload.lang+"/AnswerSurvey", payload.ansdata, options)
                    .subscribe((data:any) => {

                        console.log(data._body)
                        if(data._body == "true"){
                            this.alertprovider.openToast("Survey submitted successfully");
                            this.events.publish('dirFrom:submitsurvey');
                        }else{
                            this.alertprovider.openToast("Survey submitted failed due to internal error, Please try again")
                            this.events.publish('dirFrom:submitsurvey');
                        }
                    })
                })
            })
    }
}