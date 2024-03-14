"use client";
import { useLoadingFeedback } from "@/context/context";
import style from "./feedback.module.scss";

export default function Feedback() {
  const { feedback, setFeedback } = useLoadingFeedback();

  return (
    <>
      {feedback && (
        <div className={style.feedback}>
          <div className="card">{feedback}</div>
        </div>
      )}
    </>
  );
}
