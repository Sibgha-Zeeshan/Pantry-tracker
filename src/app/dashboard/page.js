"use client";

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";
import { Edit, Delete, Search } from "@mui/icons-material";
import { UserAuth } from "../auth/authcontext";

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  padding: theme.spacing(2),
  textAlign: "center",
  position: "fixed",
  bottom: 0,
  margin: 0,
  left: 0, // Ensure the footer starts at the left edge
  width: "100%", // Full width
  boxSizing: "border-box", // Include padding and border in the element's total width
  
}));

const Dashboard = () => {
  const { userUid } = UserAuth();
  const [Inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const updateInventory = async () => {
    if (userUid) {
      const snapshot = query(collection(firestore, `Inventory-${userUid}`));
      const docs = await getDocs(snapshot);
      const inventoryList = [];
      docs.forEach((doc) => {
        inventoryList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setInventory(inventoryList);
    }
  };

  useEffect(() => {
    if (userUid) {
      updateInventory();
    }
  }, [userUid]);

  const addItem = async (itemName, itemQuantity, itemPrice) => {
    if (userUid) {
      const docRef = doc(firestore, `Inventory-${userUid}`, itemName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { quantity: existingQuantity } = docSnap.data();
        await setDoc(
          docRef,
          {
            quantity: existingQuantity + Number(itemQuantity),
            price: itemPrice,
          },
          { merge: true }
        );
      } else {
        await setDoc(docRef, {
          name: itemName,
          quantity: Number(itemQuantity) || 1,
          price: itemPrice,
        });
      }
      await updateInventory();
      setItemName("");
      setItemQuantity("");
      setItemPrice("");
    }
  };

  const removeItem = async (itemId) => {
    if (userUid) {
      const docRef = doc(firestore, `Inventory-${userUid}`, itemId);
      await deleteDoc(docRef);
      await updateInventory();
    }
  };

  const startEditing = (item) => {
    setEditItem(item);
    setItemName(item.name);
    setItemQuantity(item.quantity);
    setItemPrice(item.price);
  };

  const updateItem = async (id, name, quantity, price) => {
    if (userUid) {
      const docRef = doc(firestore, `Inventory-${userUid}`, id);
      await setDoc(
        docRef,
        { name, quantity: Number(quantity) || 1, price },
        { merge: true }
      );
      await updateInventory();
      setEditItem(null);
      setItemName("");
      setItemQuantity("");
      setItemPrice("");
    }
  };

  const filteredItems = Inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h6" mt={10}>
        Welcome to Pantry Tracker
      </Typography>

      <Container maxWidth="lg" sx={{ marginTop: 4, paddingBottom: 8 }}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          <Card sx={{ flex: 1 }}>
            <CardHeader
              title={editItem ? "Edit Pantry Item" : "Add Pantry Item"}
            />
            <CardContent>
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Box>
                  <Typography variant="body1">Name</Typography>
                  <TextField
                    placeholder="Enter item name"
                    fullWidth
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </Box>
                <Box>
                  <Typography variant="body1">Quantity</Typography>
                  <TextField
                    type="number"
                    placeholder="Enter quantity"
                    fullWidth
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)}
                  />
                </Box>
                <Box>
                  <Typography variant="body1">Price</Typography>
                  <TextField
                    type="number"
                    fullWidth
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (editItem) {
                      updateItem(
                        editItem.id,
                        itemName,
                        itemQuantity,
                        itemPrice
                      );
                    } else {
                      addItem(itemName, itemQuantity, itemPrice);
                    }
                  }}
                >
                  {editItem ? "Save Changes" : "Add Item"}
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 2 }}>
            <CardHeader sx={{ marginBottom: -2 }} title="Pantry Items" />
            <CardContent>
              <TextField
                placeholder="Search items"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  marginBottom: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    padding: "2px 8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    transition: "box-shadow 0.3s",
                    "&:hover": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "6px 8px",
                    fontSize: "0.875rem",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Search
                      sx={{
                        color: "action.active",
                        marginRight: "8px",
                        fontSize: "1.2rem",
                      }}
                    />
                  ),
                }}
              />

              <TableContainer sx={{ maxHeight: 350, overflowY: "auto" }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => startEditing(item)}>
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton onClick={() => removeItem(item.id)}>
                            <Delete color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Container>

      <Footer>
        <Typography variant="body2">© Pantry Tracker 2024</Typography>
      </Footer>
    </Container>
  );
};

export default Dashboard;
