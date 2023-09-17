import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between bg-zinc-900 h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link href="/" className="flex px-5 gap-2 my-6 pt-1 w-190 items-center relative h-12">
          <Image src="/logo.png" alt="logo" sizes="logo" fill className="object-contain px-5"/>
        </Link>
        <div className="flex flex-col gap-5">

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
