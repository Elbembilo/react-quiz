import classes from './FinishedQuiz.module.scss'
import React from 'react'
import Button from "../UI/Button/Button";
import {Link} from 'react-router-dom'


const FinishedQuiz = props => {
    const successCount=Object.keys(props.result).reduce((total,key)=>{
        if(props.result[key]==='success'){
            total++
        }
        return total
    },0)
    return(
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index)=>{
                    const cls=[
                        'fa',
                        props.result[quizItem.id]==='error'?'fa-times':'fa-check',
                        classes[props.result[quizItem.id]]
                        ]
                    return(
                        <li
                        key={index}
                        >
                          <strong>{index+1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                }) }

            </ul>
            <p>правильно {successCount} из {props.quiz.length}</p>
            <div>
                <Button onclick={props.onRetry} type='primary'>Повторить</Button>
                <Link to={'/'}>
                    <Button type='success'>Перейти в список тестов</Button>
                </Link>

            </div>
        </div>
    )
}
export default FinishedQuiz
