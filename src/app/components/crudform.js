"use client";

import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const CrudForm = ({ open, onClose, item, onSave }) => {
  const [formData, setFormData] = useState(item || {});

  useEffect(() => {
    setFormData(item || {});
  }, [item]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modal}>
        <Typography variant="h6" component="h2">
          {item ? "Edit Item" : "Add New Item"}
        </Typography>
        <TextField
          name="name"
          label="Name"
          value={formData.name || ""}
          onChange={handleChange}
          fullWidth
          sx={styles.textField}
        />
        <TextField
          name="price"
          label="Price"
          value={formData.price || ""}
          onChange={handleChange}
          fullWidth
          sx={styles.textField}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          value={formData.date || ""}
          onChange={handleChange}
          fullWidth
          sx={styles.textField}
        />
        <TextField
          name="seller"
          label="Seller"
          value={formData.seller || ""}
          onChange={handleChange}
          fullWidth
          sx={styles.textField}
        />
        <TextField
          name="image"
          label="Image URL"
          value={formData.image || ""}
          onChange={handleChange}
          fullWidth
          sx={styles.textField}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={styles.button}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
  textField: {
    mt: 2,
  },
  button: {
    mt: 2,
  },
};

export default CrudForm;
