import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { SearchAgencies, SearchAnnouncements, SearchDocuments, SearchEvents, SearchNews, SearchPolls, SearchSurvey, SearchUserContacts, SearchWorkspaces, SearchFavUserContacts, SearchKnowledgeCenterSearchDocument } from "../core/all_search_session";

@Injectable()
export class AllSearchAction{

    /* Agencies */
    static FETCH_AGENCIES = 'FETCH_AGENCIES';
    static SUCCESS_AGENCIES = 'SUCCESS_AGENCIES';

    /* Announcement */
    static FETCH_ANNOUNCEMENT = 'FETCH_ANNOUNCEMENT';
    static SUCCESS_ANNOUNCEMENT = 'SUCCESS_ANNOUNCEMENT';

    /* Document */
    static FETCH_DOCUMENT = 'FETCH_DOCUMENT';
    static SUCCESS_DOCUMENT = 'SUCCESS_DOCUMENT';

    /* Events */
    static FETCH_EVENT = 'FETCH_EVENT';
    static SUCCESS_EVENT = 'SUCCESS_EVENT';

    /* News */
    static FETCH_NEWS = 'FETCH_NEWS';
    static SUCCESS_NEWS = 'SUCCESS_NEWS';

    /* Polls */
    static FETCH_POLLS = 'FETCH_POLLS';
    static SUCCESS_POLLS = 'SUCCESS_POLLS';

    /* Survey */
    static FETCH_SURVEY = 'FETCH_SURVEY';
    static SUCCESS_SURVEY = 'SUCCESS_SURVEY';

    /* User Contact */
    static FETCH_USER_CONTACT = 'FETCH_USER_CONTACT';
    static SUCCESS_USER_CONTACT = 'SUCCESS_USER_CONTACT';

    /* Favourite User Contact */
    static FETCH_FAVOURITE_USER_CONTACT = 'FETCH_FAVOURITE_USER_CONTACT';
    static SUCCESS_FAVOURITE_USER_CONTACT = 'SUCCESS_FAVOURITE_USER_CONTACT';

    /* Wrok Space / Work Group */
    static FETCH_WORK_SPACE = 'FETCH_WORK_SPACE';
    static SUCCESS_WORK_SPACE = 'SUCCESS_WORK_SPACE';

    /* Knowledge Center Search Document */
    static FETCH_KNOWLEDGE_CENTER_SEARCH_DOCUMENT = 'FETCH_KNOWLEDGE_CENTER_SEARCH_DOCUMENT';
    static SUCCESS_KNOWLEDGE_CENTER_SEARCH_DOCUMENT = 'SUCCESS_KNOWLEDGE_CENTER_SEARCH_DOCUMENT';

    /* Knowledge Center Search Document */
    static FETCH_POLITICS_AND_BESTPRACTICE = 'FETCH_POLITICS_AND_BESTPRACTICE';
    // static SUCCESS_KNOWLEDGE_CENTER_SEARCH_DOCUMENT = 'SUCCESS_KNOWLEDGE_CENTER_SEARCH_DOCUMENT';

    constructor(private ngRedux : NgRedux<IAppState>){}
    
    /* Agencies */
    FetchAgencies(quarydata){
        this.ngRedux.dispatch({
            type : AllSearchAction.FETCH_AGENCIES,
            payload : quarydata
        })
    }
    SuccessAgencies(payload : SearchAgencies){
        this.ngRedux.dispatch({
            type : AllSearchAction.SUCCESS_AGENCIES,
            payload : payload
        })
    }

    /* Announcement */
    FetchAnnouncement(quarydata){
        this.ngRedux.dispatch({
            type : AllSearchAction.FETCH_ANNOUNCEMENT,
            payload : quarydata
        })
    }
    SuccessAnnouncement(payload : SearchAnnouncements){
        this.ngRedux.dispatch({
            type : AllSearchAction.SUCCESS_ANNOUNCEMENT,
            payload : payload
        })
    }

