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
  | "Restaurants"
  | "Hotels"
  | "Offices"
  | "Bathrooms"
  | "Facades";

export const categories: Category[] = [
  "Living Rooms",
  "Bedrooms",
  "Restaurants",
  "Hotels",
  "Offices",
  "Bathrooms",
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
    id: "living-marmorino",
    title: "Living room, private residence",
    category: "Living Rooms",
    finish: "Marmorino · custom warm beige",
    image: living,
    span: "wide",
  },
  {
    id: "hotel-veneziano",
    title: "Hotel lobby",
    category: "Hotels",
    finish: "Stucco Veneziano · forest green",
    image: hotel,
  },
  {
    id: "restaurant-veneziano",
    title: "Restaurant interior",
    category: "Restaurants",
    finish: "Stucco Veneziano · midnight green",
    image: restaurant,
    span: "tall",
  },
  {
    id: "office-sahara",
    title: "Office reception",
    category: "Offices",
    finish: "Sahara · bronze grain",
    image: office,
  },
  {
    id: "bedroom-marmorino",
    title: "Master bedroom",
    category: "Bedrooms",
    finish: "Marmorino · alabaster",
    image: bedroom,
  },
  {
    id: "bathroom-travertino",
    title: "Bathroom and spa",
    category: "Bathrooms",
    finish: "Travertino · warm ivory",
    image: bathroom,
  },
  {
    id: "facade-travertino",
    title: "Villa facade",
    category: "Facades",
    finish: "Travertino exterior · sand",
    image: facade,
    span: "tall",
  },
];
