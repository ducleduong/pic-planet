import Masonry from "react-masonry-css";
import Pin from "@/components/pin/pin";
import { Pin as PinType} from "@/types/pin";

const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }: { pins: PinType[] }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakPointObj}>
      {pins?.map((pin: PinType) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
