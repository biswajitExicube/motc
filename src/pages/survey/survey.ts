import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { SurveyDetailsPage } from '../survey-details/survey-details';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { SurveysNew, SurveysOld } from '../../redux/core/surveys_session';
import { SurveysAction } from '../../redux/actions/surveys_action';

import convert from  'xml-js'


@IonicPage()
@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html',
})
export class SurveyPage {

  @select(['surveysNew', 'surveysNew'])
  readonly surveysNew$ : Observable<SurveysNew>
  @select(['surveysOld', 'surveysOld'])
  readonly surveysOld$ : Observable<SurveysOld>

  public direction : any;
  public fromMedia : any;
  public currLang : string;
  public oldSurveys : any = [];
  public oldSurveysQuestions : any = [];
  public newSurveys : any  = [];
  public newSurveysQuestions : any  = [];
  
  public pendingSurvey : any = [];
  public completeSurvey : any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    public surveysAction : SurveysAction) {


      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.currLang = 'en';
        this.surveysAction.surveysNewFetch(this.currLang);
        this.surveysAction.surveysOldFetch(this.currLang);
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
        this.surveysAction.surveysNewFetch(this.currLang);
        this.surveysAction.surveysOldFetch(this.currLang);
      }

      this.surveysNew$.subscribe((data) => {
        if(data){
            //console.log(data);
            this.newSurveys = data;

           /* for(let i=0; i<this.newSurveys.length; i++){
                if(this.newSurveys[i].Questions){
                    let temlNewSurvey:any = this.newSurveys[i].Questions;
                    for(let x=0; x<temlNewSurvey.length; x++){
                        if(temlNewSurvey[x].SchemaXml){
                            let temlxml = temlNewSurvey[x].SchemaXml;
                            let result1:any = convert.xml2json(temlxml, {compact: true, spaces: 4});
                            let parseData = JSON.parse(result1);
                            this.newSurveys[i].Questions[x].newJsonFormat = parseData;
                        }
                    }  
                }  
            }*/

            for(let i=0; i<this.newSurveys.length; i++){

              if(this.newSurveys[i].Questions){
                  let temlNewSurvey:any = this.newSurveys[i].Questions;
  
                  for(let x=0; x<temlNewSurvey.length; x++){
                      if(temlNewSurvey[x].SchemaXml){
                          let temlxml = temlNewSurvey[x].SchemaXml;
                          let result1:any = convert.xml2json(temlxml, {compact: true, spaces: 4});
                          let parseData = JSON.parse(result1);
                          if(parseData){
                              if(parseData.Field){
                                  if(parseData.Field.CHOICES){
                                      if(parseData.Field.CHOICES.CHOICE){
                                        this.newSurveys[i].Questions[x].forChoice = parseData.Field.CHOICES.CHOICE;
                                      }
                                  }
                              }
                          }
  
                          this.newSurveys[i].Questions[x].newJsonFormat = parseData;
                      }
                  }
              }
          }





            console.log("New survey  : ", this.newSurveys);

        }
        
      })

      this.surveysOld$.subscribe((data) => {
        if(data){
          //console.log(data);
          this.oldSurveys = data;

          for(let i=0; i<this.oldSurveys.length; i++){

            if(this.oldSurveys[i].Questions){
                let temlNewSurvey:any = this.oldSurveys[i].Questions;

                for(let x=0; x<temlNewSurvey.length; x++){
                    if(temlNewSurvey[x].SchemaXml){
                        let temlxml = temlNewSurvey[x].SchemaXml;
                        let result1:any = convert.xml2json(temlxml, {compact: true, spaces: 4});
                        let parseData = JSON.parse(result1);
                        if(parseData){
                            if(parseData.Field){
                                if(parseData.Field.CHOICES){
                                    if(parseData.Field.CHOICES.CHOICE){
                                      this.oldSurveys[i].Questions[x].forChoice = parseData.Field.CHOICES.CHOICE;
                                    }
                                }
                            }
                        }

                        this.oldSurveys[i].Questions[x].newJsonFormat = parseData;
                    }
                }
            }
        }

        console.log("old survey  : ", this.oldSurveys);



          // let dataxml:string = '<?xml version="1.0" encoding="UTF-8"?>'+data[0].Questions[0].SchemaXml;
          // var result1:any = convert.xml2json(dataxml, {compact: true, spaces: 4});
          // let parseData = JSON.parse(result1);
          //   // console.log("xml per : ",parseData.Field.CHOICES.CHOICE );
          //   console.log(parseData);

          // console.log("Old ", data);
         // this.oldSurveys = data;
        }
      })

      this.fromMedia = this.navParams.get('fromMedia');
  }


  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.currLang = 'ar';
        this.surveysAction.surveysNewFetch('ar');
        this.surveysAction.surveysOldFetch('ar');
      }else if(this.direction == 'ltr'){
        this.currLang = 'en';
        this.surveysAction.surveysNewFetch('en');
        this.surveysAction.surveysOldFetch('en');
      }
    });
  }
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

  details(survey){
    // console.log(survey);
   this.navCtrl.push(SurveyDetailsPage, {surveyItem:survey});
    // this.surveysAction.submitSurvey(survey)
  }

  

}
