import living from "@/assets/portfolio-living.jpg";
import hotel from "@/assets/portfolio-hotel.jpg";
import restaurant from "@/assets/portfolio-restaurant.jpg";
import office from "@/assets/portfolio-office.jpg";
import bedroom from "@/assets/portfolio-bedroom.jpg";
import bathroom from "@/assets/portfolio-bathroom.jpg";
import facade from "@/assets/portfolio-facade.jpg";

export type Category =
  | "Living Rooms"
  | "Bedrooms"
  | "Hotels"
  | "Offices"
  | "Stores"
  | "Facades";

export const categories: Category[] = [
  "Living Rooms",
  "Bedrooms",
  "Hotels",
  "Offices",
  "Stores",
  "Facades",
];

export type Project = {
  id: string;
  /** Descriptive title of the space — no invented client or project names. */
  title: string;
  category: Category;
  /** Finish and tone applied. */
  finish: string;
  image: string;
  span?: "wide" | "tall";
};

export const projects: Project[] = [
  {
    id: "bedroom-travertino",
    title: "Bedroom",
    category: "Bedrooms",
    finish: "Travertino",
    image: bedroom,
    span: "wide",
  },
  {
    id: "hotel-facade-travertino",
    title: "Hotel Facade",
    category: "Facades",
    finish: "Travertino",
    image: facade,
    span: "tall",
  },
  {
    id: "living-room-marmorino",
    title: "Living Room",
    category: "Living Rooms",
    finish: "Marmorino",
    image: living,
  },
  {
    id: "office-beton-look",
    title: "Office",
    category: "Offices",
    finish: "Beton Look",
    image: office,
  },
  {
    id: "store-beton-look",
    title: "Store",
    category: "Stores",
    finish: "Beton Look",
    image: restaurant,
  },
];
