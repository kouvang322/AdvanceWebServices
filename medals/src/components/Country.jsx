import React, { Component } from "react";
import { Avatar, Card, Divider, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { yellow } from "@mui/material/colors";

class Country extends Component {
    state = {
        name: 'United States',
        gold: 0,
    }

    handleClick = () => {
        // checking current gold count before adding 1
        // console.log(this.state.gold);

        // adding one to the current gold count
        this.setState({ gold: this.state.gold + 1 });
    }

    render() {
        const myStyle = {
            width: "300px",
            height: "125px",
        }

        return (
            <Card variant="outlined" style={myStyle} >
                <div className='Country'>
                    <div style={{}}>
                        <strong>{this.state.name}</strong>
                    </div>
                    <Divider />
                    <div className="Gold">
                        Gold Medals:<Avatar sx={{ bgcolor: yellow[700], width: 50, height: 50 }} ><WorkspacePremiumIcon />{this.state.gold}</Avatar> <Fab color="success" size="medium" onClick={this.handleClick}><AddIcon /></Fab>
                    </div>
                </div>
            </Card>

        );
    }
}

export default Country