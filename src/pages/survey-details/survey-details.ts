import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertProvider } from '../../providers/alert-provider/alert_provider';
import { SurveysAction } from '../../redux/actions/surveys_action';


@IonicPage()
@Component({
  selector: 'page-survey-details',
  templateUrl: 'survey-details.html',
})
export class SurveyDetailsPage {

  public direction : any;
  public allSurveyQuestion:any;


  public currLang:any
  public newAnswersArray:any={}

  public newcreate:any={};
  public userid:any;
  SurveyListId:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private fb: FormBuilder,
    public alertProvider:AlertProvider,
    public surveysaction:SurveysAction
  ) {
    let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      this.userid = userData.ID;

      let data =this.navParams.get('surveyItem');
      console.log(" Data is : ", data);
      if(data){
        this.allSurveyQuestion = data.Questions
        this.SurveyListId = data.SurveyListId;
      }

      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.currLang = 'en';
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
      }

      this.events.subscribe('dirFrom:submitsurvey', () => {
        //console.log("event calling ...")
        this.events.unsubscribe('dirFrom:submitsurvey');
        setTimeout(() => {
          this.navCtrl.pop();
        }, 1000);
        
        
      })


  }


  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.currLang = 'ar';
      }else if(this.direction == 'ltr'){
        this.currLang = 'en';
      }
    });
    
  }

  surveySelect(survey,type,index,subindex){
   // console.log(survey,type,index,subindex);
  //  console.log(subindex);

    if(type == "Choice"){
      let ee = {
        InternalName: this.allSurveyQuestion[index].InternalName,
        TypeAsString: type,
        Answer: survey
      };
      this.newcreate[index] = ee;
      

    }else if(type == "GridChoice"){
          if(this.newAnswersArray[subindex]){
            delete this.newAnswersArray[subindex]
          }else{
              let subAns={
                Question:survey,
                Answer: subindex+1
              }
              this.newAnswersArray[subindex] = subAns;
          }

        let ee = {
          InternalName: this.allSurveyQuestion[index].InternalName,
          TypeAsString: type,
          AnswersArray: this.newAnswersArray
        }
        
        this.newcreate[index] = ee;

    }else if(type =="Number"){
        let ee = {
          InternalName: this.allSurveyQuestion[index].InternalName,
          TypeAsString: type,
          Answer: survey.value
        };
        this.newcreate[index] = ee;
    }
 
  //  console.log(this.newcreate);

  }

  surveySubmit(){
      let data:any=[];
      for(let key in this.newcreate){
        // console.log(this.newcreate[key].AnswersArray);
        
        if(this.newcreate[key].AnswersArray){
          //console.log("If part .. ",this.newcreate[key].AnswersArray)
            let dd:any=[];
            for(let newkey in this.newcreate[key].AnswersArray){
              dd.push(this.newcreate[key].AnswersArray[newkey])
            }
            let nn={
              InternalName: this.newcreate[key].InternalName,
              TypeAsString: this.newcreate[key].TypeAsString,
              AnswersArray: dd
            }
            data.push(nn);
        }else{
          console.log("else part .. ")
          data.push(this.newcreate[key])
        }    
      }
      // console.log(data);
      let dds ={
        lang:this.currLang,
        ansdata:{
          ListId: this.SurveyListId,
          UserId: this.userid,
          Answers:data
        }

      }
    // console.log(dds);
      this.surveysaction.submitSurvey(dds)
  }


}

// {	
//   "ListId": "a8d18a7d-96ae-48a2-98c0-32527d50017f",
// "UserId": "19",
//   "Answers": [
//     {
//     "Answer": "sdcsdc",
//   "InternalName": "Choose_x0020_an_x0020_answer",
//   "TypeAsString": "Number"
//     }
//   ]
// } 
