import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from "next/link";

const menuOptions = [
  { id: 1, name: "Home", path: "/dashboard" },
  { id: 2, name: "History", path: "/dashboard/history" },
  { id: 3, name: "Pricing", path: "/dashboard/billing" },
  { id: 4, name: "Profile", path: "/dashboard/profile" },
];
const AppHeader = () => {
    return (
        <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40 mb-10 '>
            <Link href="/dashboard" className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
                <h1 className="text-lg md:text-xl font-bold">Avery Ambient</h1>
            </Link>
            <div className='hidden md:flex gap-12 items-center font-md'>
              

                {menuOptions.map((option) => (
                    <Link key={option.id} href={option.path}>
                        <h2 className="hover:font-bold cursor-pointer">{option.name}</h2>
                    </Link>
                ))}


            </div>
            <UserButton />
        </div>
    )
}

export default AppHeader