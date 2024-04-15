"use client";
import Nav from "./nav/Nav";
import Image from "next/image";
import Link from "next/link";
import style from "./header.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { overlay } from "@/app/_utils/animations";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={style.header}>
        <div className={style.main}>
          <Link href="/" className="h4">
            <b>Key</b>
          </Link>

          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="b-out"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {open && <Nav key="nav" open={open} setOpen={setOpen} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            variants={overlay}
            initial="closed"
            animate="open"
            exit="closed"
            key="overlay"
            className={style.overlay}
            onClick={() => {
              setOpen(!open);
            }}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
