import { Injectable } from "@angular/core";
import { TermsPrivacyAction } from "../actions/terms_privacy_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";

@Injectable()
export class TermsPrivacyEpic{
    constructor(public termsPrivacyAction : TermsPrivacyAction, public http : Http){}
    
    termsPrivacy = (action$ : ActionsObservable<any>) => {
        return action$.ofType(TermsPrivacyAction.TERMS_PRIVACY_FETCH)
            .mergeMap(({payload}) => {
                return new Observable(() => {
                    // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/" + payload + '/' + "GetPrivacyAndTerms")
                    this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/" + payload + '/' + "GetPrivacyAndTerms")
                    .subscribe((data) => {
                        //console.log(data);
                        if(data.ok == true){
                            let termsPrivacyData = data.json();
                            this.termsPrivacyAction.termsPrivacyDataSuccess(termsPrivacyData);
                        }
                    })
                })
            })
    }
}