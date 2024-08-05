"use client";

import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { UserAuth } from "./authcontext";
import { useRouter } from "next/navigation";


const GoogleSignUp = () => {
  const { user, googleSignIn } = UserAuth();
  const router = useRouter();

  console.log(user);
  const handleSignUp =  async () => {
     try {
       await googleSignIn();
       router.push("/"); // Redirect to the homepage
     } catch (error) {
       console.log(error);
     }

  };
  
  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Box sx={styles.glassCard}>
        <Typography variant="h2" gutterBottom>
          Welcome to Pantry Tracker
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sign up with your Google account to get started and get a hold of your pantry items
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={styles.button}
          onClick={handleSignUp}
        >
          Sign Up with Google
        </Button>
      </Box>
    </Container>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e0e0e0, #f5f5f5)",
  },
  glassCard: {
    padding: 4,
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.15)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    textAlign: "center",
  },
  button: {
    marginTop: 2,
  },
};

export default GoogleSignUp;
