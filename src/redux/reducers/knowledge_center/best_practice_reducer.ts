import { BestPracticeData } from "../../core/knowledge_center_session";
import { Action } from "redux";
import { KnowledgeCenterAction } from "../../actions/knowledge_center_action";

// const INITIAL_STATE : KnowledgeCenterData = {
//     politicsData : null,
//     bestPracticeData : null,
//     othersData : null,
//     loading : false,
//     error : ''
// }
const INITIAL_STATE : BestPracticeData = {
    bestPracticeData : null,
    loading : false,
    error : ''
}


type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function BestPracticeReducer(
    state : BestPracticeData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : BestPracticeData{
    switch(action.type){
        case KnowledgeCenterAction.KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH :
            return{
                ...state,
                bestPracticeData : null,
                loading : true,
                error : ''
            }
        case KnowledgeCenterAction.KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH_SUCCESS :
            return{
                ...state,
                bestPracticeData : action.payload,
                loading : false,
                error : ''
            }
        case KnowledgeCenterAction.KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH_ERROR :
            return{
                ...state,
                bestPracticeData : null,
                loading : false,
                error : action.error
            }
    }
    return state;
}