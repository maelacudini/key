import style from "./reviews.module.scss";
import Review from "./review/Review";

export default function Reviews({ reviews, userId }) {
  return (
    <section className={style.reviews}>
      <h3>Your Reviews</h3>

      <div className={style.reviewlist}>
        {reviews.length !== 0 ? (
          reviews.map((review, index) => (
            <Review review={review} key={index} index={index} userId={userId} />
          ))
        ) : (
          <p className={style.noreviews}>No reviews yet!</p>
        )}
      </div>
    </section>
  );
}
