import style from "./content.module.scss";
import { useGeneralContext } from "@/context/context";
import Button from "../../common/button/Button";
import { getFilteredReviews } from "@/app/_utils/functions";

export default function Content({ formAction }) {
  const { feedback, setFeedback, data, setData, input, setInput } =
    useGeneralContext();
  const reviews = data?.reviews;
  const pagination = data?.pagination;

  if (reviews?.length === 0) {
    return (
      <div className={style.noreviews}>
        <p>No reviews found!</p>
      </div>
    );
  }

  async function handleNextPage() {
    // setInput({ ...input, page: pagination?.currentPage + 1 });
    const res = await getFilteredReviews(
      pagination?.currentPage + 1,
      input?.limit,
      input?.keywords,
      input?.createdAt
    );
    setData(res);
  }

  async function handlePrevPage() {
    // setInput({ ...input, page: pagination?.currentPage - 1 });
    const res = await getFilteredReviews(
      pagination?.currentPage - 1,
      input?.limit,
      input?.keywords,
      input?.createdAt
    );
    setData(res);
  }

  return (
    <section className={style.content}>
      <div className={style.reviews}>
        {reviews?.map((review, i) => (
          <p key={i}>
            {review.title} / {review?.createdAt}
          </p>
        ))}
      </div>
      <div className={style.pagination}>
        <button
          className="b-yellow"
          disabled={pagination?.currentPage > 1 ? false : true}
          onClick={handlePrevPage}
        >
          prev
        </button>
        <p>
          {pagination?.currentPage} / {pagination?.totalPages}
        </p>
        <button
          className="b-yellow"
          disabled={
            pagination?.currentPage < pagination?.totalPages ? false : true
          }
          onClick={handleNextPage}
        >
          next
        </button>
      </div>
    </section>
  );
}
