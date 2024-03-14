"use client";
import { topics } from "./data";
import { motion } from "framer-motion";
import style from "./topic.module.scss";
import { slidein } from "@/app/_utils/animations";

export default function Topics() {
  return (
    <section className={style.topics}>
      <h2>Reviews By Keyword</h2>
      <div className={style.inner}>
        {topics.map((topic, index) => (
          <motion.a
            href={`/topics/${topic.toLowerCase()}`}
            key={index}
            custom={index + 1}
            variants={slidein}
            initial="initial"
            whileInView="enter"
            viewport={{ once: true }}
            className={style.topic}
          >
            {topic.toUpperCase()}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
