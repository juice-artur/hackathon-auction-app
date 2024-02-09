interface Owner {
    firstName: string;
    lastName: string;
    photoBytes: string;
  }
  
  interface AuctionItem {
    id?: number;
    name: string;
    description: string;
    startPrice: string;
    photos: string[];
    endDate: string;
    owner: Owner;
  }
  
  interface Auction {
    id: number;
    name: string;
    description: string;
    startPrice: number;
    photos: string[];
    endDate: string;
    bids: string[];
    owner: {
      id: number;
      lastName: string;
      firstName: string;
      city: string;
      photoBytes: string;
      email: string;
      registrationDate: string;
      role: string;
      bids: string[];
      ownedAuctions: string[];
    };
  }
  
  interface User {
    id: number;
    lastName: string;
    firstName: string;
    city: string;
    photoBytes: string;
    email: string;
    registrationDate: string;
    role: string;
    bids: string[];
    ownedAuctions: string[];
  }
  
  interface Bid {
    id: number;
    price: number;
    date: string;
    auction: Auction;
    user: User;
  }