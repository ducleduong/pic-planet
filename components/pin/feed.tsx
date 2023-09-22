"use client";
import { useEffect, useState } from "react";
import Spinner from "../spinner";
import { searchQuery, userQuery } from "@/utils/queries";
import { client } from "@/sanity/lib/client";
import MasonryLayout from "../masonry-layout";
import { Pin } from "@/types/pin";
import { useSession } from "next-auth/react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import _ from "lodash";

type FeedProps = {
  category?: string;
};

const Feed = ({ category }: FeedProps) => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [pins, setPins] = useState<Pin[]>([]);
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState<any>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [rerender, setRerender] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const query = searchQuery(searchTerm || category);
      const pins = await client.fetch(query);

      if (pins) {
        setPins(pins);
        setLoading(false);
      }
    };

    fetchData();
  }, [category, searchTerm, rerender]);

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

  return (
    <div className="p-10">
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-bg-primary outline-none focus-within:shadow-sm border border-primary-border">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            className="p-2 w-full bg-bg-primary outline-none"
          />
        </div>
        <div className="flex gap-3 ">
          <Link
            href={`user-profile/${currentUser?._id}`}
            className="hidden md:block w-12 h-12 rounded-full relative"
          >
            <Image
              src={currentUser?.image}
              alt="user-pic"
              className="object-cover rounded-full"
              fill
            />
          </Link>
          <Link
            href="/create-pin"
            className="bg-primary hover:bg-primary/90 text-2xl text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center border border-primary-border"
          >
            <IoMdAdd />
          </Link>
        </div>
      </div>
      {pins && !loading ? (
        <MasonryLayout pins={pins} currentUser={currentUser}/>
      ) : (
        <Spinner
          message={
            searchTerm
              ? "We are searching for your ideas"
              : "We are adding new ideas to your feed!"
          }
        />
      )}
    </div>
  );
};

export default Feed;
