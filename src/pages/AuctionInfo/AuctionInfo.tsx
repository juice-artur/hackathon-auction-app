import { Paper, Container } from "@mui/material"
import MainInformation from "../../components/MainInformation";

const AuctionInfo = () => {

    const lotCardData = {
        imageUrl: "https://placekitten.com/800/400",
        title: "Title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum ultrices vestibulum. Nunc vehicula tortor sit amet diam pretium, id congue eros pretium. Mauris condimentum neque a varius faucibus. Ut finibus augue quis augue consequat gravida sit amet et ligula. Morbi convallis accumsan tortor, sit amet tristique erat interdum in. Nulla vestibulum massa at massa mattis rhoncus. Cras non pulvinar ex. Mauris et tempor magna, sit amet interdum ligula. Donec faucibus tortor nec metus tincidunt, ut pharetra dolor accumsan. Cras sem metus, pretium vitae blandit in, ullamcorper eget purus. In mattis, lacus iaculis accumsan pellentesque, nibh elit pretium massa, vitae facilisis libero est non ligula. Suspendisse scelerisque, lorem sit amet tincidunt tempus, dui diam porttitor quam, et maximus augue augue a nisi. Donec ac porttitor sapien, eget pellentesque purus. Integer eu enim dapibus, posuere massa eget, viverra tortor.",
        onClick: () => console.log("change page 1"),
    }

    return (
        <Container  sx = {{maxWidth :"lg"}} >
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
                <MainInformation {...lotCardData}  />
            </Paper>
        </Container>
    )
}

export default AuctionInfo;