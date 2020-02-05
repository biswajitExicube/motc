import { Injectable } from "@angular/core";
import { FavUsersAction } from "../actions/fav_users_action";
import { Http } from "@angular/http";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Base64Provider } from "../../providers/image-base64/image_base64";

@Injectable()
export class FavUsersEpics{
    constructor(public favUsersAction : FavUsersAction, public http : Http, public Base64Provider: Base64Provider){}

    favUsers = (action$ : ActionsObservable<any>) => {
        return action$.ofType(FavUsersAction.FAV_USERS_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                //console.log("Fav Users Data ", payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/" + payload.lang + "/GetAllFavoriteUsers/true/" + payload.userid +"/0")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/" + payload.lang + "/GetAllFavoriteUsers/true/" + payload.userid +"/0")
                .subscribe((data) => {
                    // console.log(data);
                    if(data.ok){
                        let favUsersData = data.json();
                        if(favUsersData != ''){
                            for(let i=0; i<favUsersData.length; i++){
                                let imageUrl = favUsersData[i].PictureUrl? favUsersData[i].PictureUrl : '';
                                this.Base64Provider.convertImageBase(imageUrl)
                                .subscribe((res : any) => {
                                    if(res != ''){
                                        if(res._body != ''){
                                            let imageBase64 = res.json();
                                            favUsersData[i].PictureBase64String = imageBase64
                                        }
                                    }
                                })
                            }
                        }
                        console.log(favUsersData);
                        this.favUsersAction.favUsersSuccess(favUsersData);
                    }
                })
            })
        })
    }
}