import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistState",
  default: null,
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "6aYQxGAj7L2VeEwYvtJ8EV", // Tarantino Collection playlist
});
