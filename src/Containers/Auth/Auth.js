import {Component} from 'react'
import classes from './Auth.module.scss'
import Button from "../../Components/UI/Button/Button";
import Input from '../../Components/UI/Input/Input'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends Component{

    state = {
        isFormValid:false,
        formControls:{
            email:{
                value: '',
                type:'email',
                label:'Email',
                errorMessage:'Введите корректный email',
                valid: false,
                touched:false,
                validation:{
                    required: true,
                    email:true
                }
            },
            password:{
                value: '',
                type:'password',
                label:'Пароль',
                errorMessage:'Введите корректный пароль',
                valid: false,
                touched:false,
                validation:{
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    RegisterHandler = () => {

    }
    loginHandler = () => {

    }

    validateControl(value, validation){
        if (!validation){
            return true
        }
        let isValid=true
        if (validation.required){
            isValid=value.trim() !=='' && isValid
        }
        if (validation.email){
            isValid=validateEmail(value) && isValid
        }
        if (validation.minLength){
            isValid = value.length>= validation.minLength && isValid
        }
        return isValid
    }
    submitHandler = event => {
        event.preventDefault()
    }
    onChangeHandler = (event, controlName) =>{
        console.log(`${controlName}: `, event.target.value)
        const formControls={...this.state.formControls}
        const control={...formControls[controlName]}

        control.value=event.target.value
        control.touched=true
        control.valid=this.validateControl(control.value, control.validation)

        formControls[controlName]=control

        let isFormValid = true
        Object.keys(formControls).forEach(name=>{
            isFormValid=formControls[name].valid && isFormValid
        })

        this.setState({formControls, isFormValid})
    }

    renderInputs(){
        return Object.keys(this.state.formControls).map((controlName, index)=>{
            const control= this.state.formControls[controlName]
            return(
                <Input
                    key={controlName+index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event=> this.onChangeHandler(event, controlName)}
                />
            )
        })

    }
    render(){
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button
                            type='success'
                            onclick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                            >
                            Войти
                        </Button>
                        <Button
                            type='primary'
                            onclick={this.RegisterHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
