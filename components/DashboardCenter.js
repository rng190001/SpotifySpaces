import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {shuffle} from "lodash";
import DashboardStats from "./DashboardStats";

const colors = [
    "from-blue-500",
    "from-[#2dd4bf]",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];

function DashboardCenter() {
    const {data:session} = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);

    useEffect(() => {
        setColor(shuffle(colors).pop());
        console.log("color was picked", color);
     },[]);

    return (
        <div className="flex-auto">
            <section className={`flex bg-gradient-to-b ${color} to-black h-55 p-8`}>
                <img className="rounded-full w-24 h-24 shadow" src={session?.user.image} alt="User"></img>
                <h1 className="text-white text-3xl font-normal p-8 pl-4">{session.user?.name}</h1>
            </section>
            <DashboardStats/>
        </div>
    )
}

export default DashboardCenter
