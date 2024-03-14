import style from "./topic.module.scss";
import { getTopic } from "@/app/_utils/functions";

export default async function Topic({ params }) {
  const topic = params.slug[0];

  const response = await getTopic(topic);
  const reviews = response.reviews;

  if (!reviews) {
    return (
      <div className={style.notopic}>
        <h1>No reviews for this topic.</h1>
      </div>
    );
  }

  return (
    <main>
      {reviews.map((review, index) => (
        <p key={index}>{review.title}</p>
      ))}
    </main>
  );
}
