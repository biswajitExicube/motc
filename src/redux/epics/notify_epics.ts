import { Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import { NotifyAction } from "../actions/notify_action";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";

@Injectable()
export class NotifyEpics{
    constructor(public http : Http, public notifyAction : NotifyAction){}
    
    notification = (action$ : ActionsObservable<any>) => {
        return action$.ofType(NotifyAction.NOTIFY_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                //console.log("Notification Data " + payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetNotifications/"+payload.userid)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetNotifications/"+payload.userid)
                .subscribe((data:any) => {
                    if(data._body != ""){
                        if(data.ok == true){
                            let notifyData = data.json();
                            for(let i=0; i<notifyData.length; i++){
                                if(notifyData[i].Date){
                                    /*for(let key in notifyData[i]){
                                        let str = notifyData[i].Date.RFCDateTime;
                                        var newsDate = new Date(str);
                                        var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                        let tempdate = dateString.split(",")[0]; 
                                        var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                        var time = dateString.split(",")[2];
    
                                        notifyData[i].notifyDate = key;
                                        notifyData[i].notifyDate = date;
                                        notifyData[i].notifyTime = key;
                                        notifyData[i].notifyTime = time;
                                    }*/
                                    let str = notifyData[i].Date.RFCDateTime;
                                    var newsDate = new Date(str);
                                    var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                    let tempdate = dateString.split(",")[0]; 
                                    var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                    var time = dateString.split(",")[2];

                                    notifyData[i].notifyDate = date;
                                    notifyData[i].notifyTime = time;
                                }
                            }
                            // console.log(notifyData);
                            this.notifyAction.notifySuccess(notifyData);
                        }
                    }

                })
            })
        })
    }
}