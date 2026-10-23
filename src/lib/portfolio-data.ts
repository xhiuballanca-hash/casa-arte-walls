import bedroomAsset from "@/assets/project-bedroom-travertino.jpg";
import facadeAsset from "@/assets/project-hotel-facade-travertino.jpg";
import houseFacadeAsset from "@/assets/project-house-facade-travertino.jpg";
import livingAsset from "@/assets/project-living-room-marmorino.jpg";
import officeAsset from "@/assets/project-office-beton-look.jpg";
import saharaLivingAsset from "@/assets/project-living-room-sahara.jpg";
import storeAsset from "@/assets/project-store-beton-look.jpg";

const bedroom = bedroomAsset;
const facade = facadeAsset;
const houseFacade = houseFacadeAsset;
const living = livingAsset;
const office = officeAsset;
const store = storeAsset;
const saharaLiving = saharaLivingAsset;

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
  image?: string;
  span?: "wide" | "tall";
};

/**
 * Card order is curated so the same finish never appears twice in a row:
 * Travertino, Beton Look, Marmorino, Travertino, Beton Look, Sahara, Travertino.
 */
export const projects: Project[] = [
  {
    id: "hotel-facade-travertino",
    title: "Hotel Facade",
    category: "Facades",
    finish: "Travertino",
    image: facade,
    span: "tall",
  },
  {
    id: "store-beton-look",
    title: "Store",
    category: "Stores",
    finish: "Beton Look",
    image: store,
  },
  {
    id: "living-room-marmorino",
    title: "Living Room",
    category: "Living Rooms",
    finish: "Marmorino",
    image: living,
  },
  {
    id: "house-facade-travertino",
    title: "House Facade",
    category: "Facades",
    finish: "Travertino",
    image: houseFacade,
  },
  {
    id: "office-beton-look",
    title: "Office",
    category: "Offices",
    finish: "Beton Look",
    image: office,
  },
  {
    id: "living-room-sahara",
    title: "Living Room",
    category: "Living Rooms",
    finish: "Sahara",
    image: saharaLiving,
  },
  {
    id: "bedroom-travertino",
    title: "Bedroom",
    category: "Bedrooms",
    finish: "Travertino",
    image: bedroom,
    span: "wide",
  },
];
