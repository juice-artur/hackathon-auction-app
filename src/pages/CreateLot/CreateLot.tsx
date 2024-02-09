import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const CreateLot = () => {
  const [lotData, setLotData] = useState({
    title: "",
    description: "",
    startPrice: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    startPrice: false,
    imageUrl: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLotData({
      ...lotData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {
      title: !lotData.title,
      description: !lotData.description,
      startPrice: isNaN(parseFloat(lotData.startPrice)) || parseFloat(lotData.startPrice) < 1,
      imageUrl: !lotData.imageUrl,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      alert("Please fill in all required fields correctly");
      return;
    }

    // Send data to the backend or perform other actions
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100%", marginTop: "20px" }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" gutterBottom>
              Create a New Lot
            </Typography>
            <form onSubmit={handleSubmit}>
              {lotData.imageUrl && (
                <img
                  src={lotData.imageUrl}
                  alt="Preview"
                  style={{ width: "100%", marginTop: "10px" }}
                />
              )}
              <TextField
                name="imageUrl"
                label="Image URL"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={lotData.imageUrl}
                onChange={handleInputChange}
                error={errors.imageUrl}
              />

              <TextField
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={lotData.title}
                onChange={handleInputChange}
                error={errors.title}
              />
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
                value={lotData.description}
                onChange={handleInputChange}
                error={errors.description}
              />
              <TextField
                name="startPrice"
                label="Starting Price"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                required
                value={lotData.startPrice}
                onChange={handleInputChange}
                error={errors.startPrice}
              />

              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Lot
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateLot;