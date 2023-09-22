import { urlForImage } from "@/sanity/lib/image";
import { Pin as PinType } from "@/types/pin";
import { v4 as uuid } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";

type PinProps = {
  pin: PinType;
  currentUser: any;
};

const Pin = ({ pin, currentUser }: PinProps) => {
  const [postHover, setPostHover] = useState<boolean>(false);
  const [savingPost, setSavingPost] = useState<boolean>(false);
  const router = useRouter();

  const alreadyLiked = !!pin?.save?.filter(
    (item) => item.postedBy._id === currentUser?._id
  )?.length;

  const savePin = async (id: string) => {
    if (!alreadyLiked) {
      setSavingPost(true);

      const pin = await client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuid(),
            userId: currentUser._id,
            postedBy: {
              _type: "postedBy",
              _ref: currentUser._id,
            },
          },
        ])
        .commit();

      if (pin) setSavingPost(false);
    }
  };

  const deletePin = async (id: string) => {
    const res = await client.delete(id);
    if(res) router.refresh();
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHover(true)}
        onMouseLeave={() => setPostHover(false)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
        onClick={() => router.push(`/pin-detail/${pin._id}`)}
      >
        <img
          src={urlForImage(pin.image).width(300).url()}
          alt="user-post"
          className="rounded-lg w-full"
        />
        {postHover && (
          <div className="absolute top-0 w-full h-full flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Link
                  href={`${urlForImage(pin.image).auto("format").url()}`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-black text-xl opacity-75 hover:shadow-md hover:opacity-100 outline-none"
                >
                  <MdDownloadForOffline />
                </Link>
              </div>
              {alreadyLiked ? (
                <div
                  className="bg-primary text-zinc-50 font-bold p-2 text-base rounded-md outline-none flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {pin?.save?.length || 0}
                  <AiFillHeart className="ml-1 text-2xl" />
                </div>
              ) : (
                <div
                  className="bg-primary text-zinc-50 font-bold p-2 text-base rounded-md outline-none flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(pin._id);
                  }}
                >
                  {pin?.save?.length || 0}
                  <AiOutlineHeart className="ml-1 text-2xl" />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {pin.destination?.slice(8).length > 0 ? (
                <Link
                  href={pin.destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowRightCircleFill />
                  {pin.destination?.slice(8, 17)}...
                </Link>
              ) : undefined}
              {pin.postedBy?._id === currentUser?._id && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(pin._id);
                  }}
                  className="bg-white text-rose-500 p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
