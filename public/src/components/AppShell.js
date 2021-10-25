import React from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/core/Menu';

class AppShell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }
    handleDrawerToggle = () => this.setState({toggle: !this.state.toggle});
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <AppBar position="static">
                    <IconButton className={classes.menuButton} color="inherit" onClick={this.handleDrawerToggle}>
                        <MenuIcon/>
                    </IconButton>
                </AppBar>
                <Drawer open={this.state.toggle}>
                    <MenuItem onClick={this.handleDrawerToggle}>Home</MenuItem>
                    <MenuItem onClick={this.handleDrawerToggle}>Home2</MenuItem>
                </Drawer>
            </div>
        );
    }

}

const styles = {
    root: {
        flexGrow: 1,        
    },
    menuButton : {
        marginRight: 'auto'
    }
}

export default withStyles(styles)(AppShell);