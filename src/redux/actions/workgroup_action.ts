import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class WorkGroupAction{
    //public workgroup
    static WORKGROUP_FETCH = 'WORKGROUP_FETCH';
    static WORKGROUP_FETCH_SUCCESS = 'WORKGROUP_FETCH_SUCCESS';
    static WORKGROUP_FETCH_ERROR = 'WORKGROUP_FETCH_ERROR';

    //my workgroup
    static MY_WORKGROUP_FETCH = 'MY_WORKGROUP_FETCH';
    static MY_WORKGROUP_FETCH_SUCCESS = 'MY_WORKGROUP_FETCH_SUCCESS';
    static MY_WORKGROUP_FETCH_ERROR = 'MY_WORKGROUP_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    //public workgroup 
    workGroupFetch(lang : string){
        this.ngRedux.dispatch({
            type : WorkGroupAction.WORKGROUP_FETCH,
            payload : lang
        })
    }
    workGroupSuccess(payload){
        this.ngRedux.dispatch({
            type : WorkGroupAction.WORKGROUP_FETCH_SUCCESS,
            payload : payload
        })
    }
    workGroupError(error){
        this.ngRedux.dispatch({
            type : WorkGroupAction.WORKGROUP_FETCH_ERROR,
            error : error
        })
    }


    //My Workgroup
    myworkGroupFetch(lang : string){
        this.ngRedux.dispatch({
            type : WorkGroupAction.MY_WORKGROUP_FETCH,
            payload : lang
        })
    }
    myworkGroupSuccess(payload){
        this.ngRedux.dispatch({
            type : WorkGroupAction.MY_WORKGROUP_FETCH_SUCCESS,
            payload : payload
        })
    }
    myworkGroupError(error){
        this.ngRedux.dispatch({
            type : WorkGroupAction.MY_WORKGROUP_FETCH_ERROR,
            error : error
        })
    }
}