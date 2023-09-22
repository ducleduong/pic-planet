"use client";
import { client } from "@/sanity/lib/client";
import { pinDetailMorePinQuery, pinDetailQuery, userQuery } from "@/utils/queries";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Spinner from "../spinner";
import MasonryLayout from "../masonry-layout";
import { urlForImage } from "@/sanity/lib/image";
import { MdDownloadForOffline } from "react-icons/md";
import Link from "next/link";

type PinDetailProps = {
  pinId: string;
};

export const PinDetail = ({ pinId }: PinDetailProps) => {
  const [pins, setPins] = useState<any>();
  const [pinDetail, setPinDetail] = useState<any>();
  const [comment, setComment] = useState<string>("");
  const [addingComment, setAddingComment] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>();

  const { data: session } = useSession();

  const fetchPinData = useCallback(async () => {
    const query = pinDetailQuery(pinId);
    if (query) {
      const data = await client.fetch(query);
      if (data && data?.length > 0) {
        setPinDetail(data[0]);
        const queryMore = pinDetailMorePinQuery(data[0]);
        const res = await client.fetch(queryMore);
        if (res) setPins(res);
      }
    }
  }, [pinId]);

  useEffect(() => {
    fetchPinData();
  }, [pinId, fetchPinData, addingComment]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user.id) {
        const currentUserQuery = userQuery(session?.user.id);
        const currentUserData = await client.fetch(currentUserQuery);
        setCurrentUser(currentUserData[0]);
      }
    };
    fetchUserData();
  }, [session]);

  const addComment = async () => {
    if (comment) {
      setAddingComment(true);

      const data = await client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuid(),
            postedBy: { _type: "postedBy", _ref: session?.user?.id },
          },
        ])
        .commit();

      if (data) {
        setAddingComment(false);
        setComment("");
      }
    }
  };
  
  if (!pinDetail) {
    return <Spinner message="Showing pin" />;
  }

  return (
    <div className="p-10">
      {pinDetail && (
        <div className="flex xl:flex-row flex-col m-auto bg-bg-primary">
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-lg"
              src={(pinDetail?.image && urlForImage(pinDetail?.image).url())}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={`${pinDetail.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <Link href={pinDetail.destination} target="_blank" rel="noreferrer" className="text-primary">
                {pinDetail.destination}
              </Link>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetail.title}
              </h1>
              <p className="mt-3">{pinDetail.about}</p>
            </div>
            <Link href={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-bg-primary rounded-lg ">
              <img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{pinDetail?.postedBy.userName}</p>
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {pinDetail?.comments?.map((item: any) => (
                <div className="flex gap-2 mt-5 items-center bg-bg-primary rounded-lg" key={item.comment}>
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link href={`/user-profile/${currentUser?._id}`}>
                <img src={currentUser?.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
              <input
                className=" flex-1 border-primary-border outline-none border-2 p-2 rounded-2xl focus:border-primary bg-bg-primary"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? 'Doing...' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} currentUser={currentUser}/>
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </div>
  );
};
