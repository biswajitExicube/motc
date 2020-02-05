import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { PollsData, PollAnswer } from '../../redux/core/polls_session';
import { PollsAction } from '../../redux/actions/polls_action';
import { AlertProvider } from '../../providers/alert-provider/alert_provider';


@IonicPage()
@Component({
  selector: 'page-polls',
  templateUrl: 'polls.html',
})
export class PollsPage {

  @select(['pollsData', 'pollsData'])
  readonly pollsData$ : Observable<PollsData>;

  @select(['PollsAnsReducer','pollAnsData'])
  readonly pollsAns$ : Observable<PollAnswer>;

  

  public direction : any;
  public fromMedia : any;
  
  public viewPollRate : boolean = false;
  public pollExpand : boolean = false;

  public pollingList : any = [];
  public currentpoll : any;
  public isActive : boolean = true;
  public shownGroup = null;
  public show : any = null;

  public posRange : number = 1;
  public negRange : number = 46;
  public notSureRange : number = 27;
  public currLang : string;

  public poll:any;
  public pollResults:any;
  public pollTotalVote:any;
  public buttonhideIndex:any=null;
  public oldpollshownGroup:any=null;




  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    public pollsAction : PollsAction,
    public alertprovider:AlertProvider
  ) {

      this.fromMedia = this.navParams.get('fromMedia'); 

      let localLang = localStorage.getItem('direction');

      if(localLang == 'ltr'){
        this.currLang = 'en';
        this.fetchData();
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
        this.fetchData();
      }


      this.pollsData$.subscribe((data) => {
          if(data){ this.pollingList = data;}
      })

      this.pollsAns$.subscribe((data:any)=>{
          if(data){
              this.pollTotalVote=data.totalVote
              this.pollResults = data.AnswersWithCount
          }
      })
  }
  /* Ion View Will Enter */
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
        this.direction = value;
        if(this.direction == 'rtl'){
            this.currLang='ar'
            this.fetchData();
        }else if(this.direction == 'ltr'){
            this.currLang = 'en'
            this.fetchData();
        }
    });
  }

  /* Fetch All Polls function */
  public fetchData(){
    this.pollsAction.pollsFetch(this.currLang);
  }


  /* Open Sidemenu function */
  openMenu(){
    let menuShow = localStorage.getItem('direction');
    if(menuShow == 'rtl'){
        this.menuCtrl.open('right');
    }else{
        this.menuCtrl.open('left');
    }
  }

  /* Ion Radio button change function */
  pollSelect(poll){  }

  /* View poll result function */
  viewPollResult(polldetails,index,polltype){
      if(this.poll){
          this.shownGroup = polldetails;
          //check poll type function
          this.checkpolltype(index,polltype);

          let data={
            QuestionId:polldetails.QID,
            Answer:this.poll
          }
          //check User function
          this.checkUser(data);

      }else{
          this.alertprovider.openAlert("Select an answer first ..",1500);
      } 
  }

  /* localstorage user ID checking function */
  checkUser(details){
    let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      let localstorageData = userData.ID;
      if(localstorageData){

          let data :any= {
            QuestionId:details.QuestionId,
            Answer:details.Answer,
            userid:localstorageData,
            lang:this.currLang
          }
          // console.log(data)
          this.pollsAction.submitPollAns(data);

      }
  }

  /* CHeck Poll type function  */
  checkpolltype(index,polltype){
      if(polltype =='oldpoll'){
          this.oldpollshownGroup = index;
          this.buttonhideIndex = null;
      }else{
          this.buttonhideIndex = index;
          this.oldpollshownGroup = null;
      }
  }

  /* Poll on/off function */
  pollDivExpand(poll){
    this.show = this.show ==null ? poll :null;
    if(poll == 'currPoll'){
        this.isActive =! this.isActive;
    }
  }
  
  /* Back from poll result modal [ First modal ] */
  backPoll(){
      this.shownGroup = null;
      this.buttonhideIndex = null;      
  }

  /* back from poll result modal [ Old Modal ] */
  backPollOld(){
      this.shownGroup = null;
      this.oldpollshownGroup = null;
  }
  


}
