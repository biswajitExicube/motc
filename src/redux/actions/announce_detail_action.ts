import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class AnnounceDetailAction{

    static ANNOUNCE_DETAIL_FETCH = 'ANNOUNCE_DETAIL_FETCH';
    static ANNOUNCE_DETAIL_FETCH_SUCCESS = 'ANNOUNCE_DETAIL_FETCH_SUCCESS';
    static ANNOUNCE_DETAIL_FETCH_ERROR = 'ANNOUNCE_DETAIL_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    announceDetailFetch(dataP:any){
        this.ngRedux.dispatch({
            type : AnnounceDetailAction.ANNOUNCE_DETAIL_FETCH,
            payload : dataP
        })
    }
    announceDetailSuccess(payload){
        this.ngRedux.dispatch({
            type : AnnounceDetailAction.ANNOUNCE_DETAIL_FETCH_SUCCESS,
            payload : payload
        })
    }
    announceDetailError(error){
        this.ngRedux.dispatch({
            type : AnnounceDetailAction.ANNOUNCE_DETAIL_FETCH_ERROR,
            error : error
        })
    }
}