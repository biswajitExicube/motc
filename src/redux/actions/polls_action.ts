import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class PollsAction{
    static POLLS_FETCH = 'POLLS_FETCH';
    static POLLS_FETCH_SUCCESS = 'POLLS_FETCH_SUCCESS';
    static POLLS_FETCH_ERROR = 'POLLS_FETCH_ERROR';

    static SUBMIT_POLL_ANSWER_START = "SUBMIT_POLL_ANSWER_START"

    //fetch answer survey
    static FETCH_POLL_ANS = 'FETCH_POLL_ANS';
    static SUCCESS_POLL_ANS = 'SUCCESS_POLL_ANS';
    static FAILED_POLL_ANS = 'FAILED_POLL_ANS';


    constructor(public ngRedux : NgRedux<IAppState>){}

    pollsFetch(lang : string){
        this.ngRedux.dispatch({
            type : PollsAction.POLLS_FETCH,
            payload : lang
        })
    }
    pollsSuccess(payload){
        this.ngRedux.dispatch({
            type : PollsAction.POLLS_FETCH_SUCCESS,
            payload : payload
        })
    }
    pollsError(error){
        this.ngRedux.dispatch({
            type : PollsAction.POLLS_FETCH_ERROR,
            error : error
        })
    }

    //submit polls ans
    submitPollAns(ansDetails:any){
        this.ngRedux.dispatch({
            type : PollsAction.SUBMIT_POLL_ANSWER_START,
            payload : ansDetails
        })
    }

    //Answer Poll
    fetchPollAns(questionId:any){
        this.ngRedux.dispatch({
            type : PollsAction.FETCH_POLL_ANS,
            payload : questionId
        })
    }
    successPollAns(data:any){
        this.ngRedux.dispatch({
            type : PollsAction.SUCCESS_POLL_ANS,
            payload : data
        })
    }
    failedPollAns(errordata:any){
        this.ngRedux.dispatch({
            type : PollsAction.FAILED_POLL_ANS,
            error : errordata
        })
    }
    //End


}