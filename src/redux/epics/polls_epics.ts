import { Injectable } from "@angular/core";
import { PollsAction } from "../actions/polls_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, RequestOptions, Headers } from "@angular/http";

@Injectable()
export class PollsEpics{
    constructor(public pollsAction : PollsAction, public http : Http){}

    polls = (action$ : ActionsObservable<any>) => {
        return action$.ofType(PollsAction.POLLS_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload+"/GetAllPollQuestions")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload+"/GetAllPollQuestions")
                .subscribe((data) => {
                    if(data.ok){
                        let pollsData = data.json();     
                        //console.log(pollsData);                   
                        // console.log(pollsData);
                        this.pollsAction.pollsSuccess(pollsData);
                    }
                })
            })
        })
    }


    //submit polls annswers
    submitPollsAns = (action$ : ActionsObservable<any>) => {
        return action$.ofType(PollsAction.SUBMIT_POLL_ANSWER_START)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                //console.log(payload);
                let data = {
                    QuestionId:payload.QuestionId,
                    Answer:payload.Answer
                }
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+ payload.lang+"/SavePollAnswer/"+payload.userid, data, options)
                .subscribe((data:any)=>{
                    if(data._body = "true"){
                        //console.log(data);
                        let reqpollAns = {
                            lang:payload.lang,
                            surveyid:payload.QuestionId
                        }
                        
                        this.pollsAction.fetchPollAns(reqpollAns)
                        // pollsAction
                    }else{

                    }

                },(error=>{
                    console.log("data error is : ", error);
                }))
            })
        })
    }

    //Fetch survey answer
    fetchPollsAnswer = (action$ : ActionsObservable<any>) => {
        return action$.ofType(PollsAction.FETCH_POLL_ANS)
            .mergeMap(({payload}) => {
                return new Observable(() => {
                    /* http://sp2016adv.westeurope.cloudapp.azure.com:2003 */
                    // console.log("submit survet calling ....... .... ... .. ", payload)
                    this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/"+payload.lang+"/GetPollResult/"+payload.surveyid)
                    .subscribe((data:any) => {
                        // if(data.ok == true){
                        let pollsdata:any = data.json();
                        //calculation start for convert 
                        if(pollsdata[0]){
                            if(pollsdata[0].AnswersWithCount){

                                var str = pollsdata[0].AnswersWithCount;
                                var res = str.split("@");
                                
                                var ans = [];
                                var ans2 = [];
                                var tot =0;
                                for(let i=0;i<res.length;i++){
                                    let x = res[i].split(";")[0];
                                  let y = res[i].split(";")[1];
                                  if(x != ""){
                                      let nvalue:any={};
                                      nvalue.name = x;
                                      nvalue.value = parseInt(y);
                                      ans.push(nvalue);
                                      tot = tot+ parseInt(y);
                                  }
                                }
                                
                                 for(let i=0;i<ans.length;i++){
                                  let nvalue:any={};
                                  nvalue = ans[i];
                                  let temppercentage =(ans[i].value/tot)*100; 
                                  nvalue.percentage = temppercentage.toFixed(2)
                                  ans2.push(nvalue)
                                }
                                let temp:any={};
                                temp = pollsdata[0];
                                temp.AnswersWithCount = ans2
                                temp.totalVote = tot;
                                //console.log("poll ans : ", temp);
    
                                this.pollsAction.successPollAns(temp);
    
                            }
                        }



                    })
                })
            })
    }




}