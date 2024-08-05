"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import theme from "../styles/theme";

const PantryItemCard = ({ item, onEdit, theme }) => {
  return (
    <Card sx={{ maxWidth: 250, m: 1 }}>
      <CardMedia
        component="img"
        height="100"
        image={item.image}
        alt={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="theme.text.secondary">
          Price: ${item.price}
        </Typography>
        <Typography variant="body2" color="theme.text.secondary">
          Date: {item.date}
        </Typography>
        <Typography variant="body2" color="theme.text.secondary">
          Seller: {item.seller}
        </Typography>
        <Button variant="outlined" sx={{ mt: 1 }} onClick={() => onEdit(item)}>
          Edit
        </Button>
      </CardContent>
    </Card>
  );
};

export default PantryItemCard;
