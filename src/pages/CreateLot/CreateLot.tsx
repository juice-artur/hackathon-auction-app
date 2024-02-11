import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";

const cookies = new Cookies();

const CreateLot: React.FC<{ isEdit?: boolean }> = ({ isEdit }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [lotData, setLotData] = useState({
    name: "",
    description: "",
    startPrice: "",
    photos: [""],
    endDate: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    description: false,
    startPrice: false,
    imageUrl: false,
    endDate: false,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "photos") {
      setLotData({
        ...lotData,
        [name]: [value],
      });
    } else {
      setLotData({
        ...lotData,
        [name]: value,
      });
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      name: !lotData.name,
      description: !lotData.description,
      startPrice:
        isNaN(parseFloat(lotData.startPrice)) ||
        parseFloat(lotData.startPrice) < 1,
      imageUrl: lotData.photos.length === 0 || !lotData.photos[0],
      endDate: !lotData.endDate,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      alert("Please fill in all required fields correctly");
      return;
    }

    setLoading(true);
    if (isEdit) {
      fetch("https://auction-api-hvbv.onrender.com/api/v1/auctions/edit", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...lotData,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          navigate(`/auction-info/${id}`);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => setLoading(false));
    } else
      fetch("https://auction-api-hvbv.onrender.com/api/v1/auctions/create", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: lotData.name,
          description: lotData.description,
          startPrice: lotData.startPrice,
          photos: lotData.photos,
          endDate: lotData.endDate,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response?.json();
        })
        .then((data) => {
          navigate("/");
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://auction-api-hvbv.onrender.com/api/v1/auctions/get-by-id?id=${id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          setLotData(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, []);

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
              {lotData.photos[0] && (
                <img
                  src={lotData.photos[0]}
                  alt="Preview"
                  style={{ width: "100%", marginTop: "10px" }}
                />
              )}
              <TextField
                name="photos"
                label="Image URLs"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
                value={lotData.photos.join("\n")}
                onChange={handleInputChange}
                error={errors.imageUrl}
              />
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={lotData.name}
                onChange={handleInputChange}
                error={errors.name}
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
              <TextField
                name="endDate"
                label="End Date"
                variant="outlined"
                fullWidth
                margin="normal"
                type="datetime-local"
                required
                value={lotData.endDate}
                onChange={handleInputChange}
                error={errors.endDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {isEdit ? "Edit lot" : "Create Lot"}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateLot;
