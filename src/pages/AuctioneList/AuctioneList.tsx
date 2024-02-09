import LotCard from "../../components/LotCard";
import Box from "@mui/material/Box";

const AuctioneList = () => {
  const lotCardData = [
    {
      imageUrl: "https://placekitten.com/800/400",
      title: "Title 1",
      description: "Description 1",
      onClick: () => console.log("change page 1"),
    },
    {
      imageUrl: "https://placekitten.com/800/400",
      title: "Title 2",
      description: "Description 2",
      onClick: () => console.log("change page 1"),
    },
    {
      imageUrl: "https://placekitten.com/800/400",
      title: "Title 3",
      description: "Description 3",
      onClick: () => console.log("change page 1"),
    },
    {
      imageUrl: "https://placekitten.com/800/400",
      title: "Title 4",
      description: "Description 4",
      onClick: () => console.log("change page 1"),
    },
  ];

  return (
    <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center" marginTop="20px">
      {lotCardData.map((data, index) => (
        <LotCard key={index} {...data} />
      ))}

      <LotCard
        title="Created"
        imageUrl="https://img.freepik.com/free-vector/plus-symbol-brush-stroke-typography-vector_53876-166821.jpg?size=338&ext=jpg&ga=GA1.1.1826414947.1699315200&semt=ais"
        description="an auction"
        onClick={() => console.log("created an auction")} ///change to the desired function
      />
    </Box>
  );
};
export default AuctioneList;
