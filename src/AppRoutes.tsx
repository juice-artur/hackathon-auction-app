// import { BetHistory } from "./components/BetHistory";
import AuctioneList from "./pages/AuctioneList";
import AuctionInfo from "./pages/AuctionInfo";
import CreateLot from "./pages/CreateLot";
import {Login} from "./pages/Login";
import {SignUp} from "./pages/SignUp";

export const AppRoutes = [
  {
    index: true,
    element: <AuctioneList />,
  },
  {
    path: "/auction-info/:id",
    element: <AuctionInfo />,
  },
  // {
  //   path: "/bethistory",
  //   element: <BetHistory />,
  // },
  {
    path: "/create-lot",
    element: <CreateLot />,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path:"sign-up",
    element: <SignUp/>
  }
];
