import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { AnnounceData } from "../core/announce_session";

@Injectable()
export class AnnounceAction{

    static ANNOUNCE_FECTH = 'ANNOUNCE_FECTH';
    static ANNOUNCE_FECTH_SUCCESS = 'ANNOUNCE_FECTH_SUCCESS';
    static ANNOUNCE_FECTH_ERROR = 'ANNOUNCE_FECTH_ERROR';

    //GetHomePageAnnouncement
    static FETCH_HOME_ANNOUNCEMENT = 'FETCH_HOME_ANNOUNCEMENT';
    static SUCCESS_HOME_ANNOUNCEMENT = 'SUCCESS_HOME_ANNOUNCEMENT';
    static FAILED_HOME_ANNOUNCEMENT = 'FAILED_HOME_ANNOUNCEMENT';

    constructor(public ngRedux : NgRedux<IAppState>){}

    announceFetch(userdetails : any){
        this.ngRedux.dispatch({
            type : AnnounceAction.ANNOUNCE_FECTH,
            payload : userdetails
        })
    }
    announceSuccess(payload : AnnounceData){
        this.ngRedux.dispatch({
            type : AnnounceAction.ANNOUNCE_FECTH_SUCCESS,
            payload : payload
        })
    }
    annouceError(error){
        this.ngRedux.dispatch({
            type : AnnounceAction.ANNOUNCE_FECTH_ERROR,
            error : error
        })
    }


    fetchHomeAnnouncement(lang : any){
        this.ngRedux.dispatch({
            type : AnnounceAction.FETCH_HOME_ANNOUNCEMENT,
            payload : lang
        })
    }
    successHomeAnnouncement(payload : AnnounceData){
        this.ngRedux.dispatch({
            type : AnnounceAction.SUCCESS_HOME_ANNOUNCEMENT,
            payload : payload
        })
    }
    failedHomeAnnouncement(error){
        this.ngRedux.dispatch({
            type : AnnounceAction.FAILED_HOME_ANNOUNCEMENT,
            error : error
        })
    }


}