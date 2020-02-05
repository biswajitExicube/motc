import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { TermsPrivacyData } from "../core/terms_privacy_session";

@Injectable()
export class TermsPrivacyAction{

    static TERMS_PRIVACY_FETCH = 'TERMS_PRIVACY_FETCH';
    static TERMS_PRIVACY_FETCH_SUCESS = 'TERMS_PRIVACY_FETCH_SUCCESS';
    static TERMS_PRIVACY_FETCH_ERROR = 'TERMS_PRIVACY_FETCH_ERROR';
    
    constructor(private ngRedux : NgRedux<IAppState>){}

    termsPrivacyDataFetch(lang : string){
        this.ngRedux.dispatch({
            type : TermsPrivacyAction.TERMS_PRIVACY_FETCH,
            payload : lang
        })
    }
    termsPrivacyDataSuccess(payload : TermsPrivacyData){
        this.ngRedux.dispatch({
            type : TermsPrivacyAction.TERMS_PRIVACY_FETCH_SUCESS,
            payload : payload
        })
    }
    termsPrivacyDataError(error){
        this.ngRedux.dispatch({
            type : TermsPrivacyAction.TERMS_PRIVACY_FETCH_ERROR,
            error : error
        })
    }
}