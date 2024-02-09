interface Owner {
    firstName: string;
    lastName: string;
    photoBytes: string;
  }
  
  interface AuctionItem {
    id: number;
    name: string;
    description: string;
    startPrice: string;
    photos: string[];
    endDate: string;
    owner: Owner;
  }
  