import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class Base64Provider{
    public path : string;
    constructor(public http: Http){}

    convertImageBase(path){
       return this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/GetImageBase64String?url="+path)
    }
}