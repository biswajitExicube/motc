import { Injectable } from "@angular/core";
import { NewsAction } from "../actions/news_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";
import { Base64Provider } from "../../providers/image-base64/image_base64";

@Injectable()
export class NewsEpics{
    constructor(public newsAction : NewsAction, public http : Http, public Base64Provider : Base64Provider){}
    
    news = (action$ : ActionsObservable<any>) => {
        return action$.ofType(NewsAction.NEWS_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/"+"GetRecentNews"+"/"+payload.userid)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/"+"GetRecentNews"+"/"+payload.userid)
                .subscribe((data) => {
                    if(data.ok == true){
                        let newsData = data.json();
                        if(newsData){
                            for(let i=0; i<newsData.length; i++){
                                if(newsData[i].Date.RFCDateTime){
                                    /*for(let key in newsData[i]){
                                        var str = newsData[i].Date.RFCDateTime;
                                        var newsDate = new Date(str);
                                        var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                        let tempdate = dateString.split(",")[0]; 
                                        var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                        var time = dateString.split(",")[2];

                                        newsData[i].newsDate = key;
                                        newsData[i].newsDate = date;
                                        newsData[i].newsTime = key;
                                        newsData[i].newsTime = time;
                                    }*/
                                    var str = newsData[i].Date.RFCDateTime;
                                    var newsDate = new Date(str);
                                    var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                    let tempdate = dateString.split(",")[0]; 
                                    var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                    var time = dateString.split(",")[2];

                                    newsData[i].newsDate = date;
                                    newsData[i].newsTime = time;
                                }
                                let imageUrl = newsData[i].ImageUrl? newsData[i].ImageUrl : '';
                                  this.Base64Provider.convertImageBase(imageUrl)
                                  .subscribe((res: any) => {
                                    if(res != null){
                                        if(res._body != ''){
                                            let imageBase64 = res.json();
                                            newsData[i].PictureBase64String = imageBase64;
                                        }
                                    }
                                  })
                            }
                            console.log(newsData);
                        }
                        
                        this.newsAction.newsSuccess(newsData);
                    }
                })
            })
        })
    }
}