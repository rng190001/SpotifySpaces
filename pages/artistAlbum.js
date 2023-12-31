import { getSession } from 'next-auth/react';
import { useSession } from "next-auth/react";
import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';

function ArtistAlbum() {
    const {data:session} = useSession();
  return (
    <div className="bg-black ">
      <div className="flex text-white ">
        <Sidebar/>
      </div>

      <div className="sticky bottom-0">
        {/* Player*/}
        <Player/>
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);

  return{
    props:{
      session,
    },
  };
}

export default ArtistAlbum;