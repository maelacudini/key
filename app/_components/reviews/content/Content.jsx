import Loading from "@/app/loading";
import style from "./content.module.scss";
import { useLoadingFeedback } from "@/context/context";
import Button from "../../common/button/Button";

export default function Content({ reviews, formAction, pagination }) {
  const { currentPage, totalPages } = pagination;
  const { isLoading, setIsLoading, feedback, setFeedback } =
    useLoadingFeedback();

  if (isLoading) {
    return <Loading />;
  } else if (reviews?.length === 0) {
    return (
      <div className={style.noreviews}>
        <p>No reviews found!</p>
      </div>
    );
  }

  return (
    <section className={style.content}>
      {reviews?.map((review, i) => (
        <p key={i}>{review.title}</p>
      ))}

      {currentPage > 1 && (
        <form action={formAction}>
          <input type="hidden" value={currentPage - 1} name="page" />
          <Button message={"Prev page"} />
        </form>
      )}

      {currentPage < totalPages && (
        <form action={formAction}>
          <input type="hidden" value={currentPage + 1} name="page" />
          <Button message={"Next page"} />
        </form>
      )}
    </section>
  );
}
