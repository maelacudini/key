import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import style from "./nav.module.scss";
import Link from "next/link";
import Image from "next/image";
import { navMenu, slidein } from "@/app/_utils/animations";

export default function Nav({ setOpen, open }) {
  const { data: session, status } = useSession();
  const date = new Date().toDateString();
  const time = new Date().toLocaleTimeString().slice(0, 5);

  const links = [
    { url: "/", name: "Home" },
    {
      url: status === "authenticated" ? "/account" : "/login",
      name: status === "authenticated" ? "Account" : "Login",
    },
    { url: "/reviews", name: "Reviews" },
    ...(status === "unauthenticated"
      ? [{ url: "/signup", name: "Signup" }]
      : []),
    ...(status === "authenticated" ? [{ url: "", name: "Logout" }] : []),
  ];

  return (
    <motion.nav
      className={style.nav}
      variants={navMenu}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <motion.div
        variants={slidein}
        initial="initial"
        animate="enter"
        exit="exit"
        custom={0}
        onClick={() => {
          setOpen(!open);
        }}
        className={style.close}
      >
        <p className="link">Close</p>
        <Image
          alt="close"
          src="/close.svg"
          width={25}
          height={25}
          loading="lazy"
        />
      </motion.div>
      <div className={style.links}>
        {links.map((link, index) => (
          <motion.div
            variants={slidein}
            initial="initial"
            animate="enter"
            exit="exit"
            custom={index + 1}
            key={index}
            onClick={() => {
              {
                link.name === "Logout" && signOut();
              }
              setOpen(!open);
            }}
          >
            <Link className="h2 link italic" href={link.url}>
              {link.name}
            </Link>
          </motion.div>
        ))}
      </div>
      <motion.div
        variants={slidein}
        initial="initial"
        animate="enter"
        exit="exit"
        custom={5}
        className={style.date}
      >
        <p>{date}</p>
        <p>{time}</p>
      </motion.div>
    </motion.nav>
  );
}
