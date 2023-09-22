"use client";
import { client } from "@/sanity/lib/client";
import { userQuery, userSavedPinsQuery } from "@/utils/queries";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Spinner from "./spinner";
import { AiOutlineLogout } from "react-icons/ai";
import MasonryLayout from "./masonry-layout";

const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<any>();
  const [pins, setPins] = useState<any>();

  useEffect(() => {
    const query = userQuery(userId);
    const fetchData = async () => {
      const data = await client.fetch(query);
      if (data && data.length > 0) {
        setUser(data[0]);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchLikePins = async () => {
      const pins = await client.fetch(
        `*[_type == "pin" && postedBy._ref == $userId]`,
        { userId }
      );
      if (pins) setPins(pins);
    };

    fetchLikePins();
  }, [userId]);

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === user?._id && (
              <button
                type="button"
                className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                onClick={() => signOut()}
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            )}
          </div>
        </div>
        <div className="px-2">
          <MasonryLayout pins={pins} currentUser={user} />
        </div>
        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
