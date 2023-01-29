import React, { Component } from "react";
import { Avatar, Card, Divider, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { yellow } from "@mui/material/colors";

class Country extends Component {
    // Removed and using props encapsulation
    // state = {
    //     name: this.props.country.name,
    //     goldMedalCount: this.props.country.goldMedalCount,
    // }

    render() {
        const myStyle = {
            width: "300px",
            height: "150px",
        }

        // changed all this.state to this.props.country to display from props
        return (
            <Card variant="outlined" style={myStyle} >
                <div className='Country'>
                    <div style={{}}>
                        <strong>{this.props.country.name}</strong>
                    </div>
                    <Divider />
                    <div className="Gold">
                        Gold Medals
                        <Avatar sx={{ bgcolor: yellow[700], width: 50, height: 50 }} ><WorkspacePremiumIcon />{this.props.country.goldMedalCount}</Avatar> 
                        <Fab color="success" size="medium" onClick={() => this.props.onAdd(this.props.country.id)}><AddIcon /></Fab>
                        <Fab color="error" size="medium" onClick={() => this.props.onMinus(this.props.country.id)} disabled={this.props.country.goldMedalCount === 0 ? true: false}><RemoveIcon /></Fab>
                        
                    </div>
                </div>
            </Card>
        );
    }
}

export default Country