import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';

// Import the Countdown Timer Module
import { CountdownTimerModule } from 'angular-countdown-timer';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users/users.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgradecimientoComponent } from './agradecimiento/agradecimiento.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    UsersComponent,
    AgradecimientoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CountdownTimerModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
