import { Injectable } from '@angular/core';
import { createEpicMiddleware } from 'redux-observable';
import { HomeEpics } from '../epics/home_epics';
import { FavWorkspaceEpics } from '../epics/favWorkspace_epics';
import { AboutEpics } from '../epics/about_epics';
import { TermsPrivacyEpic } from '../epics/terms_privacy_epics';
import { AnnouceEpics } from '../epics/announce_epics';
import { NewsEpics } from '../epics/news_epics';
import { NewsDetailEpics } from '../epics/news_detail_epics';
import { EventsEpics } from '../epics/events_epics';
import { EventsDetailEpics } from '../epics/events_detail_epics';
import { AgencyEpics } from '../epics/agency_epics';
import { WorkGroupEpics } from '../epics/workgroup_epics';
import { SurveysEpics } from '../epics/surveys_epics';
import { WorkEventsEpics } from '../epics/work_events_epics';
import { AllSearchEpics } from '../epics/all_search_epics';
import { FeedbackEpics } from '../epics/feedback_epics';
import { AnnounceDetailEpics } from '../epics/anounce_detail_epics';
import { WorkspaceUserEpics } from '../epics/workspace_user_epic';
import { KnowledgeCenterEpics } from '../epics/knowledge_center_epics';
import { FavUsersEpics } from '../epics/fav_users_epics';
import { UserTasksEpics } from '../epics/user_tasks_epics';
import { WorkSpaceDetailEpics } from '../epics/work_space_detail_epics';
import { AddRemoveFavEpics } from '../epics/addRemoveFav_epics';
import { NotifyEpics } from '../epics/notify_epics';
import { PollsEpics } from '../epics/polls_epics';
import { DiscussEpics } from '../epics/discuss_epics';
import { EServiceEpics } from '../epics/eService_epics';
import { JoinWorkspaceEpics } from '../epics/join_workspace_epics';
import { LeaveWorkspaceEpics } from '../epics/leave_workspace_epics';
import { WorkspaceDocListEpics } from '../epics/workspace_docList_epics';
import { UserloginEpics } from '../epics/user_login_epics';
import { CreateWorkspaceEpics } from '../epics/create_workspace_epic';
import { AllFavouriteEpics } from '../epics/all_favourite_epics';
import { InvitememberEpics } from '../epics/invite_member_epic';
import { WorkspaceRequestdataEpics } from '../epics/workspace_requests_epic';
import { GeneralSearchEpics } from '../epics/general_search_epics';
// import { WorkspaceRequestEpics } from '../epics/workspace_request_epic';

@Injectable()
export class RootEpics{
    constructor(
        private homeEpics: HomeEpics, 
        private favWorkspaceEpics : FavWorkspaceEpics,
        private aboutEpics : AboutEpics,
        private termsPrivacyEpics : TermsPrivacyEpic,
        private annouceEpics : AnnouceEpics,
        private announceDetailEpics : AnnounceDetailEpics,
        private newsEpics : NewsEpics,
        private newsDetailEpics : NewsDetailEpics,
        private eventsEpics : EventsEpics,
        private eventsDetailEpics : EventsDetailEpics,
        private agencyEpics : AgencyEpics,
        private workGroupEpics : WorkGroupEpics,
        private surveysEpics : SurveysEpics,
        private workEventsEpics : WorkEventsEpics,
        private feedbackEpics : FeedbackEpics,
        private workspaceuserEpics:WorkspaceUserEpics,
        private knowledgeCenterEpics : KnowledgeCenterEpics,
        private favUsersEpics : FavUsersEpics,
        private userTasksEpics : UserTasksEpics,
        private workSpaceDetailEpics : WorkSpaceDetailEpics,
        private AddRemoveFavEpics : AddRemoveFavEpics,
        private notifyEpics : NotifyEpics,
        private pollsEpics : PollsEpics,
        private discussEpics : DiscussEpics,
        private esEpics : EServiceEpics,
        private joinWorkspaceEpics : JoinWorkspaceEpics,
        private leaveWorkspaceEpics : LeaveWorkspaceEpics,
        private workspaceDocListEpics : WorkspaceDocListEpics,
        private CreateWorkspaceEpics:CreateWorkspaceEpics,
        //Login
        private userloginepics : UserloginEpics,

         //for demo search
        private AllSearchEpics:AllSearchEpics,
        //all search
        private AllFavouriteEpics:AllFavouriteEpics,
        //invite member
        private invitememberepics:InvitememberEpics,
        //workspace request epic
        private WorkspacerequestdataEpics:WorkspaceRequestdataEpics,
        //general search
        private generalsearchepics:GeneralSearchEpics
        ){}

