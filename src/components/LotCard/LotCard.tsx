import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";


const LotCard: React.FC<AuctionItem> = (item) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 250 }} onClick={()=> {navigate(`/auction-info/${item.id}`)}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          width="auto"
          image="https://placekitten.com/800/400"
          alt={item.name}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LotCard;
