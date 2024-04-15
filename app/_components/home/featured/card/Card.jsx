import style from "./card.module.scss";

export default async function Card({ review }) {
  const date = new Date(review.createdAt).toDateString();

  return (
    <article className={style.card}>
      <div className={style.title}>
        <div className={style.keywords}>
          {review?.keywords?.map((keyword, i) => (
            <small className="black" key={i}>
              {keyword}
            </small>
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
