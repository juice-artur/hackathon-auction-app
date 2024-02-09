import { Paper, Container } from "@mui/material"
import MainInformation from "../../components/MainInformation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AuctionInfo = () => {

    const {id} = useParams();
    const [auctionItem, setAuctionItem] =  useState<AuctionItem>();

    useEffect(() => {
      fetch(`https://auction-api-hvbv.onrender.com/api/v1/auctions/get-by-id?id=${id}`)
        .then(response => response.json())
        .then((data) => {
          setAuctionItem(data);
  
        });
    }, []);
    return (
        <Container  sx = {{maxWidth :"lg"}} >
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
    
            {auctionItem && <MainInformation {...auctionItem} />}
            </Paper>
        </Container>
    )
}

export default AuctionInfo;