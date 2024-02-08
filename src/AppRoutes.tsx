import { BetHistory } from "./components/BetHistory";
import AuctioneList from "./pages/AuctioneList";

export const AppRoutes = [
  {
    index: true,
    element: <AuctioneList />,
  },
  {
    path: "/bethistory",
    element: <BetHistory />,
  },
];
