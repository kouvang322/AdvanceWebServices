import React, { Component } from "react";
import { Avatar, Card, Divider, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { yellow } from "@mui/material/colors";

class Country extends Component {
    state = {
        name: this.props.name,
        goldMedalCount: this.props.goldMedalCount,
    }

    handleAdd = () => {
        // checking current gold count before adding 1
        // console.log(this.state.gold);

        // adding one to the current gold count
        this.setState({ goldMedalCount: this.state.goldMedalCount + 1 });
    }

    handleMinus = () =>{
        // checking if function is connected to button
        // console.log("minus");

        // minus 1 from gold medal count
        this.setState({ goldMedalCount: this.state.goldMedalCount - 1})
    }

    render() {
        const myStyle = {
            width: "300px",
            height: "150px",
        }

        return (
            <Card variant="outlined" style={myStyle} >
                <div className='Country'>
                    <div style={{}}>
                        <strong>{this.state.name}</strong>
                    </div>
                    <Divider />
                    <div className="Gold">
                        Gold Medals
                        <Avatar sx={{ bgcolor: yellow[700], width: 50, height: 50 }} ><WorkspacePremiumIcon />{this.state.goldMedalCount}</Avatar> 
                        <Fab color="success" size="medium" onClick={this.handleAdd}><AddIcon /></Fab>
                        <Fab color="error" size="medium" onClick={this.handleMinus} disabled={this.state.goldMedalCount === 0 ? true: false}><RemoveIcon /></Fab>
                        
                    </div>
                </div>
            </Card>
        );
    }
}

export default Country