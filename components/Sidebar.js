import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { tabState } from "../atoms/tabAtom";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const setPlaylistId = useSetRecoilState(playlistIdState);
  const setAppTab = useSetRecoilState(tabState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
        setPlaylistId(data.body.items?.[0]?.id);
      });
    }
  }, [session, spotifyApi, setPlaylistId]);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:min-w-[12rem] sm:max-w-[12rem] lg:min-w-[15rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => setAppTab("Home")}
        >
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => setAppTab("Search")}
        >
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/**Playlists... */}
        {playlists.map((playlist) => (
          <p
            onClick={() => {
              setAppTab("Playlist");
              setPlaylistId(playlist.id);
            }}
            key={playlist.id}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
