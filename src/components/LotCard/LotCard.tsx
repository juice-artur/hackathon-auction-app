import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick: () => void; //change the page to a detailed description of the lot
}

const LotCard: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  onClick,
}) => {
  return (
    <Card sx={{ maxWidth: 250 }} onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          width="auto"
          image={imageUrl}
          alt={title}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LotCard;