    public createEpics(){
        return [
            createEpicMiddleware(this.homeEpics.home),
            createEpicMiddleware(this.favWorkspaceEpics.favWorkspace),
            createEpicMiddleware(this.aboutEpics.about),
            createEpicMiddleware(this.termsPrivacyEpics.termsPrivacy),
            createEpicMiddleware(this.annouceEpics.annouce),
            createEpicMiddleware(this.annouceEpics.homeAnnouncement),
            createEpicMiddleware(this.announceDetailEpics.announceDetail),
            createEpicMiddleware(this.newsEpics.news),
            createEpicMiddleware(this.newsDetailEpics.newsDetail),
            //events
            createEpicMiddleware(this.eventsEpics.events),
            createEpicMiddleware(this.eventsDetailEpics.eventsDetail),
            createEpicMiddleware(this.agencyEpics.agency),
            createEpicMiddleware(this.workGroupEpics.workGroup),
            createEpicMiddleware(this.workGroupEpics.myworkGroup),
            //survey start
            createEpicMiddleware(this.surveysEpics.surveyOld),
            createEpicMiddleware(this.surveysEpics.surveyNew),
            createEpicMiddleware(this.surveysEpics.submitSurvey),
            //survey end
            createEpicMiddleware(this.workEventsEpics.workEvents),
            createEpicMiddleware(this.feedbackEpics.feedBack),
            createEpicMiddleware(this.workspaceuserEpics.workSpaceUserTask),

            //knowledge center
            createEpicMiddleware(this.knowledgeCenterEpics.getBestPracticeKnowledgeCenter),
            createEpicMiddleware(this.knowledgeCenterEpics.othersKnowledgecenterCatagoryListFetch),
            createEpicMiddleware(this.knowledgeCenterEpics.getOtherKnowledgeCenter),
            createEpicMiddleware(this.knowledgeCenterEpics.getPoliticsKnowledgeCenter),
            //knowledge center end 
            createEpicMiddleware(this.favUsersEpics.favUsers),
            
            // User All Tasks / Workspace User All Tasks
            createEpicMiddleware(this.userTasksEpics.userTasks),
            createEpicMiddleware(this.userTasksEpics.workspaceUsertasks),
            createEpicMiddleware(this.userTasksEpics.userTasksDetail),
            //submit task
            createEpicMiddleware(this.userTasksEpics.submitTask),

            
            createEpicMiddleware(this.workSpaceDetailEpics.workSpaceDetail),
            createEpicMiddleware(this.AddRemoveFavEpics.addRemoveFav),
            createEpicMiddleware(this.notifyEpics.notification),
            //Pols Epic module
            createEpicMiddleware(this.pollsEpics.polls),
            createEpicMiddleware(this.pollsEpics.submitPollsAns),
            createEpicMiddleware(this.pollsEpics.fetchPollsAnswer),

            createEpicMiddleware(this.discussEpics.discuss),
            createEpicMiddleware(this.joinWorkspaceEpics.joinWorkspace),
            createEpicMiddleware(this.leaveWorkspaceEpics.leaveWorkspace),
            createEpicMiddleware(this.workspaceDocListEpics.workspaceDocList),
            //create workspace
            createEpicMiddleware(this.CreateWorkspaceEpics.CreateWorkspace),
            
            //E-Services
            createEpicMiddleware(this.esEpics.eService),
            createEpicMiddleware(this.esEpics.esIndividual),
            createEpicMiddleware(this.esEpics.esCompanies),
            createEpicMiddleware(this.esEpics.esOthers),
            //Login
            createEpicMiddleware(this.userloginepics.startUserlogin),

            //all search
            createEpicMiddleware(this.AllSearchEpics.FetchAgencies),
            createEpicMiddleware(this.AllSearchEpics.FetchAnnouncement),
            createEpicMiddleware(this.AllSearchEpics.FetchDocument),
            createEpicMiddleware(this.AllSearchEpics.FetchEvent),
            createEpicMiddleware(this.AllSearchEpics.FetchNews),
            createEpicMiddleware(this.AllSearchEpics.FetchPolls),
            createEpicMiddleware(this.AllSearchEpics.FetchSurvey),
            createEpicMiddleware(this.AllSearchEpics.FetchUserContact),
            createEpicMiddleware(this.AllSearchEpics.FetchWorkSpace),
            //Knowledge center Document
            createEpicMiddleware(this.AllSearchEpics.FetchKnowledgeCenterDocument),
            //all Favourite
            createEpicMiddleware(this.AllFavouriteEpics.fetchFavNews),
            createEpicMiddleware(this.AllFavouriteEpics.fetchFavEvents),
            createEpicMiddleware(this.AllFavouriteEpics.fetchFavWorkspace),
            createEpicMiddleware(this.AllFavouriteEpics.fetchFavDocuments),
            //invite member
            createEpicMiddleware(this.invitememberepics.inviteMember),
            //workspace request 
            createEpicMiddleware(this.WorkspacerequestdataEpics.fetchWorkspaceRequestdata),
            //general search 
            createEpicMiddleware(this.generalsearchepics.fetchGeneralSearchData)
            

        ]
    }
}