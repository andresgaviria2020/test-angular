import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users/users.component';
import { QuizComponent } from './quiz/quiz.component';
import { AgradecimientoComponent } from './agradecimiento/agradecimiento.component';

const routes: Routes = [
  { path: '', component: UsersComponent},
  { path: 'informacionUsuario', component: UsersComponent},
  { path: 'quiz', component: QuizComponent},
  { path: 'agradecimiento', component: AgradecimientoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
