import Center from '@/components/Center'
import Player from '@/components/Player';
import { getSession } from 'next-auth/react';
import Sidebar from '../components/Sidebar'

function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar/>
        <Center/>
      </main>

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

export default Home;