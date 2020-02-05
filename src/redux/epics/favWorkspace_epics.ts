import { Injectable } from "@angular/core";
import { FavWorkspaceActions } from "../actions/favWorkspace_action";
import { Http } from "@angular/http";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FavWorkspaceEpics{

    constructor(public favWorkspaceActions : FavWorkspaceActions, private http : Http){}

    favWorkspace = (action$ : ActionsObservable<any>) => {
        return action$.ofType(FavWorkspaceActions.FAVWORKSPACE_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                let activeSegment = payload.segement;
                let currLang = payload.lang;
                if(activeSegment){
                    // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/"+currLang+"/GetUserFavourites/1?d="+activeSegment)
                    this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/"+currLang+"/GetUserFavourites/1?d="+activeSegment)
                    .subscribe((data) => {
                        //console.log(data)
                        if(data.ok == true){
                            let favActiveData = data.json();
                            if(favActiveData){
                                for(let i=0; i<favActiveData.UserFavourites.length; i++){
                                    if(favActiveData.UserFavourites[i].Date){
                                        /*for(let key in favActiveData.UserFavourites[i]){
                                            var str = favActiveData.UserFavourites[i].Date.RFCDateTime;
                                            var newsDate = new Date(str);
                                            var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                            let tempdate = dateString.split(",")[0]; 
                                            var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                            var time = dateString.split(",")[2];
        
                                            favActiveData.UserFavourites[i].newsDate = key;
                                            favActiveData.UserFavourites[i].newsDate = date;
                                            favActiveData.UserFavourites[i].newsTime = key;
                                            favActiveData.UserFavourites[i].newsTime = time;
                                        }*/
                                        var str = favActiveData.UserFavourites[i].Date.RFCDateTime;
                                        var newsDate = new Date(str);
                                        var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                        let tempdate = dateString.split(",")[0]; 
                                        var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                        var time = dateString.split(",")[2];

                                        favActiveData.UserFavourites[i].newsDate = date;
                                        favActiveData.UserFavourites[i].newsTime = time;
                                    }
                                }
                                if(activeSegment == 'news'){
                                    let newsData =  favActiveData.UserFavourites
                                    //console.log(newsData);                                    
                                }else if(activeSegment == 'events'){
                                    let eventsData =  favActiveData.UserFavourites;
                                    //console.log(eventsData);
                                }else if(activeSegment == 'workspaces'){
                                    let workspacesData =  favActiveData.UserFavourites;
                                    //console.log(workspacesData);
                                }else if(activeSegment == 'documents'){
                                    let documentsData =  favActiveData.UserFavourites;
                                    //console.log(documentsData);
                                }else{
                                    //console.log("Else");
                                }
                                //console.log(favActiveData);
                                this.favWorkspaceActions.favWorkspaceSuccess(favActiveData);
                            }
                        }                        
                    })
                }
            })
        })
    }
}