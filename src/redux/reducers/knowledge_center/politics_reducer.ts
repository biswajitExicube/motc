import { PoliticsData } from "../../core/knowledge_center_session";
import { Action } from "redux";
import { KnowledgeCenterAction } from "../../actions/knowledge_center_action";

const INITIAL_STATE : PoliticsData = {
    politicsData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function PoliticsReducer(
    state : PoliticsData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : PoliticsData{
    switch(action.type){
        case KnowledgeCenterAction.KNOWLEDGE_CENTER_POLITICS_FETCH :
            return{
                ...state,
                politicsData : null,
                loading : true,
                error : ''
            }
        case KnowledgeCenterAction.KNOWLEDGE_CENTER_POLITICS_FETCH_SUCCESS :
            // console.log("action payload : ", action.payload);
            return{
                ...state,
                politicsData : action.payload,
                loading : false,
                error : ''
            }
        case KnowledgeCenterAction.KNOWLEDGE_CENTER_POLITICS_FETCH_ERROR :
            return{
                ...state,
                politicsData : null,
                loading : false,
                error : action.error
            }
    }
    return state;
}