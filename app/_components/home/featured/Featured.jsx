import Link from "next/link";
import style from "./featured.module.scss";
import { getAllReviews } from "@/app/_utils/functions";
import Swpr from "./swpr/Swpr";

export default async function Featured() {
  const { reviews, pagination } = await getAllReviews(1, 10);

  if (!reviews) {
    <div className={style.noreviews}>
      <h3>No Featured Reviews found.</h3>
    </div>;
  }

  return (
    <section id="featured" className={`card ${style.featured}`}>
      <p className="h2">Featured Reviews</p>
      <Link href="/reviews" className="b-full">
        View All Reviews
      </Link>

      <Swpr reviews={reviews} />
    </section>
  );
}
