import { Injectable } from "@angular/core";
import { AnnounceDetailAction } from "../actions/announce_detail_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";

@Injectable()
export class AnnounceDetailEpics{
    constructor(public announceDetailAction : AnnounceDetailAction, public http : Http){}

    announceDetail = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AnnounceDetailAction.ANNOUNCE_DETAIL_FETCH)
            .mergeMap(({payload}) => {
                return new Observable(() => {
                    // console.log("Announcements Detail", payload);
                    
                    // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetAnnouncementById/"+payload.id)
                    this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetAnnouncementById/"+payload.id)
                    .subscribe((data:any) => {
                        if(data._body !=""){
                            let announceDetailData = data.json();
                            console.log(announceDetailData)
                            if(announceDetailData){
                                    if(announceDetailData.Date){
                                        /*for(let key in announceDetailData){
                                            var str = announceDetailData.Date.RFCDateTime;
                                            var newsDate = new Date(str);
                                            var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                            
                                            let tempdate = dateString.split(",")[0]; 
                                            var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                            var time = dateString.split(",")[2];
    
                                            announceDetailData.newsDate = key;
                                            announceDetailData.newsDate = date;
                                            announceDetailData.newsTime = key;
                                            announceDetailData.newsTime = time;
                                        }*/
                                        var str = announceDetailData.Date.RFCDateTime;
                                        var newsDate = new Date(str);
                                        var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                        let tempdate = dateString.split(",")[0]; 
                                        var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                        var time = dateString.split(",")[2];

                                        announceDetailData.newsDate = date;
                                        announceDetailData.newsTime = time;

                                        this.announceDetailAction.announceDetailSuccess(announceDetailData);
                                    }else{this.announceDetailAction.announceDetailSuccess(announceDetailData);}
                                }
                            // console.log(announceDetailData);
                            
                            
                        }
                    })
                })
            })
    }
}