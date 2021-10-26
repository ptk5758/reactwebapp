import React from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/core/Menu';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

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
            <div>
                <div className={classes.root}>
                    <AppBar position="static">
                        <IconButton className={classes.menuButton} color="inherit" onClick={this.handleDrawerToggle}>
                            <MenuIcon/>
                        </IconButton>
                    </AppBar>
                    <Drawer open={this.state.toggle}>
                        {/* Link 는 material-ui 라이브러리에 있는거 */}
                        <MenuItem onClick={this.handleDrawerToggle}>                            
                            <Link component={RouterLink} to="/texts">
                                홈 화면
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleDrawerToggle}>                            
                            <Link component={RouterLink} to="/words">
                                텍스트 관리
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleDrawerToggle}>                            
                            <Link component={RouterLink} to="/texts">
                                단어 관리
                            </Link>
                        </MenuItem>
                    </Drawer>
                </div>
                <div id="content" style={{margin: 'auto', marginTop: '20px'}}>
                    {React.cloneElement(this.props.children)}
                </div>
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