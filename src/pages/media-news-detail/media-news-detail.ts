import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { NewsDetailData } from '../../redux/core/news_detail_session';
import { NewsDetailAction } from '../../redux/actions/news_detail_action';
import { AddRemoveFavAction } from '../../redux/actions/addRemoveFav_action';
import { FavNews } from '../../redux/core/all_favourite_session';


@IonicPage()
@Component({
  selector: 'page-media-news-detail',
  templateUrl: 'media-news-detail.html',
})
export class MediaNewsDetailPage {

  @select(['newsDetailData', 'newsDetailData'])
  readonly newsDetailData$ : Observable<NewsDetailData>;

  //For Favourite News
  @select(['FavNews', 'favouriteNews'])
  readonly favNewsData$ : Observable<FavNews>;

  public direction : any;
  public eventLike : boolean;
  public fromMedia : any;
  public newsID : number;
  public currLang : string;
  public newsDetailData : any = [];
  public defaultdetails:any;
  public userID:any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public newsDetailAction : NewsDetailAction,
    public addRmFavAction : AddRemoveFavAction) {

      this.fromMedia = this.navParams.get('fromMedia');
      this.newsID = this.navParams.get('newsID');
      console.log(this.newsID);
      let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      this.userID = userData.ID;
      
      //console.log(this.newsID);

      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        //console.log("en");
        this.currLang = 'en';
        this.newsDetailAction.newsDetailFetch({name: this.currLang, id:this.newsID,userID:this.userID});
      }else if(localLang == 'rtl'){
        //console.log("ar");
        this.currLang = 'ar';
        this.newsDetailAction.newsDetailFetch({name: this.currLang, id:this.newsID,userID:this.userID});
      }

      this.newsDetailData$.subscribe((data: any) => {
        if(data){
          console.log(data)
          this.defaultdetails = data;
          this.newsDetailData = data;
          //console.log(this.newsDetailData);
        }
      })

      this.favNewsData$.subscribe((data:any)=>{
        if(data){
            let favNews:any = data;
            for(let i=0; i<favNews.length; i++){
              for(let j=0; j<this.newsDetailData.length; j++){
                if(favNews[i].ID == this.newsDetailData[i].ID){
                  this.newsDetailData[i] = true;
                }
              }
            }
        }
      })

     
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MediaNewsDetailPage');
  }
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.newsDetailAction.newsDetailFetch({name:'ar', id:this.newsID,userID:this.userID});
      }else if(this.direction == 'ltr'){
        this.newsDetailAction.newsDetailFetch({name:'en', id:this.newsID,userID:this.userID});
      }
    });
  }

  eventLiking(){
    console.log("Clicked");
    // this.eventLike = !this.eventLike;
    this.addRmFavAction.startAddRemoveFav({lang: this.currLang, ref: 'news', itemID : this.newsID, opr :!this.newsDetailData.IsFavourite})
  }
}
