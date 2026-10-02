import bedroomAsset from "@/assets/project-bedroom-travertino.jpg.asset.json";
import facadeAsset from "@/assets/project-hotel-facade-travertino.jpg.asset.json";
import houseFacadeAsset from "@/assets/project-house-facade-travertino.jpg.asset.json";
import livingAsset from "@/assets/project-living-room-marmorino.jpg.asset.json";
import officeAsset from "@/assets/project-office-beton-look.jpg.asset.json";
import saharaLivingAsset from "@/assets/project-living-room-sahara.jpg.asset.json";
import storeAsset from "@/assets/project-store-beton-look.jpg.asset.json";

const bedroom = bedroomAsset.url;
const facade = facadeAsset.url;
const houseFacade = houseFacadeAsset.url;
const living = livingAsset.url;
const office = officeAsset.url;
const store = storeAsset.url;
const saharaLiving = saharaLivingAsset.url;

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
