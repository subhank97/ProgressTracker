import { getUserSession } from "../lib/auth"
import { BsListTask } from 'react-icons/bs';
import { LiaClipboardListSolid } from 'react-icons/lia'
import { VscGraph } from 'react-icons/vsc'
import { BiHomeAlt2 } from 'react-icons/bi'
import Link from "next/link";

interface NavbarLayoutProps {
  children: React.ReactNode;
}

export default async function NavbarLayout({ children }: NavbarLayoutProps) {

  const user = await getUserSession()
  const profilePic = user.image || undefined

  return (
    <div className="h-screen w-full bg-white relative flex overflow-hidden">


      <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
          <Link href='/'>
            <BiHomeAlt2 className="h-8 w-8" />
          </Link>
        </div>

        <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
          <Link href='/projects'>
            <LiaClipboardListSolid className="h-8 w-8" />
          </Link>
        </div>

        {/* <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
              <BsListTask className="h-8 w-8" />
          </div> */}

        <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
          <VscGraph className="h-8 w-8" />
        </div>
      </aside>



      <div className="w-full h-full flex flex-col justify-start">
        <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
          <div className="flex flex-shrink-0 items-center space-x-4 text-white">

            <div className="flex flex-col items-end ">
              <div className="text-md font-medium ">{user.name}</div>
              <div className="text-sm font-regular">{user.email}</div>
            </div>

            <img src={profilePic} alt="profile image" className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400" />
          </div>
        </header>

        <main>
          {children}
        </main>

      </div>

    </div>
  )
}