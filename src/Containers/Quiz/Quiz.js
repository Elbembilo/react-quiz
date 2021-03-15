import {Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from '../../Components/FinishedQuiz/finishedQuiz.js'

class Quiz extends Component {
    state={
        result:{},
        isFinished: false,
        activeQuestion:0,
        answerState:null,
        quiz:[
            {
                question:'Какого цвета небо?',
                rightAnswerId: 2,
                id:1,
                answers:[
                    {text:'Черный', id:1},
                    {text:'Синий', id:2},
                    {text:'Красный', id:3},
                    {text:'Зеленый', id:4},
                ]
            },
            {
                question:'Год создания Санкт-Петербурга?',
                rightAnswerId: 3,
                id:2,
                answers:[
                    {text:'1700', id:1},
                    {text:'1702', id:2},
                    {text:'1703', id:3},
                    {text:'1803', id:4},
                ]
            }
        ]
    }
    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const result = this.state.result

        if (question.rightAnswerId === answerId) {
            if (!result[question.id]) {
                result[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                result
            })
        } else {
            result[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                result
            })
        }
        const timeout = window.setTimeout(() => {
            if (this.isQuizFinished()) {
                this.setState({
                    isFinished: true
                })
            } else {
                this.setState({
                    activeQuestion: this.state.activeQuestion + 1,
                    answerState: null
                })
            }
            window.clearTimeout(timeout)
        }, 1000)
    }
    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    retryHandler = () => {
        this.setState({
            activeQuestion:0,
            answerState: null,
            isFinished: false,
            result:{}
        })
    }
    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1 className={classes.h1}>Ответьте на все вопросы.</h1>
                    {
                        this.state.isFinished?
                            <FinishedQuiz
                                result={this.state.result}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            :<ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                answerLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}
export default Quiz
