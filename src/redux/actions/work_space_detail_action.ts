import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class WorkSpaceDetailAction{
    static WORK_SPACE_DETAIL_FETCH = 'WORK_SPACE_DETAIL_FETCH';
    static WORK_SPACE_DETAIL_FETCH_SUCCESS = 'WORK_SPACE_DETAIL_FETCH_SUCCESS';
    static WORK_SPACE_DETAIL_FETCH_ERROR = 'WORK_SPACE_DETAIL_FETCH_ERROR';

    constructor(public ngRedux :NgRedux<IAppState>){}

    workSpaceDetailFetch(lang : string){
        this.ngRedux.dispatch({
            type : WorkSpaceDetailAction.WORK_SPACE_DETAIL_FETCH,
            payload : lang
        })
    }
    workSpaceDetailSuccess(payload){
        this.ngRedux.dispatch({
            type : WorkSpaceDetailAction.WORK_SPACE_DETAIL_FETCH_SUCCESS,
            payload : payload
        })
    }
    workSpaceSetailError(error){
        this.ngRedux.dispatch({
            type : WorkSpaceDetailAction.WORK_SPACE_DETAIL_FETCH_ERROR,
            error : error
        })
    }
}