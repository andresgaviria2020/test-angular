import { Component, OnInit, ViewChild } from '@angular/core';

import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import { ExcelReportService } from '../services/excel-report.service';
import { GuardarQuizService } from '../services/guardar-quiz.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quizes: any[];
  reporteFinal: any[];
  quiz: Quiz = new Quiz(null);
  date: any;
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    //'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  fileToUpload: File = null;
  a:number =0;

  @ViewChild('crearActividad', {static: true}) modal: any;

  constructor(private quizService: QuizService, private exportService: ExcelReportService,private saveService: GuardarQuizService,private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
    this.date = new Date();
    if(localStorage.getItem("nombre")==null){
      this.router.navigate(['informacionUsuario']); 
    }
    if(localStorage.getItem("correo")==null){
      this.router.navigate(['informacionUsuario']); 
    }
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
    //  this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
  /*  if (diff >= this.config.duration) {
      this.onSubmit();
    }*/
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Respondido' : 'No respondido';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  onSubmit() {
    let answers = [];
    let answersReport = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

   // console.log(this.quiz.questions);
    this.a=0;
    for (let i = 0; i < this.quiz.questions.length; i++){
        for (let a = 0; a < this.quiz.questions[i].options.length; a++){
              if(this.quiz.questions[i].options[a].selected == true){
                answersReport = [
                        ...answersReport,{Pregunta:this.quiz.questions[i].name,Respuesta:this.quiz.questions[i].options[a].name, Correcto: this.quiz.questions[i].options[a].isAnswer}
                      ]
                      this.a++;
              }
        } 
    }

    var fecha2 = moment(new Date());
    var fecha1 = moment(this.date.getTime());

    if(this.a==this.quiz.questions.length){
      this.fileToUpload = this.exportService.exportExcel(answersReport,"prueba");
      const formData = new FormData();
      formData.append('nombre', localStorage.getItem("nombre"));
      formData.append('email',  localStorage.getItem("correo"));
      formData.append('tiempo', (fecha2.diff(fecha1, 'hours') + "h:" + fecha2.diff(fecha1, 'minutes') + "m:" +fecha2.diff(fecha1, 'seconds')+"s"));
      formData.append('file', this.fileToUpload,localStorage.getItem("nombre")+ "_" +new Date()+ "quiz2" +'.xlsx');
      this.saveService.saveData(formData)
      localStorage.clear();
      this.router.navigate(['agradecimiento']); 
    }else{
      this.toastr.warning("Todas las preguntas son obligatorias");
    }
  //  console.log(this.saveService.saveData(formData));
    //this.fileToUpload = "prueba";
      //this.exportService.exportExcel(answersReport,"prueba");
  }
}
