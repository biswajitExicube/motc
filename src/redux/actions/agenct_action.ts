import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { AgenctData } from "../core/agencyData";

@Injectable()
export class AgencyAction{

    static AGENCY_FETCH = 'AGENCY_FETCH';
    static AGENCY_FETCH_SUCCESS = 'AGENCY_FETCH_SUCCESS';
    static AGENCY_FETCH_ERROR = 'AGENCY_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    agencyFetch(data: any){
        this.ngRedux.dispatch({
            type : AgencyAction.AGENCY_FETCH,
            payload : data
        })
    }
    agencySuccess(payload : AgenctData){
        this.ngRedux.dispatch({
            type : AgencyAction.AGENCY_FETCH_SUCCESS,
            payload : payload
        })
    }
    agencyError(error){
        this.ngRedux.dispatch({
            type : AgencyAction.AGENCY_FETCH_ERROR,
            error : error
        })
    }
}