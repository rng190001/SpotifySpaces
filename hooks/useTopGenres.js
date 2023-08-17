import { useState, useEffect } from "react";
import useSpotify from "./useSpotify";

function useTopGenres() {
  const spotifyApi = useSpotify();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const topArtistsEndpoint =
      "https://api.spotify.com/v1/me/top/artists?time_range=medium_term";
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      },
    };

    fetch(topArtistsEndpoint, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        const topArtists = data.items; // Array of top tracks
        console.log(topArtists)
        const genreCounts = {};
        topArtists.forEach((artist) => {
            artist.genres.forEach((genre) => {
            if (genreCounts[genre]) {
                genreCounts[genre]++;
            } else {
                genreCounts[genre] = 1;
            }
            });
        });
        const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);
        
        //setGenres(sortedGenres.slice(0, 5)); // Get the top 5 genres
        const genreWithArtistsPromises = sortedGenres.slice(0, 5).map(async (genre) => {
            try {
              const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=genre:"${genre}"&type=artist&limit=1`, {
                headers: {
                  Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                },
              });
              const artistData = await artistResponse.json();
              const artist = artistData.artists.items[0]; // Get the first artist
              if (artist) {
                // Fetch the detailed artist information to get the profile image URL
                const detailedArtistResponse = await fetch(`https://api.spotify.com/v1/artists/${artist.id}`, {
                    headers: {
                    Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                    },
                });
                const detailedArtistData = await detailedArtistResponse.json();
                return {
                    genre,
                    mostPopularArtistName: artist ? artist.name : 'Unknown Artist',
                    artistProPic: detailedArtistData.images[0]?.url || "https://via.placeholder.com/49x49"
                    };
                }
            } catch (error) {
              console.error('Error fetching artist for genre', genre, ':', error);
              return {
                genre,
                mostPopularArtistName: 'Unknown Artist',
                artistProPic:''
              };
            }
          });
          
          Promise.all(genreWithArtistsPromises).then((genreWithArtists) => {
            setGenres(genreWithArtists);
          });
        
      });
  }, [spotifyApi]);

  
  //console.log("Genres: ", genres)
  return genres;
}

export default useTopGenres;
