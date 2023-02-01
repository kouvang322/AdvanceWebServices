import React, { Component } from "react";
import { Card, Divider } from "@mui/material";
import Medal from "./Medal";

class Country extends Component {

    render() {
        const myStyle = {
            width: "300px",
            height: "100%",
            padding: "5px"
        }

        const { id, name, gold, silver, bronze, onAdd, onMinus } = this.props;

        // changed all this.props to use the consts defined above
        return (
            <Card variant="outlined" style={myStyle} >

                <div className='Country'>
                    <div style={{}}>
                        <strong>{name}</strong>
                    </div>
                    <Divider />
                    <Medal
                        id={id}
                        medalCount = {gold}
                        medalType = {"gold"}
                        onAdd={onAdd}
                        onMinus={onMinus}
                    />
                    <Medal
                        id={id}
                        medalCount = {silver}
                        medalType = {"silver"}
                        onAdd={onAdd}
                        onMinus={onMinus}
                    />
                    <Medal
                        id={id}
                        medalCount = {bronze}
                        medalType = {"cb8c47"}
                        onAdd={onAdd}
                        onMinus={onMinus}
                    />
                   

                </div>
                {/* for bronze <Medal name={name} /> */}
                {/* something similar how we are passing Country component */}

            </Card>
        );
    }
}

export default Country