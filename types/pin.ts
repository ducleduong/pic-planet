import type { Image } from "sanity";

export type Pin = {
  _id: string;
  destination: string;
  image: Image;
  save: any[];
  postedBy: any
};
