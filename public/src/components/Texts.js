import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from'@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    }
});

const databaseURL = "https://react-word-3c38c-default-rtdb.firebaseio.com";

class Texts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {},
            dialog: false,
            subject: '',
            content: ''
        }
    }
    handleDialogToggle = () => {
        this.setState({
            dialog: !this.state.dialog
        });
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleSubmit = () => {
        console.log(this.state);
        const text = {
            subject: this.state.subject,
            content: this.state.content
        }
        this.handleDialogToggle();
        if(!text.subject && !text.content) {
            return;
        }
        this.__post(text);
    }

    __post = (text) => {
        return fetch(`${databaseURL}/text.json`, {
            method: 'POST',
            body: JSON.stringify(text)
        })
        .then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            let nextState = this.state.list;
            nextState[data.name] = text;
            this.setState({list: nextState});
        });
    }

    __get = () => {
        fetch(`${databaseURL}/text.json`)
            .then(res => {
                if(res.status != 200){
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(list => this.setState({list: list}));
    }
    componentDidMount = () => {
        this.__get();
    }
    render(){        
        const { classes } = this.props;
        return (
            <div>
                <Card>
                    {Object.keys(this.state.list).map(id => {
                        const text = this.state.list[id];
                        return (
                            <CardContent>
                                {text.subject}
                            </CardContent>
                        );
                    })}                    
                </Card>
                <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
                    <AddIcon></AddIcon>
                </Fab>
                <Dialog open={this.state.dialog}>
                    <DialogTitle>텍스트 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="제목" type="text" name="subject" onChange={this.handleValueChange}></TextField>
                        <br/>
                        <TextField label="내용" type="text" name="content" onChange={this.handleValueChange}></TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={this.handleSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleDialogToggle}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(Texts);