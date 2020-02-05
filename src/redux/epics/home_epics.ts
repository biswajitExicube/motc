import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HomeActions } from '../actions/home_action';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class HomeEpics {
    constructor(public homeActions : HomeActions, private http : Http){}

    home = (action$: ActionsObservable<any>) => {
        return action$.ofType(HomeActions.HOME_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // console.log(payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/" + payload.lang + "/GetHomePage/" + payload.userid+"/0")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/" + payload.lang + "/GetHomePage/" + payload.userid+"/0")
                .subscribe((data) =>{
                    if(data.ok == true){

                        let hData:any = data.json()
                        // console.log(hData);
                        this.homeActions.homeFetchSuccess(hData)
                    }
                })

            })
            
        })
    }
}