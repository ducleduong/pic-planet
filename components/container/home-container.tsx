"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Sidebar from "../sidebar";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { User } from "@/types/user";

const HomeContainer = () => {
  const { data: session } = useSession();
  const [toogleSidebar, setToggleSideBar] = useState<Boolean>(false);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, []);

  if (!session || !session.user) return redirect("/login");

  return (
    <div className="flex md:flex-row flex-col h-screen duration-75 ease-out transition bg-zinc-900">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer text-zinc-50"
            onClick={() => setToggleSideBar(true)}
          />
          <Link href="/">
            <div className="relative w-28 h-12">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="object-contain"
                sizes="logo"
                priority
              />
            </div>
          </Link>
          <Link href={`user-profile/${session.user.id}`}>
            <div className="relative w-28 h-12">
              <Image
                src={session.user.image || ""}
                alt="logo"
                fill
                className="object-contain"
                sizes="logo"
              />
            </div>
          </Link>
        </div>
      </div>
      {toogleSidebar && (
        <div className="fixed w-4/5 bg-zinc-800 h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setToggleSideBar(false)}
            />
          </div>
          <Sidebar />
        </div>
      )}
      <div
        className="pb-2 flex-1 h-screen overflow-y-scroll"
        ref={scrollRef}
      ></div>
    </div>
  );
};

export default HomeContainer;
