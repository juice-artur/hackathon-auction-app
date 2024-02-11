import React, { FC } from "react";
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
  Avatar, // Додано імпорт для Avatar
} from "@mui/material";

interface TableComponentProps {
  data: Bid[];
}

const BetHistory: FC<TableComponentProps> = ({ data }) => {
  const containerStyle: React.CSSProperties = {
    maxHeight: "300px",
    overflowY: "auto",
  };

  return (
    <Box mt={4} p={2}>
      <Typography variant="h5" mb={2}>
        Betting history
      </Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          type="number"
          label="Введіть ставку"
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}>
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
            {data.map((person) => (
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
