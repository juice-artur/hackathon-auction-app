import { Paper, Container } from "@mui/material";
import MainInformation from "../../components/MainInformation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BetHistory from "../../components/BetHistory/BetHistory";

const AuctionInfo = () => {
  const { id } = useParams();
  const [auctionItem, setAuctionItem] = useState<AuctionItem>();
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make two separate fetch requests
        const response1 = await fetch(
          `https://auction-api-hvbv.onrender.com/api/v1/auctions/get-by-id?id=${id}`
        );
        const response2 = await fetch(
          `https://auction-api-hvbv.onrender.com/api/v1/bids?auctionId=${id}`
        );

        // Check if both responses are successful
        if (!response1.ok || !response2.ok) {
          throw new Error("Failed to fetch data");
        }

        // Parse response data
        const data1 = await response1.json();
        const data2 = await response2.json();

        // Update state variables
        setAuctionItem(data1);
        setBids(data2);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    // Call the function to fetch data
    fetchData();

    // Cleanup function (optional)
    return () => {
      // Perform cleanup if necessary
    };
  }, []);

  return (
    <Container sx={{ maxWidth: "lg" }}>
      <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
        {auctionItem && <MainInformation {...auctionItem} />}

        <BetHistory data={bids} />
      </Paper>
    </Container>
  );
};

export default AuctionInfo;
