import { Injectable } from "@angular/core";
import { EventsActions } from "../actions/events_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";

@Injectable()
export class EventsEpics{
    constructor(public eventsAction : EventsActions, public http : Http){}

    events = (action$ : ActionsObservable<any>) => {
        return action$.ofType(EventsActions.EVENTS_FETCH)
            .mergeMap(({payload}) => {
                return new Observable(() => {
                    //console.log("Events Data", payload);
                    // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/"+"GetRecentEvents"+"/"+payload.userid)
                    this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/"+"GetRecentEvents"+"/"+payload.userid)
                    .subscribe((data:any) => {
                        if(data.ok == true){
                            let eventsData = data.json();
                            if(eventsData){
                                //console.log(eventsData);
                                for(let i=0; i<eventsData.length; i++){
                                    // console.log(eventsData[i].StartDate.RFCDateTime);
                                    if(eventsData[i].StartDate){
                                        /*for(let key in eventsData[i]){
                                            var str = eventsData[i].StartDate.RFCDateTime;
                                            var newsDate = new Date(str);
                                            //console.log('heeeeeee');
                                            // console.log(newsDate);
                                            var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                            let tempdate = dateString.split(",")[0]; 
                                            var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                            var time = dateString.split(",")[2];
            
                                            // eventsDetailData.sDate = key;
                                            eventsData[i].newsDate = key;
                                            eventsData[i].newsDate = date;
                                            eventsData[i].newsTime = key;
                                            eventsData[i].newsTime = time;
                                        }*/
                                        var str = eventsData[i].StartDate.RFCDateTime;
                                        var newsDate = new Date(str);
                                        var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                        let tempdate = dateString.split(",")[0]; 
                                        var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                        var time = dateString.split(",")[2];

                                        eventsData[i].newsDate = date;
                                        eventsData[i].newsTime = time;
                                    }
                                }
                            }
                            //console.log(eventsData);
                            this.eventsAction.eventsSuccess(eventsData);
                        }
                    })
                })
            })
    }


}