import { urlForImage } from "@/sanity/lib/image";
import { Pin as PinType} from "@/types/pin";
import Image from "next/image";

const Pin = ({pin}: {pin: PinType}) => {
  return <div className="rounded-lg relative">
    <img src={urlForImage(pin.image).width(250).url()} alt="user-post"/>
  </div>;
};

export default Pin;
