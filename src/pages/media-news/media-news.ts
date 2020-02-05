import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaNewsDetailPage } from '../media-news-detail/media-news-detail';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { NewsData } from '../../redux/core/news_session';
import { NewsAction } from '../../redux/actions/news_action';
import { SearchNews } from '../../redux/core/all_search_session';
import { AllSearchAction } from '../../redux/actions/all_search_action';
import { AlertProvider } from '../../providers/alert-provider/alert_provider';



@IonicPage()
@Component({
  selector: 'page-media-news',
  templateUrl: 'media-news.html',
})
export class MediaNewsPage {

  @select(['newsData', 'newsData'])
  readonly newsData$ : Observable<NewsData>;

  @select(['NewsSearchData', 'SearchNewsData'])
  readonly SearchNewsData$ : Observable<SearchNews>;

  public direction : any;
  public fromMedia : any;
  public newsData : any = [];
  public currLang : string;
  public defaultnewsValue:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events, 
    public menuCtrl: MenuController,
    public newsAction : NewsAction,
    public newsSearchAction : AllSearchAction,
    public _DomSanitizationService: DomSanitizer,
    public alertProvider:AlertProvider
  ) { 
    
      this.fromMedia = this.navParams.get('fromMedia');
      let localLang = localStorage.getItem('direction');

      if(localLang == 'ltr'){
          this.currLang = 'en';
          this.checkUser(this.currLang)
      }else if(localLang == 'rtl'){
          this.currLang = 'ar';
          this.checkUser(this.currLang)
      }
  
      /* Fetch Search Data */
      this.SearchNewsData$.subscribe((sData:any) => {
          if(sData){
            console.log(sData);
              if(sData.Results){
                  this.newsData = sData.Results;
              }else{  this.newsData = []  }
          }else{
            console.log("not founc..")
          }
      })

      /* fetch News Data */
      this.newsData$.subscribe((data) => {
        if(data){
          console.log("News Data ",data)
            this.defaultnewsValue = data
            this.newsData = this.defaultnewsValue;
        }
      })

  }

   /* Ion View Will Enter */
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
        this.direction = value;
        if(this.direction == 'rtl'){
          this.currLang = 'ar';
          this.checkUser(this.currLang)
        }else if(this.direction == 'ltr'){
            this.currLang = 'en';
            this.checkUser(this.currLang)
        }
    });

  }

  /* localstorage user ID checking function */
  checkUser(currentLang){
    let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      let localstorageData = userData.ID;
      if(localstorageData){

          let data :any= {
            lang:currentLang,
            userid:localstorageData,
          }
          this.newsAction.newsFetch(data);
      }
  }



 /* Side menu open function */
  openMenu(){
      let menuShow = localStorage.getItem('direction');
      if(menuShow == 'rtl'){
          this.menuCtrl.open('right');
      }else{
          this.menuCtrl.open('left');
      }
  }

  searchNews(news){
    if(news == ""){
      this.newsData = this.defaultnewsValue;
    }else{
      let searchOptions = {
        Search: news,
        Categories: null,
        Tags : null,
        Page:0,
        Language:this.currLang
      }
      console.log(searchOptions);
      this.newsSearchAction.FetchNews(searchOptions);
    }
  }

  newsDetail(newsID){
    if(this.fromMedia){
      this.navCtrl.push(MediaNewsDetailPage, {fromMedia : true, newsID : newsID});
    }else{
      this.navCtrl.push(MediaNewsDetailPage, {newsID : newsID});
    }
  }
}
