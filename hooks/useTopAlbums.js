import { useState, useEffect } from "react";
import useSpotify from "./useSpotify";

function useTopAlbums() {
  const spotifyApi = useSpotify();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const topTracksEndpoint =
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5";
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      },
    };

    fetch(topTracksEndpoint, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        const topTracks = data.items; // Array of top tracks
        console.log(topTracks)
        const extractedAlbums = topTracks.map((track) => {
          const albumName = track.album.name || "Unknown Album";
          const artists = track.album.artists.map((artist) => artist.name).join(", ");
          const albumImage = track.album.images[0]?.url || ""; 
          return {
            albumName,
            artists,
            albumImage,
          };
        });
        setAlbums(extractedAlbums);
      });
  }, [spotifyApi]);

  return albums;
}

export default useTopAlbums;
