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
  title: string;
  location: string;
  category: Category;
  finish: string;
  image: string;
  span?: "wide" | "tall";
};

export const projects: Project[] = [
  {
    id: "villa-vodno",
    title: "Villa Vodno",
    location: "Skopje, Macedonia",
    category: "Living Rooms",
    finish: "Marmorino, custom warm beige",
    image: living,
    span: "wide",
  },
  {
    id: "hotel-monolith",
    title: "Hotel Monolith",
    location: "Ohrid, Macedonia",
    category: "Hotels",
    finish: "Stucco Veneziano, forest green",
    image: hotel,
  },
  {
    id: "osteria-nord",
    title: "Osteria Nord",
    location: "Skopje, Macedonia",
    category: "Restaurants",
    finish: "Stucco Veneziano, midnight green",
    image: restaurant,
    span: "tall",
  },
  {
    id: "headquarters-11",
    title: "Headquarters 11",
    location: "Skopje, Macedonia",
    category: "Offices",
    finish: "Sahara, bronze grain",
    image: office,
  },
  {
    id: "residence-korab",
    title: "Residence Korab",
    location: "Skopje, Macedonia",
    category: "Bedrooms",
    finish: "Marmorino, alabaster",
    image: bedroom,
  },
  {
    id: "spa-treska",
    title: "Spa Treska",
    location: "Ohrid, Macedonia",
    category: "Bathrooms",
    finish: "Travertino, warm ivory",
    image: bathroom,
  },
  {
    id: "casa-privata",
    title: "Casa Privata",
    location: "Bitola, Macedonia",
    category: "Facades",
    finish: "Travertino exterior, sand",
    image: facade,
    span: "tall",
  },
];
