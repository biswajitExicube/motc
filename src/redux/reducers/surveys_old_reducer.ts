import { SurveysOld } from "../core/surveys_session";
import { Action } from "redux";
import { SurveysAction } from "../actions/surveys_action";

const INITIAL_STATE : SurveysOld = {
    surveysOld : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function SurveysOldReducer(
    state : SurveysOld = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) : 
    SurveysOld{
        switch(action.type){                           
            case SurveysAction.SURVEYS_OLD_FETCH :
                return{
                    ...state,
                    surveysOld : null,
                    loading : true,
                    error : ''
                }
            case SurveysAction.SURVEYS_OLD_FETCH_SUCCESS :
                return{
                    ...state,
                    surveysOld : action.payload,
                    loading : false,
                    error : ''
                }
            case SurveysAction.SURVEYS_OLD_FETCH_ERROR :
                return{
                    ...state,
                    surveysOld : null,
                    loading : false,
                    error : action.error
                }            
        }
        return state;
    }