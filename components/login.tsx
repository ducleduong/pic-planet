"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();

  if (session && session.user) return redirect("/");

  return (
    <div className="flex justify-center items-center flex-col h-screen ">
      <div className="w-full h-full relative ">
        <video
          src="/share.mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center items-center absolute top-0 right-0 left-0 bottom-0 bg-black/80">
        <Image src="/logo.png" alt="logo" width={300} height={256} />
        <div className="shadow-2xl">
          <button
            type="button"
            className="bg-[#FBF8F9] flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none mt-10"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="mr-1" />
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
