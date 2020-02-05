import { AboutData } from "../core/about_session";
import { Action } from "redux";
import { AddRemoveFavAction } from "../actions/addRemoveFav_action";
import { AddRemoveFavData } from "../core/addRemoveFav_session";

const INITIAL_STATE : AddRemoveFavData = {
    success : null,
    loading : false,
    error : ""
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function AddRemoveFavReducer(
    state : AddRemoveFavData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    AddRemoveFavData{
        switch(action.type){
            case AddRemoveFavAction.START_ADD_REMOVE_FAV:
                return{
                    ...state,
                    success : null,
                    loading : true,
                    error : ''
                }
            case AddRemoveFavAction.SUCCESS_ADD_REMOVE_FAV:
                return {
                    ...state,
                    success : action.payload,
                    loading : false,
                    error : ''
                }
            case AddRemoveFavAction.FAILED_ADD_REMOVE_FAV:
                return{
                    ...state,
                    success : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }
