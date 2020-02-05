import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { EventsDetailData } from "../core/events_detail_session";

@Injectable()
export class EventsDetailActions{

    static EVENTS_DETAIL_FETCH = 'EVENTS_DETAIL_FETCH';
    static EVENTS_DETAIL_FETCH_SUCCESS = 'EVENTS_DETAIL_FETCH_SUCCESS';
    static EVENTS_DETAIL_FETCH_ERROR = 'EVENTS_DETAIL_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    eventsDetailFetch(detailData){
        this.ngRedux.dispatch({
            type : EventsDetailActions.EVENTS_DETAIL_FETCH,
            payload : detailData
        })
    }
    eventsDetailSuccess(payload : EventsDetailData){
        this.ngRedux.dispatch({
            type : EventsDetailActions.EVENTS_DETAIL_FETCH_SUCCESS,
            payload : payload
        })
    }
    eventsDetailError(error){
        this.ngRedux.dispatch({
            type : EventsDetailActions.EVENTS_DETAIL_FETCH_ERROR,
            error : error
        })
    }
}