"use client";
import style from "./content.module.scss";
import { useGeneralContext } from "@/context/context";
import { getFilteredReviews } from "@/app/_utils/functions";
import Loading from "@/app/loading";
import Image from "next/image";
import Review from "../../common/review/Review";

export default function Content() {
  const { data, setData, input, loading, setLoading } = useGeneralContext();
  const reviews = data?.reviews;
  const pagination = data?.pagination;

  if (loading) {
    return <Loading />;
  } else if (reviews?.length === 0) {
    return (
      <div className={style.noreviews}>
        <p>No reviews found!</p>
      </div>
    );
  }

  async function handleNextPage() {
    setLoading(true);
    const res = await getFilteredReviews(
      pagination?.currentPage + 1,
      input?.limit,
      input?.keywords,
      input?.createdAt
    );
    setLoading(false);
    setData(res);
  }

  async function handlePrevPage() {
    setLoading(true);
    const res = await getFilteredReviews(
      pagination?.currentPage - 1,
      input?.limit,
      input?.keywords,
      input?.createdAt
    );
    setLoading(false);
    setData(res);
  }

  return (
    <section className={style.content}>
      <div className={style.reviews}>
        {reviews?.map((review) => (
          <Review key={review?._id} review={review} />
        ))}
      </div>
      <div className={style.pagination}>
        <button
          className="b-yellow"
          disabled={pagination?.currentPage > 1 ? false : true}
          onClick={handlePrevPage}
        >
          <Image alt="prev" src={"/arrow.svg"} width={25} height={25} />
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
          <Image alt="prev" src={"/arrow.svg"} width={25} height={25} />
        </button>
      </div>
    </section>
  );
}
