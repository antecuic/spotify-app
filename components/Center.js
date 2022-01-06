/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import { shuffle } from "lodash";
import { useRecoilState } from "recoil";
import { playlistState, playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const [color, setColor] = useState();
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlistId, _] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const centerRef = useRef();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
        centerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => console.error("Something went wrong", error));
  }, [spotifyApi, playlistId, setPlaylist]);

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
          <h2 className="pr-2">{`Logout from ${session?.user.name}`}</h2>
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h2>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
