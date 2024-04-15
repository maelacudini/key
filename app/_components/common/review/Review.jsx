import style from "./review.module.scss";

export default function Review({ review }) {
  return (
    <article className={`card ${style.review}`}>
      <div className={style.title}>
        <div className={style.keywords}>
          {review?.keywords.map((keyword, i) => (
            <p key={i}>{keyword}</p>
          ))}
        </div>
        <div className={style.intro}>
          <p className="h4">{review?.title}</p>
          <p>{review?.rating} / 10</p>
        </div>
        <p>By {review?.author}</p>
      </div>
      <div className={style.description}>
        <p className="italic">{review?.description}</p>
      </div>
    </article>
  );
}
