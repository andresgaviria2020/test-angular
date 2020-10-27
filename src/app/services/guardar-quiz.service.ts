import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class GuardarQuizService {

  constructor(private http: HttpClient) { }

  saveData(datosQuiz :FormData) {
    return this.http.post<any>(`Link de https://getform.io/f/`, datosQuiz).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  } 
}
