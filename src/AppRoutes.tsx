import { BetHistory } from "./components/BetHistory";
import AuctioneList from "./pages/AuctioneList";
import AuctionInfo from "./pages/AuctionInfo";

export const AppRoutes = [
  {
    index: true,
    element: <AuctionInfo />,
  },
  {
    path: "/auction-list",
    element: <AuctioneList />,
  },
  {
    path: "/bethistory",
    element: <BetHistory />,
  },
];
