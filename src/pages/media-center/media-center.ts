import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { MediaNewsPage } from '../media-news/media-news';
import { MediaEventsPage } from '../media-events/media-events';
import { MediaAnnouncementsPage } from '../media-announcements/media-announcements';
import { PollsPage } from '../polls/polls';
import { SurveyPage } from '../survey/survey';
import { FeedbackPage } from '../feedback/feedback';


@IonicPage()
@Component({
  selector: 'page-media-center',
  templateUrl: 'media-center.html',
})
export class MediaCenterPage {
  
  public direction : any;
  public mediaList : any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events, 
    public menuCtrl: MenuController) {

      this.mediaList = [
        {
          name: 'News',
          image : 'assets/imgs/newsIcon.png'
        },
        {
          name: 'Announcements',
          image : 'assets/imgs/announceIcon.png'
        },
        {
          name: 'Survey',
          image : 'assets/imgs/surveyIcon.png'
        },
        {
          name: 'Events',
          image : 'assets/imgs/eventsIcon.png'
        },
        {
          name: 'Feedback',
          image : 'assets/imgs/feedIcon.png'
        },
        {
          name: 'Polls',
          image : 'assets/imgs/pollIcon.png'
        },
      ]
  }

  /* IonViewWillEnter function */
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
    });
  }

  /* ToggleMenu open function */
  openMenu(){
    let menuShow = localStorage.getItem('direction');
    if(menuShow == 'rtl'){
      this.menuCtrl.open('right');
      // this.menuCtrl.close();
    }else{
      this.menuCtrl.open('left');
      // this.menuCtrl.close();
    }
  }

  /* Individual Item click function */
  mediaClick(media){
    //console.log(media.name);
    if(media.name == 'News'){
      this.navCtrl.push(MediaNewsPage, {fromMedia : true});
    }else if(media.name == 'Events'){
      this.navCtrl.push(MediaEventsPage, {fromMedia : true});
    }else if(media.name == 'Announcements'){
      this.navCtrl.push(MediaAnnouncementsPage, {fromMedia : true});
    }else if(media.name == 'Survey'){
      this.navCtrl.push(SurveyPage, {fromMedia : true});
    }else if(media.name == 'Feedback'){
      this.navCtrl.push(FeedbackPage, {fromMedia : true});
    }else{
      this.navCtrl.push(PollsPage, {fromMedia : true});
    }
  }

}
