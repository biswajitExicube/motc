import { OthersData } from "../../core/knowledge_center_session";
import { Action } from "redux";
import { KnowledgeCenterAction } from "../../actions/knowledge_center_action";

const INITIAL_STATE : OthersData = {
    otherKnowledgecenterCatagoryData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function OthersReducer(
    state : OthersData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : OthersData{
    switch(action.type){
        case KnowledgeCenterAction.KNOWLEDGE_CENTER_OTHERS_FETCH :
            return{
                ...state,
                otherKnowledgecenterCatagoryData : null,
                loading : true,
                error : ''
            }
        case KnowledgeCenterAction.KNOWLEDGE_CENTER_OTHERS_FETCH_SUCCESS :
            return{
                ...state,
                otherKnowledgecenterCatagoryData : action.payload,
                loading : false,
                error : ''
            }
        case KnowledgeCenterAction.KNOWLEDGE_CENTER_OTHERS_FETCH_ERROR :
            return{
                ...state,
                otherKnowledgecenterCatagoryData : null,
                loading : false,
                error : action.error
            }
    }
    return state;
}