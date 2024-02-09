import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const CreateLot = () => {
  const [isTitleValid, setTitleValid] = useState(true);
  const [isDescriptionValid, setDescriptionValid] = useState(true);
  const [isPriceValid, setPriceValid] = useState(true);
  const [isImageUrlValid, setImageUrlValid] = useState(true);
  const [imageUrlPreview, setImageUrlPreview] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !isTitleValid ||
      !isDescriptionValid ||
      !isPriceValid ||
      !isImageUrlValid
    ) {
      alert("Please fill in all required fields correctly");
      return;
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValid(!!event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionValid(!!event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue = parseFloat(event.target.value);

    if (isNaN(priceValue) || priceValue < 1) {
      setPriceValid(false);
      return;
    }

    setPriceValid(true);
    event.target.value = priceValue.toString();
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = event.target.value;
    setImageUrlPreview(imageUrl);
    setImageUrlValid(!!imageUrl);
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100%", marginTop: "20px" }}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" gutterBottom>
              Create a New Lot
            </Typography>
            <form onSubmit={handleSubmit}>
              {imageUrlPreview && (
                <img
                  src={imageUrlPreview}
                  alt="Preview"
                  style={{ width: "100%", marginTop: "10px" }}
                />
              )}
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleImageUrlChange}
                error={!isImageUrlValid}
              />

              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleTitleChange}
                error={!isTitleValid}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
                onChange={handleDescriptionChange}
                error={!isDescriptionValid}
              />
              <TextField
                label="Starting Price"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                required
                onChange={handlePriceChange}
                error={!isPriceValid}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth>
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
