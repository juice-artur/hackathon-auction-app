import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LotCard from "../../components/LotCard";

const AuctioneList = () => {
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([]);

  useEffect(() => {
    fetch("https://auction-api-hvbv.onrender.com/api/v1/auctions/all")
      .then((response) => response.json())
      .then((data) => {
        setAuctionItems(data);
      });
  }, []);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={4}
      justifyContent="center"
      marginTop="20px">
      {auctionItems.map((data, index) => (
        <LotCard key={index} {...data} />
      ))}
    </Box>
  );
};

export default AuctioneList;
