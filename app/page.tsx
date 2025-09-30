"use client";


import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useUser,UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function HeroSectionOne() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
      <Navbar />
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-white md:text-4xl lg:text-7xl">
          {"AVERY"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-white"
        >
          Transform patient care with intelligent voice technology that handles appointments, 
          answers medical questions, and provides 24/7 support. Reduce administrative burden 
          while enhancing patient satisfaction.
        </motion.p>
         <Link href="/sign-in">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button onClick={() => router.push("/dashboard")} className="w-60 transform rounded-lg bg-white px-6 py-3 font-medium text-purple-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 shadow-lg">
            Get Started
          </button>
         
        </motion.div>
        </Link>
      </div>
    </div>
  );
}

const Navbar = () => {
  const {user} = useUser();
  const router = useRouter();
  return (
    <nav className="flex w-full items-center justify-between px-4 py-4">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-white/20 backdrop-blur-sm border border-white/30" />
        <h1 className="text-base font-bold md:text-2xl text-white">Avery Ambient</h1>
      </div>
      {!user? 
      <Link href="/sign-in">
      <button className="w-24 transform rounded-lg bg-white px-6 py-2 font-medium text-purple-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 md:w-32">
        Login
      </button>
      </Link>:
      <div className="flex items-center gap-5">
        <UserButton />
      <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
      </div>}
    </nav>
  );
};

