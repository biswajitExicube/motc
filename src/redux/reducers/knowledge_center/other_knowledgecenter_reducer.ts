
import { Action } from "redux";
import { KnowledgeCenterAction } from "../../actions/knowledge_center_action";
import { otherKnowledgecenterList } from "../../core/knowledge_center_session";

const INITIAL_STATE : otherKnowledgecenterList = {
    otherKnowledgecenterList : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function OtherKnowledgeCenterListReducer(
    state : otherKnowledgecenterList = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : otherKnowledgecenterList{
    switch(action.type){
        case KnowledgeCenterAction.FETCH_OTHER_KNOWLEDGE_CENTER_LIST :
            return{
                ...state,
                otherKnowledgecenterList : null,
                loading : true,
                error : ''
            }
        case KnowledgeCenterAction.SUCCESS_OTHER_KNOWLEDGE_CENTER_LIST :
            return{
                ...state,
                otherKnowledgecenterList : action.payload,
                loading : false,
                error : ''
            }
        case KnowledgeCenterAction.FAILED_OTHER_KNOWLEDGE_CENTER_LIST :
            return{
                ...state,
                otherKnowledgecenterList : null,
                loading : false,
                error : action.error
            }
    }
    return state;
}