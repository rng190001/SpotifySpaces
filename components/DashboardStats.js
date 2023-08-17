import useTopAlbums from "@/hooks/useTopAlbums"
import useTopArtists from "@/hooks/useTopArtists";
import useTopGenres from "@/hooks/useTopGenres";

function DashboardStats() {
    const albums = useTopAlbums();
    const topGenres = useTopGenres();
    const topArtists = useTopArtists();

    const albumImages = [
        "w-[175px] h-[175px] absolute top-[48px] left-[57px] rounded-[20px]",
        "w-[195px] h-[205px] absolute top-[35px] left-[103px] rounded-[20px]",
        "w-[175px] h-[175px] absolute top-[50px] left-[378px] rounded-[20px]",
        "w-[206px] h-[205px] absolute top-[35px] left-[305px] rounded-[20px]",
        "w-[225px] h-[225px] absolute top-[26px] left-[201px] rounded-[20px]",
    ];

    return (
        <div>
            <div class="w-[326px] h-[60px] text-white text-2xl font-normal pl-3">
                Top Albums
                <div className="pt-3">
                   <div class="w-[615px] h-[275px] bg-gradient-to-r from-[#8b8a94] via-[#737373] to-[#57534e] rounded-[40px] shadow backdrop-blur-2xl">
                        {albums.map((album, index) => (
                            <img
                                key={index}
                                className={`album-image ${albumImages[index]}`}
                                src={album.albumImage}
                                alt={album.albumName}
                            />
                        ))}
                   </div>
                </div>
            </div>

            <div className="">
                <div className="absolute top-[492px] left-[215px] w-[326px] h-[120px] text-white text-2xl font-normal ">
                    Top Genres
                    <div className= "overflow-y-scroll h-[194px] w-[615px]">
                    {topGenres.map((genreEntry, index) => (
                        <div key={index} className="pt-3">
                            <div className="w-[615px] h-16 bg-gradient-to-r from-[#8b8a94] via-[#737373] to-[#57534e] rounded-[15px] shadow backdrop-blur-2xl">
                                <div>
                                    <img className="w-[49px] h-[49px] rounded-2xl absolute top-[7px] left-[17px]" src={genreEntry.artistProPic}></img>
                                </div>
                                <div className="w-115 h-[27px] text-white text-[20px] font-normal absolute top-[15px] left-[82px]">{genreEntry.genre}</div>
                                <div className="w-[220px] h-5 absolute top-[14px] left-[423px]">
                                    <span className="text-white text-[15px] font-normal">
                                        Top Listened:&nbsp;
                                    </span>
                                    <span className="text-[#a1a1aa] text-[15px] font-normal">
                                        {genreEntry.mostPopularArtistName}
                                    </span>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
            <div class="absolute top-[250px] left-[907px] w-[400px] h-[7px] origin-top-left rotate-[89.82deg] bg-gradient-to-r from-[#8b8a94] via-[#737373] to-[#57534e] rounded-[40px] shadow backdrop-blur-2xl"></div>
            </div>

            <div className="absolute top-[171px] left-[950px] w-80 h-14 text-white text-2xl font-normal">
                Top Artists
                <div className="pt-3 flex">
                {topArtists.map((artist, index) => (
                    <div key={index} className="mr-4">
                        <img className="w-[150px] h-[150px] rounded-[15px]" src={artist.artistImage || "https://via.placeholder.com/150x150"} alt={artist.artistName} />
                        <div className="w-[145px] h-[25px] text-center text-[#a1a1aa] text-[15px] font-normal">{artist.artistName}</div>
                    </div>
                    ))}
                   {/* <img class="w-[150px] h-[150px] rounded-[15px]" src="https://via.placeholder.com/150x150" /> 
                   <div class="w-[145px] h-[25px] text-center text-[#a1a1aa] text-[15px] font-normal">Taylor Swift</div>
                   <div className="absolute top-[44px] left-[175px]">
                      <img class="w-[150px] h-[150px] rounded-[15px]" src="https://via.placeholder.com/150x150" /> 
                      <div class="w-[145px] h-[25px] text-center text-[#a1a1aa] text-[15px] font-normal">Taylor Swift</div> 
                   </div>
                   <div className="absolute top-[44px] left-[345px]">
                      <img class="w-[150px] h-[150px] rounded-[15px]" src="https://via.placeholder.com/150x150" /> 
                      <div class="w-[145px] h-[25px] text-center text-[#a1a1aa] text-[15px] font-normal">Taylor Swift</div> 
                   </div> */}
                </div>
            </div>

            <div className="absolute top-[425px] left-[950px] w-[326px] h-[60px] text-white text-2xl font-normal">
                Spotify Snapshot
                <div class="pt-3 flex">
                  <div class="w-[230px] h-[223px] bg-gradient-to-br from-[#8b8a94] via-[#737373] to-[#57534e] rounded-full"></div> 
                  <div class="absolute top-[57px] left-[12px] w-[205px] h-[198px] bg-black rounded-full"></div>
                  <div class="absolute top-[45px] left-[250px]">
                     <div class="w-[230px] h-[223px] bg-gradient-to-br from-[#8b8a94] via-[#737373] to-[#57534e] rounded-full"></div> 
                    <div class="absolute top-[13px] left-[13px] w-[205px] h-[198px] bg-black rounded-full"></div> 
                  </div>
                </div>
            </div>

        </div>
    )
}

export default DashboardStats
