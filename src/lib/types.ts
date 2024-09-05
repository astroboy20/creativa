import { QueryConstraint } from "firebase/firestore";

export interface RatingType {
    user: string;
    rating: number;
    comment?: string;
}

export interface ExploreType {
    id: string;
    name: string;
    categories: string;
    src: string;
    profileName: string;
    profileImage: string;
    rating: number | RatingType[];
    description?: string;
    averageRating?: number;
}

export interface FireStoreDataProps {
    collectionName: string;
    queryConstraints?: QueryConstraint[];
  }
  
  export interface FirestoreDataItem {
    id: string;
    name: string;
    categories: string;
    src: string;
    profileName: string;
    profileImage: string;
    rating: number | RatingType[];
    description?: string;
    averageRating?: number;
  }