import { Box } from "@mui/material"
import ResponsiveAppBar from "../../components/Navbar/Navbar"

export const Layout = (props:any):JSX.Element =>
{
    return <Box>
        <ResponsiveAppBar/>
        <Box sx={{
           minHeight: 'calc(100vh - 395px)'
         }}>
           {props.children}
         </Box>
    </Box>
}