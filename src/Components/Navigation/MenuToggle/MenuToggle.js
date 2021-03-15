import classes from './MenuToggle.module.scss'
import React from 'react'

const MenuToggle=props=>{
    const cls=[
        classes.MenuToggle,
        'fa'
    ]
    if(props.isOpen){
        cls.push('fa-times')
        cls.push(classes.open)
    }else{
        cls.push('fa-bars')
    }
    return(
    <i
    className={cls.join(' ')}
    onClick={props.onToggle}
    />
    )
}
export default MenuToggle
