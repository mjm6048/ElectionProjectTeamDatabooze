import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";


const CreateSociety = () => {
  const [societyName, setSocietyName] = useState("");
  const [societyDescription, setSocietyDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adtoken");
      const response = await axios.post(
        "http://localhost:5001/societies",
        {
          societyName,
          societyDescription
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create Society
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="societyName"
              label="Society Name"
              variant="outlined"
              fullWidth
              value={societyName}
              onChange={(e) => setSocietyName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="societyDescription"
              label="Society Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={societyDescription}
              onChange={(e) => setSocietyDescription(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Create Society
        </Button>
      </form>
    </Container>
  );
};

export default CreateSociety;
