import { Injectable } from "@angular/core";
import { WorkEventsAction } from "../actions/work_events_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";

@Injectable()
export class WorkEventsEpics{
    constructor(public workEventsAction : WorkEventsAction, public http : Http){}
    
    workEvents = (action$ : ActionsObservable<any>) => {
        return action$.ofType(WorkEventsAction.WORK_EVENTS_FETCH)
        .mergeMap(({payload}) => {
            console.log(payload);
            return new Observable(() => {
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetWorkspaceEvents/" + payload.userid + "/" + payload.detailsId)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetWorkspaceEvents/" + payload.userid + "/" + payload.detailsId)
                .subscribe((data:any) => {
                    if(data.ok){
                        // console.log(data);
                        if(data._body != ""){
                            let workEvents = data.json();
                            for(let i=0; i<workEvents.length; i++){
                                if(workEvents[i].Date){
                                    /*for(let key in workEvents[i]){
                                        var str = workEvents[i].Date.RFCDateTime;
                                        var newsDate = new Date(str);
                                        var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                        let tempdate = dateString.split(",")[0]; 
                                        var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                        var time = dateString.split(",")[2];
    
                                        workEvents[i].newsDate = key;
                                        workEvents[i].newsDate = date;
                                        workEvents[i].newsTime = key;
                                        workEvents[i].newsTime = time;
                                    }*/
                                    var str = workEvents[i].Date.RFCDateTime;
                                    var newsDate = new Date(str);
                                    var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                    let tempdate = dateString.split(",")[0]; 
                                    var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                    var time = dateString.split(",")[2];

                                    workEvents[i].newsDate = date;
                                    workEvents[i].newsTime = time;
                                }
                            }
                            // console.log(workEvents);
                            this.workEventsAction.workEventsSuccess(workEvents);
                        }

                    }
                })
            })
        })
    }
}