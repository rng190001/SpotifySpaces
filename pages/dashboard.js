import { getSession } from 'next-auth/react';
import { useSession } from "next-auth/react";
import Sidebar from '@/components/Sidebar';

function Dashboard() {
    const {data:session} = useSession();
  return (
    <div className="bg-black h-screen overflow-hidden">
      <div className="flex text-white">
      <Sidebar/>
        <h2>Hello from Dashboard!, {session?.user.name}</h2>
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

export default Dashboard;