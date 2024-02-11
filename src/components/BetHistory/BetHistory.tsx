import React, { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import Cookies from "universal-cookie";

interface TableComponentProps {
  data: Bid[];
  id: string | undefined;
  refreshBids: () => void;
  startPrice: string | undefined;
}

const cookies = new Cookies();
const BetHistory: FC<TableComponentProps> = ({
  data,
  id,
  refreshBids,
  startPrice,
}) => {
  const [betAmount, setBetAmount] = useState<number>(0);
  const [bids, setBids] = useState<Bid[]>(data);
  const [sortedBids, setSortedBids] = useState<Bid[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const containerStyle: React.CSSProperties = {
    maxHeight: "300px",
    overflowY: "auto",
  };

  const handleBet = () => {
    const actualStartPrice =
      startPrice !== undefined ? String(startPrice) : "0";

    if (
      parseFloat(betAmount.toString()) < parseFloat(actualStartPrice) ||
      parseFloat(betAmount.toString()) <
        parseFloat(sortedBids[0]?.price?.toString() || "0")
    ) {
      setValidationError(
        "Bet amount cannot be less than the starting price or the current minimum bid"
      );
      return;
    }

    setValidationError(null);

    fetch("https://auction-api-hvbv.onrender.com/api/v1/bids/place", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + cookies.get("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auctionId: id,
        amount: betAmount,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);

        fetch(
          `https://auction-api-hvbv.onrender.com/api/v1/bids?auctionId=${id}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((updatedData) => {
            refreshBids();
            setBids(updatedData);
          })
          .catch((error) => {
            console.error("Error fetching updated data:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    setBids(data);
  }, [data]);

  useEffect(() => {
    setSortedBids([...bids].sort((a, b) => b.price - a.price));
  }, [bids]);

  return (
    <Box mt={4} p={2}>
      <Typography variant="h5" mb={2}>
        Betting history
      </Typography>

      <Typography variant="body2" color="text.secondary" marginBottom="10px">
        {validationError}
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          type="number"
          label="Enter bet"
          variant="outlined"
          fullWidth
          value={betAmount}
          onChange={(e) => setBetAmount(parseFloat(e.target.value))}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={handleBet}>
          Make a bet
        </Button>
      </Box>

      <TableContainer component={Paper} style={containerStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Bet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBids.map((person) => (
              <TableRow key={person.id}>
                <TableCell>
                  <Avatar
                    alt={`${person.user.firstName} ${person.user.lastName}`}
                    src={person.user.photoBytes}
                  />
                </TableCell>
                <TableCell>{person.user.firstName}</TableCell>
                <TableCell>{person.user.lastName}</TableCell>
                <TableCell>{person.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BetHistory;
