import {Component, OnInit} from '@angular/core';
import {TestService} from "../../../shared/services/test.service";
import {QuizListType} from "../../../../types/quiz-list.type";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {TestResultType} from "../../../../types/test-result.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {
  public quizzes: QuizListType[] = [];
  private testResult: TestResultType[] | null = null;

  constructor(private testService: TestService,
              private authService: AuthService,
              private  router: Router
  ) {
  }

  ngOnInit(): void {
    this.testService.getTests()
      .subscribe((result: QuizListType[]) => {
        this.quizzes = result;
        const userInfo = this.authService.getUserInfo();
        if (userInfo) {
          this.testService.getUserResults(userInfo.userId)
            .subscribe((data: DefaultResponseType | TestResultType[]) => {
              if (data) {
                if ((data as DefaultResponseType).error !== undefined) {
                  throw new Error((data as DefaultResponseType).message)
                }
                const testResult = data as TestResultType[];
                this.quizzes = this.quizzes.map(quiz => {
                  const findItem: TestResultType | undefined = testResult.find(item => item.testId === quiz.id)
                  if (findItem) {
                    quiz.result = findItem.score + '/' + findItem.total
                  }
                  return quiz;
                });
              }
            })
        }
      });
  }

   chooseQuiz(id: number): void {
    this.router.navigate(['/test', id])
  }

}