    /* Document */
    FetchDocument(quarydata){
        this.ngRedux.dispatch({
            type : AllSearchAction.FETCH_DOCUMENT,
            payload : quarydata
        })
    }
    SuccessDocument(payload : SearchDocuments){
        this.ngRedux.dispatch({
            type : AllSearchAction.SUCCESS_DOCUMENT,
            payload : payload
        })
    }

    /* Event */
    FetchEvent(quarydata){
        this.ngRedux.dispatch({
            type : AllSearchAction.FETCH_EVENT,
            payload : quarydata
        })
    }
    SuccessEvent(payload : SearchEvents){
        this.ngRedux.dispatch({
            type : AllSearchAction.SUCCESS_EVENT,
            payload : payload
        })
    }

    /* News */
    FetchNews(quarydata){
        this.ngRedux.dispatch({
            type : AllSearchAction.FETCH_NEWS,
            payload : quarydata
        })
    }
    SuccessNews(payload : SearchNews){
        this.ngRedux.dispatch({
            type : AllSearchAction.SUCCESS_NEWS,
            payload : payload
        })
    }

    /* Polls */
    FetchPolls(quarydata){
        this.ngRedux.dispatch({
            type : AllSearchAction.FETCH_POLLS,
            payload : quarydata
        })
    }
    SuccessPolls(payload : SearchPolls){
        this.ngRedux.dispatch({
            type : AllSearchAction.SUCCESS_POLLS,
            payload : payload
        })
    }

    /* Survey */
    FetchSurvey(quarydata){
        this.ngRedux.dispatch({
            type : AllSearchAction.FETCH_SURVEY,
            payload : quarydata
        })
    }
    SuccessSurvey(payload : SearchSurvey){
        this.ngRedux.dispatch({
            type : AllSearchAction.SUCCESS_SURVEY,
            payload : payload
        })
    }

    /* User Contact */
    FetchUserContact(quarydata:any){
        // console.log(quarydata)
        this.ngRedux.dispatch({
            type : AllSearchAction.FETCH_USER_CONTACT,
            payload : quarydata
        })
    }
    SuccessUserContact(payload : SearchUserContacts){
        this.ngRedux.dispatch({
            type : AllSearchAction.SUCCESS_USER_CONTACT,
            payload : payload
        })
    }

    /* Favourite User Contact */
    FetchFavUserContact(quarydata:any){
        // console.log(quarydata);
        this.ngRedux.dispatch({
            type : AllSearchAction.FETCH_FAVOURITE_USER_CONTACT,
            payload : quarydata
        })
    }
    SuccessFavUserContact(payload : SearchFavUserContacts){
        this.ngRedux.dispatch({
            type : AllSearchAction.SUCCESS_FAVOURITE_USER_CONTACT,
            payload : payload
        })
    }

    /* Work Space / Work Group */
    FetchWorkSpace(quarydata:any){
        this.ngRedux.dispatch({
            type : AllSearchAction.FETCH_WORK_SPACE,
            payload : quarydata
        })
    }
    SuccessWorkSpace(payload : SearchWorkspaces){
        console.log(payload);
        this.ngRedux.dispatch({
            type : AllSearchAction.SUCCESS_WORK_SPACE,
            payload : payload
        })
    }

    /* Knowledge center search */
    FetchKnowledgeCenterSearch(quarydata:any){
        this.ngRedux.dispatch({
            type : AllSearchAction.FETCH_KNOWLEDGE_CENTER_SEARCH_DOCUMENT,
            payload : quarydata
        })
    }
    SuccessKnowledgeCenterSearch(payload : SearchKnowledgeCenterSearchDocument){
        this.ngRedux.dispatch({
            type : AllSearchAction.SUCCESS_KNOWLEDGE_CENTER_SEARCH_DOCUMENT,
            payload : payload
        })
    }


}