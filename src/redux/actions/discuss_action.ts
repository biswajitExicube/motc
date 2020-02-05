import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class DiscussAction{
    static DISCUSS_FETCH = 'DISCUSS_FETCH';
    static DISCUSS_FETCH_SUCCESS = 'DISCUSS_FETCH_SUCCESS';
    static DISCUSS_FETCH_ERROR = 'DISCUSS_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    discussFetch(data : any){
        console.log("Discuss fetch calling ...");
        this.ngRedux.dispatch({
            type : DiscussAction.DISCUSS_FETCH,
            payload : data
        })
    }
    discussSuccess(payload:any){
        this.ngRedux.dispatch({
            type : DiscussAction.DISCUSS_FETCH_SUCCESS,
            payload : payload
        })
    }
    discussError(error){
        this.ngRedux.dispatch({
            type : DiscussAction.DISCUSS_FETCH_ERROR,
            error : error
        })
    }
}