import classes from './Button.module.scss'

const Button=props=>{
    const cls=[
        classes.button,
        classes[props.type]
        ]
    return(
    <button
    onClick={props.onclick}
    className={cls.join(' ')}
    disabled={props.disabled}
    >
        {props.children}
    </button>
    )
}
export default Button
