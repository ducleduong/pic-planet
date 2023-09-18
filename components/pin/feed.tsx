"use client";
import { useEffect, useState } from "react";
import Spinner from "../spinner";
import { searchQuery } from "@/utils/queries";
import { client } from "@/sanity/lib/client";
import MasonryLayout from "../masonry-layout";
import { Pin } from "@/types/pin";

type FeedProps = {
  category?: string;
};

const Feed = ({ category }: FeedProps) => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const query = searchQuery(category);

      const pins = await client.fetch(query);

      if (pins) {
        setPins(pins);
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
