import React from 'react'
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
  createTheme,
  ThemeProvider,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from 'react';
import { collection, deleteDoc, Firestore, getDoc, getDocs, query, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';
import {
  AddShoppingCart,
  Edit,
  Delete,
  Logout,
  AccountCircle,
  Search,
} from "@mui/icons-material";

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  padding: theme.spacing(2),
  textAlign: "center",
  position: "fixed",
  bottom: 0,
  margin: 0,
  width: "100%",
}));

const Dashboard = () => {
    const [Inventory, setInventory] = useState([]);
    const [open, setOpen] = useState(false);
    const [itemName, setItemName] = useState('');

    const addItem = async (item) => {
        const docRef = doc(collection(firestore, 'Inventory', item))
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const {quantity} = docSnap.data()
            await setDoc(docRef, {quantity: quantity + 1})
        }
        else {
          await setDoc(docRef, {quantity:1 })
        }
        await updateInventory()
        }
    

    const updateInventory = async () => {
        const snapshot = query(collection(firestore, 'Inventory'))
        const docs = await getDocs(snapshot)
        const inventoryList = []
        docs.forEach((doc) => {
            inventoryList.push(
                {
                    name : doc.id,
                    ...doc.data(),
                }
            )
        })
        setInventory(inventoryList)
        console.log(inventoryList)
    }

    const removeItem = async (item) => {
      const docRef = doc(collection(firestore, "Inventory", item));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
      await updateInventory();
    };
    
    useEffect(()=>{
        updateInventory()
    }, [])

    const handleOpen = () => setOpen(true)
    const handleClosed = () => setOpen(false)

  return (
    <Container>
      <Typography variant="h6" mt={10}>
        Welcome to Pantry Tracker
      </Typography>

      {/* Container started------------------------------------------------------------- */}

      <Container maxWidth="lg" sx={{ marginTop: 4, paddingBottom: 8 }}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          <Card sx={{ flex: 1 }}>
            <CardHeader />
            <CardContent>
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Box>
                  <Typography variant="body1">Name</Typography>
                  <TextField placeholder="Enter item name" fullWidth />
                </Box>
                <Box>
                  <Typography variant="body1">Quantity</Typography>
                  <TextField
                    type="number"
                    placeholder="Enter quantity"
                    fullWidth
                  />
                </Box>
                <Box>
                  <Typography variant="body1">Expiration Date</Typography>
                  <TextField type="date" fullWidth />
                </Box>
                <Box>
                  <Typography variant="body1">price</Typography>
                  <TextField placeholder="Enter item name" fullWidth />
                </Box>
                <Button variant="contained" color="primary"> Add Item </Button>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 2 }}>
            <CardHeader sx={{ marginBottom: -2 }} title="Pantry Items" />
            <CardContent>
              <TextField
                placeholder="Search items"
                fullWidth
                sx={{
                  marginBottom: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px", // Rounded corners
                    padding: "2px 8px", // Adjust padding for reduced height
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Subtle shadow
                    transition: "box-shadow 0.3s",
                    "&:hover": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)", // Enhanced shadow on hover
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)", // Enhanced shadow on focus
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "6px 8px", // Adjust input padding for better height
                    fontSize: "0.875rem", // Reduce font size for better balance
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
                      <TableCell>Expiration</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key="id">
                      <TableCell>item name</TableCell>
                      <TableCell>item quantity</TableCell>
                      <TableCell>item price</TableCell>
                      <TableCell>
                        <IconButton>
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton>
                          <Delete color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Container Ended---------------------------------------------------------------- */}
      <Footer>
        <Typography variant="body2">© Pantry Tracker 2024</Typography>
      </Footer>
    </Container>
  );
};

export default Dashboard;
