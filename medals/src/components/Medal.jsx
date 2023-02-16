import React from "react";
import { Avatar, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const Medal = (props) => {

        const { id, medalCount, medalType, medalColor, onAdd, onMinus } = props;

        return (
            <div className="Medals">
                <strong>{medalType} Medals</strong>
                <Avatar sx={{ bgcolor: medalColor, width: 50, height: 50 }} ><WorkspacePremiumIcon />{medalCount}</Avatar>
                <Fab color="success" size="medium" onClick={() => onAdd(id, medalType)}><AddIcon /></Fab>
                <Fab color="error" size="medium" onClick={() => onMinus(id, medalType)} disabled={medalCount === 0 ? true : false}><RemoveIcon /></Fab>
            </div>
        );
}
export default Medal