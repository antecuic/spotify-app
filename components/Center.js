/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from "next-auth/react";
import { useRef } from "react";
import { useEffect } from "react/cjs/react.development";
import { useRecoilValue } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import Playlist from "./Playlist";

function Center() {
  const { data: session } = useSession();
  const playlistId = useRecoilValue(playlistIdState);
  const centerRef = useRef();

  useEffect(() => {
    centerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [playlistId]);

  return (
    <div
      ref={centerRef}
      className="flex-grow h-screen overflow-y-scroll scrollbar-hide"
    >
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white whitespace-nowrap"
          onClick={signOut}
        >
          <img
            src={
              session?.user.image ||
              "https://images.unsplash.com/photo-1641478740308-2ee190bb5ec7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80"
            }
            alt="Profile"
            className="rounded-full w-10 h-10"
          />
          <h2 className="pr-2 hidden lg:inline">{`Logout from ${session?.user.name}`}</h2>
        </div>
      </header>
      <Playlist />
    </div>
  );
}

export default Center;
