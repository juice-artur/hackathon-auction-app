import { BetHistory } from "./components/BetHistory";
import AuctioneList from "./pages/AuctioneList";
import AuctionInfo from "./pages/AuctionInfo";

export const AppRoutes = [
  {
    index: true,
    element: <AuctioneList />,
  },
  {
    path: "/auction-info/:id",
    element: <AuctionInfo />,
  },
  {
    path: "/bethistory",
    element: <BetHistory />,
  },
];
