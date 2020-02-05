import { Injectable } from "@angular/core";
import { EventsDetailActions } from "../actions/events_detail_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";
import { Base64Provider } from "../../providers/image-base64/image_base64";

@Injectable()
export class EventsDetailEpics{
    constructor(public eventsDetailAction: EventsDetailActions, public http : Http, public Base64Provider : Base64Provider){}

    eventsDetail = (action$ : ActionsObservable<any>) => {
        return action$.ofType(EventsDetailActions.EVENTS_DETAIL_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                //console.log("Events Detail Data", payload.lang, payload.id);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/"+"GetEventById"+"/"+payload.id+"/"+"2")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/"+"GetEventById"+"/"+payload.id+"/"+payload.userID)
                .subscribe((data:any) => {
                    if(data._body){
                        let eventsDetailData = data.json();
                        if(eventsDetailData){
                            console.log(eventsDetailData);
                            var startDate = new Date(eventsDetailData.EndDate.RFCDateTime);
                               let dateString = startDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                let tempdate = dateString.split(",")[0]; 
                                let sDate = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                let sTime = dateString.split(",")[2];
                                 eventsDetailData.startDate = sDate;                
                                 eventsDetailData.startTime = sTime;
                                let endDate = new Date(eventsDetailData.EndDate.RFCDateTime);
                                let dateString2 = endDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                let tempdate2 = dateString2.split(",")[0]; 
                                let eDate = tempdate2.split(" ")[1] +" "+ tempdate2.split(" ")[0] +""+ dateString2.split(",")[1];
                                let eTime = dateString2.split(",")[2];
                                eventsDetailData.endDate = eDate;
                                eventsDetailData.endTime = eTime;

                                if(eventsDetailData.ImageUrl != ''){
                                    let imageUrl = eventsDetailData.ImageUrl;
                                    this.Base64Provider.convertImageBase(imageUrl)
                                    .subscribe((res : any) => {
                                        if(res != null){
                                            if(res._body){
                                                let imageBase64 = res.json();
                                                eventsDetailData.PictureBase64String = imageBase64;
                                            }
                                        }
                                    });                            
                                } 

                                this.eventsDetailAction.eventsDetailSuccess(eventsDetailData);
                        }
                         
                    }
                })
            })
        })
    }
}
