import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify"
import { SwitchHorizontalIcon, VolumeUpIcon as VolumeDownIcon, VolumeUpIcon} from "@heroicons/react/outline";
import { RewindIcon, PauseIcon, PlayIcon, FastForwardIcon, ReplyIcon} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { debounce } from 'lodash';

function Player() {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);
    const {songInfo} = useSongInfo();

    
    const fetchCurrentSong =() =>{
        if (!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then((data) =>
                {
                    setCurrentTrackId(data.body?.item?.id);
                    spotifyApi.getMyCurrentPlaybackState().then((data) =>{
                        setIsPlaying(data.body?.is_playing)
                    });
                });
        }
    }

    const handlePlayPause =() =>{
        spotifyApi.getMyCurrentPlaybackState().then((data) =>{
            if(data.body?.is_playing){
                spotifyApi.pause();
                setIsPlaying(false);
            }else{
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };

    useEffect(() => {
       if(spotifyApi.getAccessToken() && !currentTrackId){
           //fetch song info
           fetchCurrentSong();
           setVolume(50);
       }
    },[currentTrackId, spotifyApi, session])

    useEffect(()=>{
        if(volume >0 && volume < 100){
            debouncedAdjustedVolume(volume);
        }
    }, [volume])

    const debouncedAdjustedVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) =>{});
        },300), []
    );
   

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
           <div className="flex items-center space-x-4">
               <img className="hidden md:inline h-10 w-10" src={songInfo?.album?.images?.[0]?.url} alt=""/>
               <div>
                   <h3>{songInfo?.name}</h3>
                   <p>{songInfo?.artists?.[0]?.name}</p>
               </div>
           </div>

           <div className="flex items-center justify-evenly">
               <SwitchHorizontalIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"/>
               <RewindIcon onClick={() => spotifyApi.skipToPrevious().catch((err) => {})} className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"/>
                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"/>
                ):(
                    <PlayIcon onClick={handlePlayPause} className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"/>
                )}

                <FastForwardIcon onClick={() => spotifyApi.skipToNext().catch((err) => {})} className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"/>
                <ReplyIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"/>
           </div>

           <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5" >
               <VolumeDownIcon onClick={() => volume>0 && setVolume(volume-10)} className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
               <input className="w-14 md:w-28" type="range" value={volume} onChange={(e) => setVolume(Number(e.target.value))} min={0} max={100}></input>
               <VolumeUpIcon  onClick={() => volume<100 && setVolume(volume+10)} className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
           </div>
        </div>
    )
}

export default Player
