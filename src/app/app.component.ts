import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AppDirectionProvider } from '../providers/app-direction/app-direction';
import { KnoledgeCenterPage } from '../pages/knowledge-center/knowledge-center';
import { MediaNewsPage } from '../pages/media-news/media-news';
import { MediaEventsPage } from '../pages/media-events/media-events';
import { MediaAnnouncementsPage } from '../pages/media-announcements/media-announcements';
import { SurveyPage } from '../pages/survey/survey';
import { PollsPage } from '../pages/polls/polls';
import { EServicePage } from '../pages/e-service/e-service';
import { ProfileAgencyPage } from '../pages/profile-agency/profile-agency';
import { FeedbackPage } from '../pages/feedback/feedback';
import { WorkGroupsPage } from '../pages/work-groups/work-groups';
import { SearchGeneralPage } from '../pages/search-general/search-general';
import { TermsConditionsPage } from '../pages/terms-conditions/terms-conditions';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { AllSearchAction } from '../redux/actions/all_search_action';
import { FeedbackAction } from '../redux/actions/feedback_action';
import { WorkspaceUserAction } from '../redux/actions/workspace_user_action';
import { UserloginAction } from '../redux/actions/user_login_action';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  pages: Array<{title: string, component: any}>;

  public langToggle : boolean = false;
  public direction : any;
  public employeeName : any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public translate:TranslateService,
    public events: Events,
    public menuCtrl: MenuController,
    public AppDirectionProvider : AppDirectionProvider,
    public AllSearchAction:AllSearchAction,
    public feedbackAction:FeedbackAction,
    public workspaceuser:WorkspaceUserAction,
    public userloginaction:UserloginAction,
    public zone:NgZone
    ) {
      // console.log("window Screen width " + window.screen.width);
      // console.log("window Screen height " + window.screen.height);
      // console.log("window Pixel Ratio " + window.devicePixelRatio);
      this.statusBar.backgroundColorByHexString('#76173f');
      this.initializeApp();

      // used for an example of ngFor and navigation
      this.pages = [
        { title : 'Home', component: HomePage },
        { title : 'Workspaces', component: WorkGroupsPage },
        { title : 'Knowledge Center', component: KnoledgeCenterPage },
        { title : 'News', component: MediaNewsPage },
        { title : 'Events', component: MediaEventsPage },
        { title : 'Announcements', component: MediaAnnouncementsPage },
        { title : 'Surveys', component: SurveyPage },
        { title : 'Polls', component: PollsPage },
        { title : 'Feedback & Inquiries', component : FeedbackPage },
        { title : 'Electronic Services', component : EServicePage },
        { title : 'Privacy Policy', component : PrivacyPolicyPage },
        { title : 'Terms & Conditions', component : TermsConditionsPage },
        { title : 'General Search', component : SearchGeneralPage }
      ];

      this.events.subscribe('type:direction', (value: any) => {
        this.direction = value;
        if(this.direction == 'rtl'){
          translate.use('ar');
          localStorage.setItem('direction', 'rtl');
        }else{
          translate.use('en');
          localStorage.setItem('direction', 'ltr');
        }
      })
    
let imgBase64 = "data:image\/.png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6\/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUEyOTBBMDYxMzRBMTFFOUFDRDc5MjRGMDUzRkY0NDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUEyOTBBMDcxMzRBMTFFOUFDRDc5MjRGMDUzRkY0NDYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQTI5MEEwNDEzNEExMUU5QUNENzkyNEYwNTNGRjQ0NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQTI5MEEwNTEzNEExMUU5QUNENzkyNEYwNTNGRjQ0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI\/Pl2bRhkAAAaBSURBVHja7FtrbBRFHJ\/Z292723v3fYUebWnv2hKQR5FEYxBFDKIoCpgYkcRoopFIFBMT1Pg2IcYYIRH5pCCfNH5QIfWZapQPCLEKaejd0RYt7VXgWnp3vde+\/O9xW5fa0t62u9fH\/dN\/dl6dmd\/M\/zUzLRZFEc0nItA8I3KiBhhj1OH374DkO8ALZyiOBPBh4D0+rzc+JcAAtho+R2b4xpmBn8qmn56qSC+dRRK7czp02DiLAJsLRitXHZYpJaKeHd3Djn5WsCvLl5gNvW9UmgccBlz0fE8cnUnwC5T1VTQxsLfC1A3tVg1y4rm9fQl7O7RxkThx0MMEKiniphkJ2IhR1dEaS+juYNTOK1z3c2XG\/lISr5LSBzxM6qHOWPwKJzJy\/RMlxvMA9mYpDSAbP6hietcHouhDDxOUwO7rTwbb4nxFrhOnMeIP11hIjJBVE8DZQdzrbFTghwjrlcuOD7Emr8lwzYXBuuwqM516rS+xWq5vGWLL19n+G+YqLw4C8JIFFNEk5SWwfaxgU7NbcUHstBA4J8A56\/DOYvo6P\/dNhGuEDU+P+O1R7U\/FuUUCQkNyvjXCpra76HZ5sY0EYtWKJ40xo5lIy7SIJpqsBGZjgkhlPL4gEr1poWMhTSyT8p8Npj0g\/pLOZ0gS\/\/NJvhOkYKWU\/3qIrdtfxYTk\/g55mFhcQKFc52HAiKQw8mkOWFrYB1zUmaPh9DK54MurLH6mzIhYEYXAILlfcpva3w4ll8j1X4HYvwBinxTEi7BARUUkHpmoicAeEzEDjZaStjhpAgCP5FsirA8Ac78Ncxdhp5kNdmrxu\/1JlM7u8vcRrmFPOUqdivOhB130JShaKf8uWP2zf6eFuIpDAG62kCsgSWkOGKxyUzG4lTAnZhx9hBfpf2DiIM6V21x0ECS6ebWF7DoR42oVYu\/\/YjDtfsVtjij7ej2ULAapUBXNHauz+u0G7NPUaMm\/t9VFn1MWfHQ55fgzzi+4w0Zm\/PR9DiqsrD90JeX6Ky2UwkI1KMtBx7Fa8eQzPzqItESbHBRz6HJqJP9jlPPAzschAKmX8isZQ6my\/c9RrurxEmMbJFcoy3cU072\/xrgBFX5YdBpwjW6AYbCGCoqIgQ6O+MH7nbRfBgTGqBrqh6HeItdvtJP\/G+82K9kMPDsuALa7KL8yv9FB0dfl7WRQToOupcsponGMbljw01EVPKyblZbpLjtl238pNQKolLzegNxpp8SPs9b8HgfVAZ9lo\/t4K5Ts+g6svJrxW+qtXRBp1eq2w6CvXnBDQ1md7hi9gFDnJbMmabNjbO8BLsmudvyUkLnp0PdO62FwQ1mrLI7RuaWZIS+YCSwA+IZxIreImnFxxk6gnENLPNGtpT8Q2Aqfz8erh+Di4k9RthfEezke47LgEieeDXNCutFkWDVOF5yAct8pGIsAtowu93m9WDMdzrqHhRBZjXu5V0bipWWk4YZzAEmwIZ2ocOMxGQIlGOZEFMnnxOGkVK5mw3IGLPnAe4MxExwP3fkEvNZGdr9Zaa7RXKQh9o3JZ+F8UjAplOiiw+BXnbVGYjCfYKVJr7ORPbroMNh88yfVFjPKPzUVrHQB8PS4pfSrfYkef1Ioy9ekMZyFHy2iOyF+X6E5YFZE4dYotzjfO\/VpOF23yUFpL9IGjMwUzr9ollM4ootIwwo5W+ptfTFezJtrktbbQeJFuoWWcGCoLCJxZcFKz9XDw4W08EcgyafyNmkw02sshmILges0BwynpMuPdQ8vz\/dO1RiJgcPVFu1FWlRx+a0FgXs06CLS0jn0Zbfp9O9x3pyvP2mDOQhbnLS08Mv10GG8wU41Axdi6TlrpXkILwXFq786S4scEEBM5ppVuu\/eBfxLg8834ZgT3cKqueK5uj4YLeanqMAQB597scLUOEEz6TllPQDtzdsOA9AEsHOqA4c5kZ5Es29Hgz1x8nQVfG5B1\/4ITeqDyaqm9IIhPdEemFbAcHiw2QyYjfJTu9dabCQm8+ofHQV2N3zek6YxVogAvEGLw4P1eJ11OqQrp1d\/ACu9O7+P0LgP6M\/euqa5dSIdnk1W+vYbgD0IYA\/ONbc0XhzZCrx7vvjhLuBtsLvsfAAsGbTNADY8HyItCAfQIwC2fb6ElnsB7DGtYun4DAN7FMDu0\/Lw0JZ16jOBTgI\/qWloCaFdqMPvXwvJPcC12XBOL1KGlYGskUpOpUNc+M+0OU7\/CjAAaEgtbop2Af4AAAAASUVORK5CYII="


console.log(imgBase64.replace('\/','/'));
      
  }

  /* Open sidemenu page function */
  openPage(page) {
    this.nav.setRoot(page.component);
    this.menuCtrl.close();    
  }

  /* Go to profile function */
  goProfile(){
    this.nav.setRoot(ProfileAgencyPage, {fromMenu : true});
    this.menuCtrl.close();
  }

  /* initialize App starting */
  initializeApp() {
    this.platform.ready().then(() => {
      this.checkLogin()
      this.startChecking();

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.styleLightContent(); // do not use default style

      this.translate.setDefaultLang('en');  
      localStorage.setItem('direction', 'ltr');
      this.events.publish('type:direction',  'ltr');

      this.menuCtrl.swipeEnable(false, 'menuLeft');
      this.menuCtrl.swipeEnable(false, 'menuRight');
    });

  }

  /* Login Checking Event */
  checkLogin(){
    this.events.subscribe(("login:check"), () => {  this.startChecking(); })
  }

  /* User Id check function */
  startChecking(){
    if(localStorage.getItem('userData')){
      let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      console.log(userData);
      let localstorageData = userData.ID;
      
      this.employeeName = userData.EmployeeName;
      if(localstorageData){
          //this.allActionCall();
          this.zone.run(()=>{
            this.rootPage = HomePage
          })
      }else{
          this.zone.run(()=>{
            this.rootPage = HomePage
          })
      }
    }else{
      this.zone.run(()=>{
        this.rootPage = HomePage
      })
    }
  }


  allActionCall(){
    let testingdata = {Search:"",Categories:null,Tags:null,Page:0,Language:"en"};
    let feedb = {
      Title: "Test Title",
      UserID: "23",
      Email : "amaghraby@advancya.com",
      CategoryID:"1",
      Comments : "asdasdasdsad"
      }
    // this.feedbackAction.feedbackDataFetch(feedb)

    this.workspaceuser.fetchWorkspaceTask(feedb)
  }




  /* change Language function */
  changeLang(){

      this.langToggle =! this.langToggle;
      if(this.langToggle == true){
          this.translate.use('ar');
          this.events.publish('type:direction',  'rtl');      
          localStorage.setItem('direction', 'rtl');
          this.menuCtrl.close();
          localStorage.setItem('detectChanges', 'true');
      }else{
          this.translate.use('en');
          this.events.publish('type:direction',  'ltr');
          localStorage.setItem('direction', 'ltr');
          this.menuCtrl.close();
          localStorage.setItem('detectChanges', 'true');
      }

  }

  /* Logout function */
  logout(){
    this.menuCtrl.close();
    localStorage.removeItem('userData');
    localStorage.setItem('direction', 'ltr');
    this.translate.use('en');
    // localStorage.removeItem('userId')
    // localStorage.removeItem('userName')
    // localStorage.removeItem('useremail')

    this.events.publish("login:check");
  }
}
