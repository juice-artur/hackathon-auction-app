import { BetHistory } from "./components/BetHistory";
import AuctioneList from "./pages/AuctioneList";
import AuctionInfo from "./pages/AuctionInfo";

export const AppRoutes = [
  {
    index: true,
    element: <AuctioneList />,
  },
  {
    path: "/auction-list",
    element: <AuctionInfo />,
  },
  {
    path: "/bethistory",
    element: <BetHistory />,
  },
];
