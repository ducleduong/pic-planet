import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Category, categories } from "@/utils/data";

const Sidebar = () => {
  const { status, data: session } = useSession();
  const pathName = usePathname();
  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-zinc-50 hover:text-primary transition-all duration-200 ease-in-out capitalize border-primary";
  const isActiveStyle =
    "flex items-center px-5 gap-3 text-zinc-50 hover:text-primary transition-all duration-200 ease-in-out capitalize font-extrabold border-r-2 border-primary";

  return (
    <div className="flex flex-col justify-between bg-bg-primary h-full overflow-y-scroll min-w-210 hide-scrollbar border-r border-primary-border shadow-sm">
      <div className="flex flex-col">
        <Link
          href="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center relative h-12"
        >
          <Image
            src="/logo.png"
            alt="logo"
            sizes="logo"
            fill
            className="object-contain px-5"
          />
        </Link>
        <div className="flex flex-col gap-5">
          <Link
            href="/"
            className={pathName === "/" ? isActiveStyle : isNotActiveStyle}
          >
            <RiHomeFill /> Home
          </Link>
          <div className="border-b border-primary-border mx-5"></div>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl font-semibold text-secondary">
            Discover categories
          </h3>
          {categories.map((category: Category, index: number) => (
            <Link
              key={index}
              href={`/category/${category.name.toLowerCase()}`}
              className={
                pathName === `/category/${category.name.toLowerCase()}`
                  ? isActiveStyle
                  : isNotActiveStyle
              }
            >
              <div className="w-8 h-8 relative">
                <Image
                  src={category.image}
                  className="rounded-full shadow-sm object-cover"
                  alt="category"
                  fill
                  sizes="logo"
                />
              </div>
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-b border-primary-border mx-5 mt-5"></div>
      {status === "authenticated" && (
        <Link
          href={`user-profile/${session.user.id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center rounded-lg shadow-lg mx-3"
        >
          <p className="h-10 w-10 relative">
            <Image
              src={session.user.image || "/"}
              alt="user-profile"
              fill
              className="object-contain rounded-full"
              sizes="logo"
            />
          </p>
          <p className="text-secondary">{session.user.name}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
