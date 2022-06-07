import Link from "next/link";
import { useContext, React } from "react";
import { ReactDOM } from "react-dom";

import UserContext from "~/lib/UserContext";
import { addChannel, deleteChannel } from "~/lib/Store";
import TrashIcon from "~/components/TrashIcon";
import  Router  from "next/router";


export default function Layout(props) {
  const { signOut, user, userRoles } = useContext(UserContext);

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  };

  const newChannel = async () => {
    const slug = prompt("Please enter a new city name to create a channel for");
    if (slug) {
      addChannel(slugify(slug), user.id);
    }
  };

  const goMinter = () => {
    Router.push('/minter');
  }

  return (
    <main className="main flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      
    
      <nav
        className="w-64 bg-black text-gray-100 overflow-scroll"
        style={{ maxWidth: "20%", minWidth: 150, maxHeight: "100vh" }}
      >
        <div className="p-4">
          <div className="p-6">
            <img src="https://www.stateful.art/rock.jpeg" width={"240px"} />
          </div>
          <hr className="m-2" />
          <div className="p-2 flex flex-col space-y-2 lg:mx-8">
            {/* <h6 className="text-xs">{user?.email}</h6> */}
       
          
         <button
              className="bg-blue-900 hover:bg-blue-800 text-white rounded transition duration-150 w-full lg:w-2/3  lg:mx-6  rounded w-2/3 transition duration-150"
              onClick={() => signOut()}
            >
              Log out
            </button>

            <button
          className="bg-green-500 hover:bg-blue-800 text-white md:mx-4 lg:mx-6 my-4  px-4 rounded lg:w-2/3 transition duration-150"
          onClick={() => newChannel()}
        >
          bridge new city
        </button>
          </div>
        

          <hr className="m-2" />
          <h4 className="font-bold text-center" >Comms of Rock</h4>
          <ul className="channel-list">
            {props.channels.map((x) => (
              <SidebarItem
                channel={x}
                key={x.id}
                isActiveChannel={x.id === props.activeChannelId}
                user={user}
                userRoles={userRoles}
              />
            ))}
          </ul>
          </div>

      

        {/* <button
          className="bg-green-500 hover:bg-black text-white mx-8 my-4 py-2 px-4 rounded w-2/3 transition duration-150"
          onClick={() => goMinter()}
        >
          mint something
        </button> */}
      </nav>

      {/* Messages */}
      <div className="flex-1 bg-gray-800 h-screen">{props.children}</div>
    </main>
  );
}

const SidebarItem = ({ channel, isActiveChannel, user, userRoles }) => (
  <>
    <li className="flex items-center justify-between hover:text-yellow-300">
      <Link href="/channels/[id]" as={`/channels/${channel.id}`}>
        <a className={isActiveChannel ? "font-bold" : ""}>{channel.slug}</a>
      </Link>
      {channel.id !== 1 &&
        (channel.created_by === user?.id || userRoles.includes("admin")) && (
          <button onClick={() => deleteChannel(channel.id)}>
            <TrashIcon />
          </button>
        )}
    </li>
  </>
);
