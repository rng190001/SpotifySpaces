import useSpotify from "@/hooks/useSpotify"

function Song({order, track}) {
    const spotifyApi = useSpotify();
    return (
        <div>
            <p>{order+1}</p>
            <img src={track.track.album.images[0].url} alt=""></img>
        </div>
    )
}

export default Song
