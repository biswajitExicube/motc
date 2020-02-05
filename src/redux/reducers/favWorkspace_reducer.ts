import { Action } from 'redux';
import { FavWorkspaceData } from '../core/favWorkSpace_session';
import { FavWorkspaceActions } from '../actions/favWorkspace_action';

const INITIAL_STATE : FavWorkspaceData = {
    favWorkspaceData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function FavWorkspaceReducer(
    state : FavWorkspaceData = INITIAL_STATE, 
    action : ActionWithPayload<Payload, Error>) : 
    FavWorkspaceData{
        switch(action.type){
            case FavWorkspaceActions.FAVWORKSPACE_FETCH:
                return {
                    ...state,
                    favWorkspaceData : null,
                    loading : true,
                    error : ''
                }
            case FavWorkspaceActions.FAVWORKSPACE_FETCH_SUCCESS:
                return {
                    ...state,
                    favWorkspaceData : action.payload,
                    loading : false,
                    error : ''
                }
            case FavWorkspaceActions.FAVWORKSPACE_FETCH_FAILED:
                return {
                    ...state,
                    favWorkspaceData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
}