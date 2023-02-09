import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField } from "@mui/material";
import { Component } from "react";
import AddIcon from '@mui/icons-material/Add';

class NewCountry extends Component {
    state = {
        openDialog: false,
        countryName: '',
    }

    handleOpen = () => {
        this.setState({ openDialog: true });
    }

    handleClose = () => {
        this.setState({ openDialog: false });
        this.setState({countryName: ''});
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    saveNewCountry = () => {
        const countryName = this.state.countryName;
        this.props.onAddCountry(countryName);
        this.handleClose();
    }

    handleNameChange = () => {
        console.log("add");
    }

    render() {
        const { openDialog, countryName } = this.state;
        return (
            <div className="New-Country">
                <Fab variant="contained" color="success" onClick={this.handleOpen}><AddIcon /></Fab>
                <Dialog open={openDialog} onClose={this.handleClose}>
                    <DialogTitle><b>Add Country</b></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To add a new country, enter country name.<br/>
                        </DialogContentText>
                        <TextField
                            id="countryName"
                            name="countryName"
                            margin="dense"
                            label="Country Name"
                            type="text"
                            value={countryName}
                            onChange={this.handleChange}
                            fullWidth
                            variant="standard"
                            autoFocus
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={this.saveNewCountry} disabled={countryName.trim().length === 0 || countryName.match((/^\s*$/))}>Add Country</Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }

}

export default NewCountry