import {BetHistory} from "./components/BetHistory";
import { HomePage } from "./pages/HomePage";

export const AppRoutes = [
    {
        index: true,
        element: <HomePage/>
    },
    {
        path: '/bethistory',
        element: <BetHistory/>
    }
]