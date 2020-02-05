import { Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import { NewsDetailAction } from "../actions/news_detail_action";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";
import { Base64Provider } from "../../providers/image-base64/image_base64";

@Injectable()
export class NewsDetailEpics{
    constructor(public newsDetailAction : NewsDetailAction, public http : Http, public Base64Provider : Base64Provider){}
   
    newsDetail = (action$ : ActionsObservable<any>) => {
        return action$.ofType(NewsDetailAction.NEWS_DETAIL_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.name+"/"+"GetNewsById"+"/"+payload.id+"/"+"2")
                this.http.get(" http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.name+"/"+"GetNewsById"+"/"+payload.id+"/"+payload.userID)
                .subscribe((data:any) => {
                    if(data._body !=''){
                        let newsDetailData = data.json();
                        if(newsDetailData){
                            if(newsDetailData.Date.RFCDateTime){
                                /*for(let key in newsDetailData){
                                    var str = newsDetailData.Date.RFCDateTime;
                                    var newsDate = new Date(str);
                                    // console.log(str);
                                    // console.log(newsDate);
                                    var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                    
                                    let tempdate = dateString.split(",")[0]; 
                                    var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                    var time = dateString.split(",")[2];

                                    newsDetailData.newsDate = key;
                                    newsDetailData.newsDate = date;
                                    newsDetailData.newsTime = key;
                                    newsDetailData.newsTime = time;
                                }*/
                                var str = newsDetailData.Date.RFCDateTime;
                                var newsDate = new Date(str);
                                var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                let tempdate = dateString.split(",")[0]; 
                                var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                var time = dateString.split(",")[2];

                                newsDetailData.newsDate = date;
                                newsDetailData.newsTime = time;
                            }
                            if(newsDetailData.ImageUrl != ''){
                                let imageUrl = newsDetailData.ImageUrl;
                                this.Base64Provider.convertImageBase(imageUrl)
                                .subscribe((res : any) => {
                                    if(res != null){
                                        if(res._body != ''){
                                            let imageBase64 = res.json();
                                            newsDetailData.PictureBase64String = imageBase64;
                                        }
                                    }
                                });                            
                            }                            
                        }                        
                        this.newsDetailAction.newsDetailSuccess(newsDetailData);
                    }
                })
            })
        })
    }
}