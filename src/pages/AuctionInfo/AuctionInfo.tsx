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
        const response1 = await fetch(
            `https://auction-api-hvbv.onrender.com/api/v1/auctions/get-by-id?id=${id}`
        );
        const response2 = await fetch(
            `https://auction-api-hvbv.onrender.com/api/v1/bids?auctionId=${id}`
        );

        if (!response1.ok || !response2.ok) {
          throw new Error("Failed to fetch data");
        }

        const data1 = await response1.json();
        const data2 = await response2.json();

        setAuctionItem(data1);
        setBids(data2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
    };
  }, []);

  const refreshBids = () => {
    fetch(`https://auction-api-hvbv.onrender.com/api/v1/bids?auctionId=${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((updatedData) => {
          setBids(updatedData);
        })
        .catch((error) => {
          console.error("Error fetching updated data:", error);
        });
  };

  return (
      <Container sx={{ maxWidth: "lg" }}>
        <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
          {auctionItem && <MainInformation {...auctionItem} />}

          <BetHistory data={bids} id={id} refreshBids={refreshBids} />
        </Paper>
      </Container>
  );
};

export default AuctionInfo;