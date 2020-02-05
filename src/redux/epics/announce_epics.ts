import { Injectable } from "@angular/core";
import { AnnounceAction } from "../actions/announce_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";

@Injectable()
export class AnnouceEpics{
    constructor(public announceAction : AnnounceAction, public http : Http){}

    annouce = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AnnounceAction.ANNOUNCE_FECTH)
            .mergeMap(({payload}) => {
                return new Observable(() => {
                    // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/"+"GetRecentAnnouncements")
                    this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/"+"GetRecentAnnouncements")
                    .subscribe((data:any) => {
                        if(data._body !=""){
                            let annouceData = data.json();
                            if(annouceData){
                                for(let i=0; i<annouceData.length; i++){
                                    if(annouceData[i].StrDate){
                                        /*for(let key in annouceData[i]){
                                            var str = annouceData[i].StrDate;
                                            var newsDate = new Date(str);
                                            var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                           
                                            let tempdate = dateString.split(",")[0]; 
                                            var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                            var time = dateString.split(",")[2];
    
                                            annouceData[i].newsDate = key;
                                            annouceData[i].newsDate = date;
                                            annouceData[i].newsTime = key;
                                            annouceData[i].newsTime = time;
                                        }*/
                                        var str = annouceData[i].StrDate;
                                        var newsDate = new Date(str);
                                        var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                        let tempdate = dateString.split(",")[0]; 
                                        var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                        var time = dateString.split(",")[2];

                                        annouceData[i].newsDate = date;
                                        annouceData[i].newsTime = time;
                                    }
                                }
                            }
                            // console.log(annouceData);
                            this.announceAction.announceSuccess(annouceData);
                        }
                    })
                    
                })
            })
    }

    /* Home Announcement */
    //HomeAnnouncement

    homeAnnouncement = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AnnounceAction.FETCH_HOME_ANNOUNCEMENT)
            .mergeMap(({payload}) => {
                return new Observable(() => {
                    // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload+"/"+"GetHomePageAnnouncement")
                    this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload+"/"+"GetHomePageAnnouncement")
                    .subscribe((data:any) => {
                        if(data.ok == true){
                            if(data._body != ''){
                                let homeAnnouncementData = data.json();
                                // console.log(homeAnnouncementData);
                                this.announceAction.successHomeAnnouncement(homeAnnouncementData);
                            }
                            
                        }
                    })
                    
                })
            })
    }
}