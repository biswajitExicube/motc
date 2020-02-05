import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';

// Page Modules
import { MediaAnnoucementsDetailPageModule } from './media-annoucements-detail/media-annoucements-detail.module';
import { EServeIndividualSubPageModule } from './e-serve-individual-sub/e-serve-individual-sub.module';
import { MediaAnnouncementsPageModule } from './media-announcements/media-announcements.module';
import { MediaEventDetailPageModule } from './media-event-detail/media-event-detail.module';
import { WorkspaceDetailsPageModule } from './workspace-details/workspace-details.module';
import { ContactFavouritePageModule } from './contact-favourite/contact-favourite.module';
import { WorkspaceRequestPageModule } from './workspace-request/workspace-request.module';
import { MediaNewsDetailPageModule } from './media-news-detail/media-news-detail.module';
import { TermsConditionsPageModule } from './terms-conditions/terms-conditions.module';
import { SearchDirectoryPageModule } from './search-directory/search-directory.module';
import { KnoledgeCenterPageModule } from './knowledge-center/knowledge-center.module';
import { CreateWorkspacePageModule } from './create-workspace/create-workspace.module';
import { ContactDetailsPageModule } from './contact-details/contact-details.module';
import { WorkspaceChartPageModule } from './workspace-chart/workspace-chart.module';
import { WorkspaceEventPageModule } from './workspace-event/workspace-event.module';
import { MyTaskDetailsPageModule } from './my-task-details/my-task-details.module';
import { SurveyDetailsPageModule } from './survey-details/survey-details.module';
import { ProfileAgencyPageModule } from './profile-agency/profile-agency.module';
import { SearchGeneralPageModule } from './search-general/search-general.module';
import { PrivacyPolicyPageModule } from './privacy-policy/privacy-policy.module';
import { InviteMemberPageModule } from './invite-member/invite-member.module';
import { DocumentListPageModule } from './document-list/document-list.module';
import { NotificationPageModule } from './notification/notification.module';
import { MediaCenterPageModule } from './media-center/media-center.module';
import { MediaEventsPageModule } from './media-events/media-events.module';
import { WorkGroupsPageModule } from './work-groups/work-groups.module';
import { MediaNewsPageModule } from './media-news/media-news.module';
import { FavouritePageModule } from './favourite/favourite.module';
import { EServicePageModule } from './e-service/e-service.module';
import { UserTypePageModule } from './user-type/user-type.module';
import { ComponentsModule } from '../component/component.module';
import { FeedbackPageModule } from './feedback/feedback.module';
import { MyTaskPageModule } from './my-task/my-task.module';
import { SurveyPageModule } from './survey/survey.module';
import { AboutPageModule } from './about/about.module';
import { PollsPageModule } from './polls/polls.module';
import { HomePageModule } from './home/home.module';

//plugins
import { FileOpener } from '@ionic-native/file-opener';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
import { SocialSharing } from '@ionic-native/social-sharing';
import {  
  FileTransfer,  
  FileTransferObject  
} from '@ionic-native/file-transfer';  
import { File } from '@ionic-native/file';
import { NgReduxModule } from '@angular-redux/store';
import { StoreModule } from '../redux/store/all_module';
import { HttpModule } from '@angular/http';
import { LoginPageModule } from './login/login.module';

@NgModule({
  declarations: [
    //LoginPage,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    HttpClientModule,
    HomePageModule,
    MediaCenterPageModule,
    EServicePageModule,
    EServeIndividualSubPageModule,
    AboutPageModule,
    MediaNewsPageModule,
    MediaNewsDetailPageModule,
    MediaEventsPageModule,
    MediaEventDetailPageModule,
    MediaAnnouncementsPageModule,
    MediaAnnoucementsDetailPageModule,
    FavouritePageModule,
    SearchDirectoryPageModule,
    SearchGeneralPageModule,
    ProfileAgencyPageModule,
    ContactFavouritePageModule,
    ContactDetailsPageModule,
    CreateWorkspacePageModule,
    WorkspaceDetailsPageModule,
    WorkspaceChartPageModule,
    WorkspaceEventPageModule,
    WorkspaceRequestPageModule,
    PollsPageModule,
    SurveyPageModule,
    SurveyDetailsPageModule,
    KnoledgeCenterPageModule,
    MyTaskPageModule,
    MyTaskDetailsPageModule,
    NotificationPageModule,
    FeedbackPageModule,
    WorkGroupsPageModule,
    TermsConditionsPageModule,
    PrivacyPolicyPageModule,
    UserTypePageModule,
    InviteMemberPageModule,
    DocumentListPageModule,
    LoginPageModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    NgReduxModule,
    StoreModule,
    HttpModule
  ],
  providers: [
    SocialSharing,
    FileTransfer,  
    FileTransferObject,  
    File,
    FileOpener
  ]
})
export class CommonPageModule {}
