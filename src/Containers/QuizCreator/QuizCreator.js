import React,{Component} from 'react'
import classes from './QuizCreator.module.scss'
import Button from "../../Components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../Form/formFramework";
import Input from '../../Components/UI/Input/Input'
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../Components/Select/Select";
import axios from 'axios'

function createOptionControl(number){
    return createControl({
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым',
            id: number
    },{required: true}
    )
}
function createFormControls(){
    return{
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым',
        },{required: true}),
        option1: createOptionControl(1),
        option2:createOptionControl(2),
        option3:createOptionControl(3),
        option4:createOptionControl(4),
    }
}

export default class QuizCreator extends Component{
    state={
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }


    submitHandler=event=>{
        event.preventDefault()
    }
    addQuestionHandler = event => {
        event.preventDefault()
        const quiz=this.state.quiz.concat()
        const index = quiz.length+1
        const {question, option1, option2, option3, option4}=this.state.formControls
        const questionItem= {
            question:question.value,
            id:index,
            rightAnswerId: this.state.rightAnswerId,
            answers:[
                {text:option1.value, id:option1.id},
                {text:option2.value, id:option2.id},
                {text:option3.value, id:option3.id},
                {text:option4.value, id:option4.id},
            ]
        }
        console.log(questionItem)
        quiz.push(questionItem)
        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }
    createQuizHandler = async event => {
        event.preventDefault()
        // axios.post('https://learn-react-a4a1f-default-rtdb.europe-west1.firebasedatabase.app/quizes.json', this.state.quiz).then(response=>{
        //     console.log(response)
        // })
        //     .catch(error=>console.log(error))
        // console.log(this.state.quiz)
        try{
            const responce = await axios.post('https://learn-react-a4a1f-default-rtdb.europe-west1.firebasedatabase.app/quizes.json', this.state.quiz)
            console.log(responce.data)
        } catch (e) {
            console.log(e)
        }
    }
    onChangeInput = (value, controlName) => {
        const formControls={...this.state.formControls}
        const control={...formControls[controlName]}

        control.touched= true
        control.value= value
        control.valid= validate(control.value, control.validation)
        formControls[controlName]=control

        this.setState({
            formControls,
            isFormValid:validateForm(formControls)
        })
    }
    renderInputs(){
        return Object.keys(this.state.formControls).map((controlName, index)=>{
            const control= this.state.formControls[controlName]

            return(
                <Auxiliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event=>this.onChangeInput(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr /> : null }
                </Auxiliary>
            )
        })
    }

    selectChangeHandler= event =>{
        console.log(event.target.value)
        this.setState({
            rightAnswerId: +event.target.value
        })
        // console.log(this.state.rightAnswerId)
    }

    render(){
        const select=<Select
            label='Выберите  правильный ответ'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return(
            <div className={classes.QuizCreator}>
                <div className={classes.container}>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        {select}
                        <Button
                            type='primary'
                            onclick={this.addQuestionHandler}
                                disabled={!this.state.isFormValid}
                        >
                        Добавить вопрос
                        </Button>
                        <Button
                            type='success'
                            onclick={this.createQuizHandler}
                             disabled={this.state.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
