import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { EventsData } from "../core/events_session";

@Injectable()
export class EventsActions{

    static EVENTS_FETCH = 'EVENTS_FETCH';
    static EVENTS_FETCH_SUCCESS = 'EVENTS_FETCH_SUCCESS';
    static EVENTS_FETCH_ERROR = 'EVENTS_FETCH_ERROR';
    
    constructor(public ngRedux : NgRedux<IAppState>){}

    eventsFetch(userdetails:any){
        this.ngRedux.dispatch({
            type : EventsActions.EVENTS_FETCH,
            payload : userdetails
        })
    }
    eventsSuccess(payload : EventsData){
        this.ngRedux.dispatch({
            type : EventsActions.EVENTS_FETCH_SUCCESS,
            payload : payload
        })
    }
    eventsError(error){
        this.ngRedux.dispatch({
            type : EventsActions.EVENTS_FETCH_ERROR,
            error : error
        })
    }
    
}