import { Button, Box, Typography, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const MainInformation: React.FC<AuctionItem> = (AuctionItem) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const isAuthenticated = !!cookies.get("token");

  return (
    <Grid container spacing={isSmallScreen ? 2 : 4}>
      <Grid item md={12} lg={6}>
        <img
          src={
            AuctionItem?.photos?.length == 0
              ? "https://placekitten.com/800/400"
              : AuctionItem?.photos[0]
          }
          alt={AuctionItem?.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Grid>

      <Grid item md={12} lg={6}>
        <Box p={isSmallScreen ? 0 : 2}>
          {isAuthenticated && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/edit-lot/${AuctionItem.id}`)}
            >
              Edit lot
            </Button>
          )}
          <Typography variant="body1" align="right" paragraph>
            {AuctionItem?.startPrice}
          </Typography>
          <Typography
            variant={isSmallScreen ? "h5" : "h4"}
            align="left"
            gutterBottom
          >
            {AuctionItem?.name}
          </Typography>
          <Typography
            variant={isSmallScreen ? "body2" : "body1"}
            align="justify"
            paragraph
          >
            {AuctionItem?.description}
          </Typography>
          <Typography
            variant={isSmallScreen ? "body2" : "body1"}
            align="right"
            paragraph
          >
            {`Due date : ${AuctionItem?.endDate.slice(0, 10)}`}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainInformation;
