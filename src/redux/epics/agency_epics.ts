import { Injectable } from "@angular/core";
import { AgencyAction } from "../actions/agenct_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";

@Injectable()
export class AgencyEpics{
    constructor(public agencyAction : AgencyAction, public http : Http){}

    agency = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AgencyAction.AGENCY_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/"+payload+"/"+"GetAgencyById"+"/"+"1")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/"+payload.lang+"/"+"GetAgencyById"+"/"+payload.userid)
                .subscribe((data:any) => {
                    // console.log(data);
                    if(data.ok == true){
                        if(data._body != ''){
                            let agencyData = data.json();
                            console.log(agencyData);
                            this.agencyAction.agencySuccess(agencyData);
                        }
                    }
                })
            })
        })
    }
}