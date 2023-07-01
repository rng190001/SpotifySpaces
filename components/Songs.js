import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import Song from './Song';

function Songs() {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-6 flex flex-col mt-3 space-y-2 pb-28 text-white">
      
    </div>
  );
}

export default Songs;