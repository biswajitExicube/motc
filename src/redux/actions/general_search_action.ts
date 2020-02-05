import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { FeedbackData } from "../core/feedback_session";

@Injectable()
export class GeneralSearchsAction{

    static START_GENERAL_SEARCH = 'START_GENERAL_SEARCH';
    static SUCCESS_GENERAL_SEARCH = 'SUCCESS_GENERAL_SEARCH';
    static FAILED_GENERAL_SEARCH = 'FAILED_GENERAL_SEARCH';

    constructor(private ngRedux : NgRedux<IAppState>){}
    
    fetchGeneralSearch(searchdata:any){
        this.ngRedux.dispatch({
            type : GeneralSearchsAction.START_GENERAL_SEARCH,
            payload : searchdata
        })
    }

    successGeneralSearch(payload : FeedbackData){
        this.ngRedux.dispatch({
            type : GeneralSearchsAction.SUCCESS_GENERAL_SEARCH,
            payload : payload
        })
    }

    failedGeneralSearch(error){
        this.ngRedux.dispatch({
            type : GeneralSearchsAction.FAILED_GENERAL_SEARCH,
            error : error
        })
    }

}