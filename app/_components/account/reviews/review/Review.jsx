"use client";
import Button from "@/app/_components/common/button/Button";
import style from "./review.module.scss";
import { slidein } from "@/app/_utils/animations";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useFormState } from "react-dom";
import { deleteReview } from "@/app/_utils/serverActions";

const initialState = {
  message: "",
};

export default function Review({ review, index, userId }) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(deleteReview, initialState);
  const reviewId = review?._id;

  return (
    <motion.div
      variants={slidein}
      animate="enter"
      initial="initial"
      viewport={{ once: true }}
      custom={index + 1}
      key={index}
      onClick={() => {
        setOpen(!open);
      }}
      className={style.review}
    >
      <div className={style.intro}>
        <p className="h4">{review.title}</p>
        <motion.img
          alt="arrow"
          src="/arrow.svg"
          height={"25px"}
          width={"25px"}
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.5 }}
          loading="lazy"
        />
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <div
            variants={slidein}
            whileInView="enter"
            initial="initial"
            exit="exit"
            custom={index + 1}
            className={style.details}
          >
            <p className="italic">{review.description}</p>
            <form action={formAction}>
              <input type="hidden" name="reviewId" value={reviewId} />
              <input type="hidden" name="userId" value={userId} />
              <Button message={"Delete review"} />
            </form>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
