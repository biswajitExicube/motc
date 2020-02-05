import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { AboutData } from '../../redux/core/about_session';
import { AboutAction } from '../../redux/actions/about_action';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  @select(['aboutData', 'aboutData'])
  readonly aboutData$ : Observable<AboutData>;

  public direction : any;
  public aboutData : any = [];
  public currLang :string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events, 
    public menuCtrl: MenuController,
    public aboutAction : AboutAction) {

      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.currLang = "en"
        this.fetchData(this.currLang);
      }else if(localLang == 'rtl'){
        this.currLang = "ar";
        this.fetchData(this.currLang);
      }
      // console.log(localLang);

      /* Fetch About Data */
      this.aboutData$.subscribe((data:any) => {
        if(data){
          // console.log(data.ImageUrl);
          this.aboutData = data;
        }
      })
      
  }

    /* Fetch About Data function*/
  public fetchData(currlang){
    this.aboutAction.aboutDataFetch(currlang);
  }

  /* Ion View Will Enter */
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      // console.log(this.direction);
      if(this.direction == 'rtl'){
          this.currLang = "ar";
          this.fetchData(this.currLang);
      }else if(this.direction == 'ltr'){
          this.currLang = "en"
          this.fetchData(this.currLang)
      }
    });
    
  }

  /* Open Side menu */
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
}
