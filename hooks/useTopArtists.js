import { useState, useEffect } from "react";
import useSpotify from "./useSpotify";

function useTopArtists() {
  const spotifyApi = useSpotify();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const topArtistEndpoint =
      "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=3";
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      },
    };

    fetch(topArtistEndpoint, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        const topArtist = data.items; // Array of top tracks
        const extractedArtists = topArtist.map((artist) => {
            const artistName = artist.name || "Unknown Artist";
            const artistImage = artist.images[0]?.url || "";
            return {
              artistName,
              artistImage,
            };
          });
        setArtists(extractedArtists);
      });
  }, [spotifyApi]);

  return artists;
}

export default useTopArtists;
