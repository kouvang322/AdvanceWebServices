// import React, { Component } from "react";
import { Card, Divider, Button, Badge, IconButton } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Medal from "./Medal";
import { Delete } from "@mui/icons-material";

const Country = (props) => {

        const myStyle = {
            width: "300px",
            height: "100%",
            padding: "5px"
        }

        const { id, name, gold, silver, bronze, onAdd, onMinus, onStripMedals, onDeleteCountry, canDelete, canPatch } = props;

        return (
            <Card variant="outlined" style={myStyle} >

                <div className='Country'>
                    <div className="Country-Title">
                        <Badge
                            badgeContent={gold + silver + bronze}
                            color="primary"
                            showZero
                        >
                            <strong>{name} <EmojiEventsIcon /></strong>
                        </Badge>
                        { canDelete && <IconButton color="error" size="small" onClick={() => onDeleteCountry(id)}><Delete /></IconButton>}
                    </div>
                    <Divider />
                    <Medal
                        id={id}
                        medalCount={gold}
                        medalType={"Gold"}
                        medalColor={"gold"}
                        canPatch={ canPatch }
                        onAdd={onAdd}
                        onMinus={onMinus}
                    />
                    <Medal
                        id={id}
                        medalCount={silver}
                        medalType={"Silver"}
                        medalColor={"#adb5bd"}
                        canPatch={ canPatch }
                        onAdd={onAdd}
                        onMinus={onMinus}
                    />
                    <Medal
                        id={id}
                        medalCount={bronze}
                        medalType={"Bronze"}
                        medalColor={"#cb8c47"}
                        canPatch={ canPatch }
                        onAdd={onAdd}
                        onMinus={onMinus}
                    />
                    <Divider />
                    <div className="Medals">
                    <Button variant="contained" color="error" size="medium" onClick={() => onStripMedals(id)}>Strip Country of all Medals</Button>
                    </div>
                </div>
            </Card>
        );
}

export default Country;