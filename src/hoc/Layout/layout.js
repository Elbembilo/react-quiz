import React, {Component} from 'react'
import classes from "./layout.module.scss"
import MenuToggle from '../../../Components/Navigation/MenuToggle/MenuToggle'
import Drawer from "../../../Components/Navigation/Drawer/Drawer";


class Layout extends Component{
    state={
        menu: false
    }

    toggleMenuHandler=()=>{
        this.setState({
            menu: !this.state.menu
        })
    }
    menuCloseHandler=()=>{
        this.setState({
            menu: false
        })
    }

    render(){
        return(
            <div className={classes.layout}>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main className={[classes.main]}>
                    { this.props.children}
                </main>
            </div>
        )
    }
}
export default Layout
