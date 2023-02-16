import React, {useState, useEffect} from "react";
// import React, {Component} from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


const NewCountry = (props) => {

    const [showForm, setShowForm ] = useState(false);
    const [countryName, setCountryName] = useState('');

    useEffect(() => {
        setCountryName('');
    }, [showForm]);


    const handleOpen = () => {
        setShowForm(true);
    }

    const handleClose = () => {
        setShowForm(false);
        setCountryName('');
    }

    const saveNewCountry = () => {
        props.onAddCountry(countryName);
        handleClose();
    }

        return (
            <div className="New-Country">
                <Fab variant="contained" color="success" onClick={handleOpen}><AddIcon /></Fab>
                <Dialog open={showForm} onClose={handleClose}>
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
                            onChange={(e) => setCountryName(e.target.value)}
                            fullWidth
                            variant="standard"
                            autoFocus
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={saveNewCountry} disabled={countryName.trim().length === 0 || countryName.match((/^\s*$/))}>Add Country</Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
}

export default NewCountry;