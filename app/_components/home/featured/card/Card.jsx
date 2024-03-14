import { getUser } from "@/app/_utils/functions";
import style from "./card.module.scss";
import Image from "next/image";

export default async function Card({ review }) {
  const author = await getUser(review?.user);

  return (
    <article className={style.card}>
      <div className={style.intro}>
        <div className={style.keywords}>
          {review.keywords.map((keyword, index) => (
            <small className={style.key} key={index}>
              {keyword}
            </small>
          ))}
        </div>
        <p className="h3">{review.title}</p>
        <p>
          {review.description.length < 100
            ? review.description
            : review.description.slice(0, 100) + "..."}
        </p>
        <p className={`h4 ${style.rating}`}>{review.rating}/10</p>
      </div>

      <div className={style.info}>
        <p>SOURCED FROM</p>
        <div className={style.user}>
          <div>
            <Image
              src={author?.avatar}
              alt="author avatar"
              width={50}
              height={50}
            />
            <p className={style.author}>{author?.username}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
