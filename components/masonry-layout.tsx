import Masonry from "react-masonry-css";
import Pin from "@/components/pin/pin";
import { Pin as PinType} from "@/types/pin";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { userQuery } from "@/utils/queries";
import { useSession } from "next-auth/react";

const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

type MasonryLayoutProps = {
  pins: PinType[],
  currentUser: any,
}

const MasonryLayout = ({ pins, currentUser }: MasonryLayoutProps) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakPointObj}>
      {pins?.map((pin: PinType) => (
        <Pin key={pin._id} pin={pin} currentUser={currentUser} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
