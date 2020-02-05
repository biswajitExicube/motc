import { Injectable } from "@angular/core";
import { AboutAction } from "../actions/about_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";
import { Base64Provider } from "../../providers/image-base64/image_base64";

@Injectable()
export class AboutEpics{

    constructor(public aboutAction : AboutAction, private http : Http, public Base64Provider : Base64Provider){}

    about = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AboutAction.ABOUT_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                //console.log("About Epics", payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload +"/"+"GetAbout")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload +"/"+"GetAbout")
                
                .subscribe((data) => {
                    //console.log(data);
                    if(data.ok == true){
                        let aboutData = data.json();
                        if(aboutData.ImageUrl != ''){
                            let imageUrl = aboutData.ImageUrl;
                            this.Base64Provider.convertImageBase(imageUrl)
                            .subscribe((res : any) => {
                                if(res != null){
                                    console.log(res);
                                    if(res._body != ''){
                                        let imageBase64 = res.json();
                                        console.log(imageBase64);
                                        aboutData.PictureBase64String = imageBase64;
                                    }
                                }
                            });                            
                        } 
                        console.log(aboutData);
                        this.aboutAction.aboutDataSuccess(aboutData);
                    }
                })
            })
        })
    }
}