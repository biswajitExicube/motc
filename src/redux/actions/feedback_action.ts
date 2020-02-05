import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { FeedbackData } from "../core/feedback_session";

@Injectable()
export class FeedbackAction{

    static FEEDBACK_FETCH = 'FEEDBACK_FETCH';
    static FEEDBACK_FETCH_SUCCESS = 'FEEDBACK_FETCH_SUCCESS';
    static FEEDBACK_FETCH_ERROR = 'FEEDBACK_FETCH_ERROR';

    constructor(private ngRedux : NgRedux<IAppState>){}
    
    feedbackDataFetch(feedbackdata:any){
        this.ngRedux.dispatch({
            type : FeedbackAction.FEEDBACK_FETCH,
            payload : feedbackdata
        })
    }
    feedbackDataSuccess(payload : FeedbackData){
        this.ngRedux.dispatch({
            type : FeedbackAction.FEEDBACK_FETCH_SUCCESS,
            payload : payload
        })
    }
    feedbackDataError(error){
        this.ngRedux.dispatch({
            type : FeedbackAction.FEEDBACK_FETCH_ERROR,
            error : error
        })
    }
}