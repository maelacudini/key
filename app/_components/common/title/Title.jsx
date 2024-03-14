"use client";
import style from "./title.module.scss";
import { titleAnim } from "@/app/_utils/animations";
import { motion } from "framer-motion";

export default function Title({ phrase }) {
  const words = phrase.split(" ");

  return (
    <div className={style.title}>
      {words.map((word, index) => (
        <span key={index + 1} className={style.wordContainer}>
          <motion.h1
            variants={titleAnim}
            initial="initial"
            whileInView="animate"
            custom={index + 1}
          >
            {word}
          </motion.h1>
        </span>
      ))}
    </div>
  );
}
