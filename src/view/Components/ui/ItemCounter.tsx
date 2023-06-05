import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { FC } from "react";

interface Props {
  quantity: number;
  maxQuantity: number;
  changeQuantity: (size: number) => void;
}

const ItemCounter: FC<Props> = ({ quantity, changeQuantity, maxQuantity }) => {

  const updateValue = (newQuantity: number) => {
    if (newQuantity > maxQuantity || newQuantity < 1) return;
    changeQuantity(newQuantity);
  }


  return (
    <Box display="flex" alignItems="center" flexDirection="row">
      <IconButton onClick={() => updateValue(quantity - 1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>
        {quantity ? quantity : 1}
      </Typography>
      <IconButton onClick={() => updateValue(quantity + 1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};

export default ItemCounter;
