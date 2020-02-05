import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class WorkEventsAction{

    static WORK_EVENTS_FETCH = 'WORK_EVENTS_FETCH';
    static WORK_EVENTS_FETCH_SUCCESS = 'WORK_EVENTS_FETCH_SUCCESS';
    static WORK_EVENTS_FETCH_ERROR = 'WORK_EVENTS_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    workEventsFetch(details:any){
        this.ngRedux.dispatch({
            type : WorkEventsAction.WORK_EVENTS_FETCH,
            payload : details
        })
    }
    workEventsSuccess(payload){
        this.ngRedux.dispatch({
            type : WorkEventsAction.WORK_EVENTS_FETCH_SUCCESS,
            payload : payload
        })
    }
    workEventsError(error){
        this.ngRedux.dispatch({
            type : WorkEventsAction.WORK_EVENTS_FETCH_ERROR,
            error : error
        })
    }
}