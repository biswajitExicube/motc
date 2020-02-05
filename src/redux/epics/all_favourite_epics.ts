import { Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";
import { AllFavouriteAction } from "../actions/all_favourite_action";
import { Base64Provider } from "../../providers/image-base64/image_base64";

@Injectable()
export class AllFavouriteEpics{

    constructor(public allFavAction : AllFavouriteAction, private http : Http, public Base64Provider: Base64Provider){}

    /* Favourite News */
    fetchFavNews = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllFavouriteAction.FETCH_FAV_NEWS)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/" + payload.lang + "/GetUserFavourites/" + payload.userid + "?d=news")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/" + payload.lang + "/GetUserFavourites/" + payload.userid + "?d=news")
                .subscribe((data:any) => {
                    if(data._body !=""){
                        let favData = data.json();

                        let newsData = favData.UserFavourites
                        if(newsData){
                            for(let i=0; i<newsData.length; i++){
                                if(newsData[i].Date.RFCDateTime){
                                    // for(let key in newsData[i]){
                                    //     var str = newsData[i].Date.RFCDateTime;
                                    //     var newsDate = new Date(str);
                                    //     var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                    //     let tempdate = dateString.split(",")[0]; 
                                    //     var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                    //     var time = dateString.split(",")[2];

                                    //     newsData[i].newsDate = key;
                                    //     newsData[i].newsDate = date;
                                    //     newsData[i].newsTime = key;
                                    //     newsData[i].newsTime = time;
                                    // }
                                    var str = newsData[i].Date.RFCDateTime;
                                    var newsDate = new Date(str);
                                    var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                    let tempdate = dateString.split(",")[0]; 
                                    var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                    var time = dateString.split(",")[2];

                                    newsData[i].newsDate = date;
                                    newsData[i].newsTime = time;
                                }
                            }
                        }

                        // console.log("fetchFavNews : ", newsData)
                        // this.allFavAction.successFavNews(favData.UserFavourites)
                        this.allFavAction.successFavNews(newsData)
                    }
                })
            })
        })
    }

    /* Favourite Events */
    fetchFavEvents = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllFavouriteAction.FETCH_FAV_EVENTS)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/" + payload.lang + "/GetUserFavourites/" + payload.userid + "?d=events")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/" + payload.lang + "/GetUserFavourites/" + payload.userid + "?d=events")
                .subscribe((data:any) => {
                    if(data._body !=""){
                        let favData = data.json();
                        // console.log("fetchFavEvents : ", favData)
                        this.allFavAction.successFavEvents(favData.UserFavourites)
                    }
                })
            })
        })
    }

    /* Favourite Workspace */
    fetchFavWorkspace = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllFavouriteAction.FETCH_FAV_WORKSPACE)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/" + payload.lang + "/GetUserFavourites/" + payload.userid + "?d=workspaces")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/" + payload.lang + "/GetUserFavourites/" + payload.userid + "?d=workspaces")
                .subscribe((data:any) => {
                    if(data._body !=""){
                        let favData = data.json();
                        console.log("fetchFavWorkspace : ", favData.UserFavourites)
                        this.allFavAction.successFavWorkspace(favData.UserFavourites)
                    }
                })
            })
        })
    }

    /* Favourite Documents */
    fetchFavDocuments = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllFavouriteAction.FETCH_FAV_DOCUMENT)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/" + payload.lang + "/GetUserFavourites/" + payload.userid + "?d=documents")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/" + payload.lang + "/GetUserFavourites/" + payload.userid + "?d=documents")
                .subscribe((data:any) => {
                    
                    if(data._body !=""){
                        let favData = data.json();
                        let favDoc = favData.UserFavourites;
                        if(favDoc != ''){
                            for(let i=0; i<favDoc.length; i++){
                                let docImage = favDoc[i].Link;
                                if(docImage != ''){
                                    this.Base64Provider.convertImageBase(docImage)
                                    .subscribe((res : any) => {
                                        if(res != ''){
                                            let image64 = res.json();
                                            favDoc[i].PictureBase64String = image64;
                                        }
                                    })
                                }
                            }
                        }
                        // console.log("fetchFavDocuments : ", favData)
                        this.allFavAction.successFavDocuments(favData.UserFavourites)
                    }
                })
            })
        })
    }
}