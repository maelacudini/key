import Link from "next/link";
import style from "./featured.module.scss";
import { getAllReviews } from "@/app/_utils/functions";
import Swpr from "./swpr/Swpr";

export default async function Featured() {
  const reviews = await getAllReviews();

  if (!reviews) {
    <div className={style.noreviews}>
      <h3>No Featured Reviews found.</h3>
    </div>;
  }

  return (
    <section id="featured" className={style.featured}>
      <h2>Featured Reviews</h2>
      <Link href="/reviews" className="b-full">
        View All Reviews
      </Link>

      <Swpr reviews={reviews} />
    </section>
  );
}
