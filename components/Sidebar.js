import { HomeIcon, SearchIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
        if (!playlistId) {
          setPlaylistId(data.body.items[0].id);
        }
      });
    }
  }, [session, spotifyApi, playlistId, setPlaylistId]);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:min-w-[12rem] sm:max-w-[12rem] lg:min-w-[15rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <Link href="/" passHref>
          <button className="flex items-center space-x-2 hover:text-white">
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </button>
        </Link>
        <Link href="/search" passHref>
          <button className="flex items-center space-x-2 hover:text-white">
            <SearchIcon className="h-5 w-5" />
            <p>Search</p>
          </button>
        </Link>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/**Playlists... */}
        {playlists.map((playlist) => (
          <Link key={playlist.id} href="/" passHref>
            <p
              onClick={() => {
                setPlaylistId(playlist.id);
              }}
              className="cursor-pointer hover:text-white"
            >
              {playlist.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
