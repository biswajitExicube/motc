
import { Action } from "redux";
import { SearchSurvey } from "../../core/all_search_session";
import { AllSearchAction } from "../../actions/all_search_action";

const INITIAL_STATE : SearchSurvey = {
    SearchSurveyData : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function SurveySearchReducer(
    state : SearchSurvey = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    SearchSurvey{
        switch(action.type){
            case AllSearchAction.SUCCESS_SURVEY:
                return{
                    ...state,
                    SearchSurveyData : null,
                    loading : true,
                    error : ''
                }
            case AllSearchAction.SUCCESS_SURVEY:
                return {
                    ...state,
                    SearchSurveyData : action.payload,
                    loading : false,
                    error : ''
                }
            // case AboutAction.ABOUT_FETCH_ERROR:
            //     return{
            //         ...state,
            //         SearchEventsData : null,
            //         loading : false,
            //         error : action.error
            //     }
        }
        return state;
    }