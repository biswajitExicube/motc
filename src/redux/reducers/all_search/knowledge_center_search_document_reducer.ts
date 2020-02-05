
import { Action } from "redux";
// import { AboutAction } from "../../actions/about_action";
import { SearchKnowledgeCenterSearchDocument } from "../../core/all_search_session";
import { AllSearchAction } from "../../actions/all_search_action";

const INITIAL_STATE : SearchKnowledgeCenterSearchDocument = {
    SearchKnowledgeCenterSearchDocument : null,
    loading : false,
    error : ''
    
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function KnowledgeCenterSearchDOcumentReducer(
    state : SearchKnowledgeCenterSearchDocument = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    SearchKnowledgeCenterSearchDocument{
        switch(action.type){
            case AllSearchAction.FETCH_KNOWLEDGE_CENTER_SEARCH_DOCUMENT:
                return{
                    ...state,
                    SearchKnowledgeCenterSearchDocument : null,
                    loading : true,
                    error : ''
                }
            case AllSearchAction.SUCCESS_KNOWLEDGE_CENTER_SEARCH_DOCUMENT:
                return {
                    ...state,
                    SearchKnowledgeCenterSearchDocument : action.payload,
                    loading : false,
                    error : ''
                }
            // case AboutAction.ABOUT_FETCH_ERROR:
            //     return{
            //         ...state,
            //         SearchKnowledgeCenterSearchDocument : null,
            //         loading : false,
            //         error : action.error
            //     }
        }
        return state;
    }
