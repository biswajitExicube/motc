import { TermsPrivacyData } from "../core/terms_privacy_session";
import { Action } from "redux";
import { TermsPrivacyAction } from "../actions/terms_privacy_action";

const INITIAL_STATE : TermsPrivacyData = {
    termsPrivacyData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function TermsPrivacyReducer(
    state : TermsPrivacyData = INITIAL_STATE,
    action : ActionWithPayload<Payload, Error>) :
    TermsPrivacyData{
        switch(action.type){
            case TermsPrivacyAction.TERMS_PRIVACY_FETCH :
                return{
                    ...state,
                    termsPrivacyData : null,
                    loading : true,
                    error : ''
                }
            case TermsPrivacyAction.TERMS_PRIVACY_FETCH_SUCESS :
                return{
                    ...state,
                    termsPrivacyData : action.payload,
                    error : ''
                }
            case TermsPrivacyAction.TERMS_PRIVACY_FETCH_ERROR :
                return{
                    ...state,
                    termsPrivacyData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }
