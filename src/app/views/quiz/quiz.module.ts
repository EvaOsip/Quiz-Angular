import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { AnswersComponent } from './answers/answers.component';
import { ResultComponent } from './result/result.component';
import { TestComponent } from './test/test.component';
import { ChoiceComponent } from './choice/choice.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AnswersComponent,
    ResultComponent,
    TestComponent,
    ChoiceComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    QuizRoutingModule
  ]
})
export class QuizModule { }
