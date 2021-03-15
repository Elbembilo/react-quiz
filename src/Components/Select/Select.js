import classes from './Select module.scss'

const Select= props=>{
    const htmlFor=`${props.label}-${Math.random()}`
    function test(event){
        console.log(event.target.value)
    }
    return(
        <div className={classes.Select}>
            <label htmlFor={htmlFor}>{props.label} </label>
            <select
            id={htmlFor}
            value={props.value}
            onChange={test}
            >
                {props.options.map((option, index) => {
                    return(
                        <option
                        value={props.value}
                        key={index}
                        >
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}
export default Select
