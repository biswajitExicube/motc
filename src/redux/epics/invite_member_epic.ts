import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, RequestOptions, Headers } from '@angular/http';
import { InvitememberAction } from '../actions/invite_member_action';
import { AlertProvider } from '../../providers/alert-provider/alert_provider';

@Injectable()
export class InvitememberEpics {
    constructor(
        public Invitememberaction : InvitememberAction, 
        private http : Http,
        public alertprovider:AlertProvider
    ){}

    inviteMember = (action$: ActionsObservable<any>) => {
        return action$.ofType(InvitememberAction.INVITE_MEMBER_START)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // console.log(payload);
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/InviteUsers",payload, options)
                .subscribe((data:any)=>{
                        // console.log(data);
                        if(data._body == "true"){
                            this.alertprovider.openToast("Invitation successfully sent to user ")
                        }
                },(error=>{
                }))



            })
            
        })
    }
}