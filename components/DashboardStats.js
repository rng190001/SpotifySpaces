import useTopAlbums from "@/hooks/useTopAlbums"

function DashboardStats() {
    const albums = useTopAlbums();

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
                    <div className="pt-3">
                        <div class="w-[615px] h-16 bg-gradient-to-r from-[#8b8a94] via-[#737373] to-[#57534e] rounded-[15px] shadow backdrop-blur-2xl"></div>
                    </div>
                    <div className="pt-3">
                        <div class="w-[615px] h-16 bg-gradient-to-r from-[#8b8a94] via-[#737373] to-[#57534e] rounded-[15px] shadow backdrop-blur-2xl"></div>  
                    </div>
                    <div className="pt-3">
                        <div class="w-[615px] h-16 bg-gradient-to-r from-[#8b8a94] via-[#737373] to-[#57534e] rounded-[15px] shadow backdrop-blur-2xl"></div>  
                    </div>
                    <div className="pt-3">
                        <div class="w-[615px] h-16 bg-gradient-to-r from-[#8b8a94] via-[#737373] to-[#57534e] rounded-[15px] shadow backdrop-blur-2xl"></div>  
                    </div>
                    <div className="pt-3">
                        <div class="w-[615px] h-16 bg-gradient-to-r from-[#8b8a94] via-[#737373] to-[#57534e] rounded-[15px] shadow backdrop-blur-2xl"></div>  
                    </div>
                    </div>
                </div>
            </div>

            <div>
            <div class="absolute top-[250px] left-[907px] w-[400px] h-[7px] origin-top-left rotate-[89.82deg] bg-gradient-to-r from-[#8b8a94] via-[#737373] to-[#57534e] rounded-[40px] shadow backdrop-blur-2xl"></div>
            </div>
        </div>
    )
}

export default DashboardStats
