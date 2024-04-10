"use client";
import { useGeneralContext } from "@/context/context";
import style from "./feedback.module.scss";

export default function Feedback() {
  const { feedback, setFeedback } = useGeneralContext();

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
