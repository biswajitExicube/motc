import { AboutData } from "../core/about_session";
import { Action } from "redux";
import { AboutAction } from "../actions/about_action";

const INITIAL_STATE : AboutData = {
    aboutData : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function AboutReducer(
    state : AboutData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    AboutData{
        switch(action.type){
            case AboutAction.ABOUT_FETCH:
                return{
                    ...state,
                    aboutData : null,
                    loading : true,
                    error : ''
                }
            case AboutAction.ABOUT_FETCH_SUCCESS:
                return {
                    ...state,
                    aboutData : action.payload,
                    loading : false,
                    error : ''
                }
            case AboutAction.ABOUT_FETCH_ERROR:
                return{
                    ...state,
                    aboutData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }
