import { getUser } from "@/app/_utils/functions";
import style from "./card.module.scss";
import Image from "next/image";

export default async function Card({ review }) {
  const date = new Date(review.createdAt).toDateString();
  return (
    <article className={style.card}>
      <div className={style.intro}>
        <div className={style.keywords}>
          {review.keywords.slice(0, 3).map((keyword, index) => (
            <small className={style.key} key={index}>
              {keyword}
            </small>
          ))}
        </div>
        <p className="h3">{review.title}</p>
        <p>
          {review.description.length < 100
            ? review.description
            : review.description.slice(0, 200) + "..."}
        </p>
      </div>

      <div className={style.info}>
        <p>{date}</p>
        <p className={style.rating}>RATING: {review.rating}</p>
      </div>
    </article>
  );
}
