/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useSetRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import SearchResults from "./SearchResults";

function Search() {
  const spotifyApi = useSpotify();
  const [userInput, setUserInput] = useState("");
  const [tracks, setTracks] = useState();
  const [playlists, setPlaylists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const setCurrentTrackId = useSetRecoilState(currentTrackIdState);
  const setIsPlaying = useSetRecoilState(isPlayingState);
  const setPlaylistId = useSetRecoilState(playlistIdState);
  const router = useRouter();

  const debouncedSearchResults = useCallback(
    debounce((input) => {
      spotifyApi
        .search(input, ["track", "playlist", "album", "artist"])
        .then((data) => {
          setTracks(data.body.tracks);
          setPlaylists(data.body.playlists);
          setTopTracks([]);
        })
        .catch((e) => console.error(e));
    }, 300),
    []
  );
  useEffect(() => {
    if (userInput === "") {
      spotifyApi.getMyTopTracks({ limit: 25 }).then((data) => {
        setTopTracks(data.body.items);
      });

      spotifyApi.getMyRecentlyPlayedTracks({ limit: 25 }).then((data) => {
        const recents = data.body.items.map((item) => item.track);
        setRecentlyPlayed(recents);
      });

      return;
    }
    debouncedSearchResults(userInput);
  }, [userInput, debouncedSearchResults]);

  const playSong = (id) => {
    setCurrentTrackId(id);
    setIsPlaying(true);

    spotifyApi.getTrack(id).then((data) => {
      spotifyApi.play({
        uris: [data.body.uri],
      });
    });
  };

  const openPlaylist = (id) => {
    setPlaylistId(id);
    router.push("/");
  };

  return (
    <section className="pt-7 md:px-5 h-screen overflow-y-auto scrollbar-hide pb-28">
      <div className="ml-5">
        <input
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          className="rounded-full h-8 w-52 md:w-80 p-5 focus:outline-none"
          placeholder="Search for albums, tracks and more..."
        />
      </div>
      <div>
        {!userInput.length && topTracks?.length && (
          <SearchResults
            items={topTracks}
            title="Top 25"
            handleItemPress={playSong}
          />
        )}
        {!userInput.length && recentlyPlayed?.length && (
          <SearchResults
            items={recentlyPlayed}
            title="Recently played"
            handleItemPress={playSong}
          />
        )}
        {tracks?.items.length > 0 && (
          <SearchResults
            items={tracks?.items}
            title="Songs"
            handleItemPress={playSong}
          />
        )}
        {playlists?.items.length > 0 && (
          <SearchResults
            items={playlists?.items}
            title="Playlists"
            handleItemPress={openPlaylist}
          />
        )}
      </div>
    </section>
  );
}

export default Search;
