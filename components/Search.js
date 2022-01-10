/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash";
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
  const [albums, setAlbums] = useState();
  const [playlists, setPlaylists] = useState();
  const [artists, setArtists] = useState();
  const setCurrentTrackId = useSetRecoilState(currentTrackIdState);
  const setIsPlaying = useSetRecoilState(isPlayingState);
  const setPlaylistId = useSetRecoilState(playlistIdState);

  const debouncedSearchResults = useCallback(
    debounce((input) => {
      spotifyApi
        .search(input, ["track", "playlist", "album", "artist"])
        .then((data) => {
          setTracks(data.body.tracks);
          setAlbums(data.body.albums);
          setPlaylists(data.body.playlists);
          setArtists(data.body.artists);
          console.log(data.body);
        })
        .catch((e) => console.error(e));
    }, 300),
    []
  );
  useEffect(() => {
    if (userInput.length < 2) {
      return;
    }
    debouncedSearchResults(userInput);
  }, [userInput, debouncedSearchResults]);

  const playSong = (id) => {
    setCurrentTrackId(id);
    setIsPlaying(true);
    const track = tracks?.items.find((track) => track.id === id);

    spotifyApi.play({
      uris: [track.uri],
    });
  };

  const openPlaylist = (id) => {
    setPlaylistId(id);
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
        {tracks?.items.length > 0 && (
          <SearchResults
            items={tracks?.items}
            title="Songs"
            handleItemPress={playSong}
          />
        )}
        {artists?.items.length > 0 && (
          <SearchResults items={artists?.items} title="Artists" />
        )}
        {playlists?.items.length > 0 && (
          <SearchResults
            items={playlists?.items}
            title="Playlists"
            handleItemPress={openPlaylist}
          />
        )}
        {albums?.items.length > 0 && (
          <SearchResults items={albums?.items} title="Albums" />
        )}
      </div>
    </section>
  );
}

export default Search;
