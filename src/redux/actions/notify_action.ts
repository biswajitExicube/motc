import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class NotifyAction{
    static NOTIFY_FETCH = 'NOTIFY_FETCH';
    static NOTIFY_FETCH_SUCCESS = 'NOTIFY_FETCH_SUCCESS';
    static NOTIFY_FETCH_ERROR = 'NOTIFY_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    notifyFetch(userdetails : any){
        this.ngRedux.dispatch({
            type : NotifyAction.NOTIFY_FETCH,
            payload : userdetails
        })
    }
    notifySuccess(payload){
        this.ngRedux.dispatch({
            type : NotifyAction.NOTIFY_FETCH_SUCCESS,
            payload : payload
        })
    }
    notifyError(error){
        this.ngRedux.dispatch({
            type : NotifyAction.NOTIFY_FETCH_ERROR,
            error : error
        })
    }
}