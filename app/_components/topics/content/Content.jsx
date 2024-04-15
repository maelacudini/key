"use client";
import { useEffect, useState } from "react";
import Review from "../../common/review/Review";
import style from "./content.module.scss";
import { getTopic } from "@/app/_utils/functions";
import { topics } from "@/app/_utils/data";

export default function Content({ data, topic }) {
  const [actualTopic, setActualTopic] = useState(topic);
  const [reviews, setReviews] = useState(data?.reviews);
  const [pagination, setPagination] = useState({
    currentPage: parseInt(data?.pagination?.currentPage),
    totalPages: data?.pagination?.totalPages,
    totalReviews: data?.pagination?.totalReviews,
  });

  async function loadMore() {
    try {
      const nextPage = parseInt(pagination?.currentPage) + 1;
      const res = await getTopic(topic, nextPage, 10);
      setReviews((prevReviews) => [...prevReviews, ...res?.reviews]);
      setPagination({
        currentPage: parseInt(res?.pagination?.currentPage),
        totalPages: res?.pagination?.totalPages,
        totalReviews: res?.pagination?.totalReviews,
      });
    } catch (error) {
      console.error("Error loading more reviews:", error);
    }
  }

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        pagination.currentPage < pagination.totalPages
      ) {
        loadMore();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pagination.currentPage, pagination.totalPages]);

  async function changeTopic(e) {
    setActualTopic(e);
    const res = await getTopic(e, pagination.currentPage, 10);
    setReviews(res?.reviews);
    setPagination({
      currentPage: parseInt(res?.pagination?.currentPage),
      totalPages: res?.pagination?.totalPages,
      totalReviews: res?.pagination?.totalReviews,
    });
  }

  return (
    <section className={style.content}>
      <p className="h2">
        Reviews for <span className="italic">{actualTopic}</span>
      </p>
      <div className={style.topic}>
        <p>Switch topic</p>
        <select
          name="topic"
          id="topic"
          onChange={(e) => changeTopic(e.target.value)}
        >
          {topics.map((t, i) => (
            <option value={t} key={i}>
              {t}
            </option>
          ))}
        </select>
      </div>
      {reviews?.length !== 0 ? (
        reviews?.map((review) => (
          <div className={style.reviews}>
            <Review key={review?._id} review={review} />{" "}
          </div>
        ))
      ) : (
        <div className="card">
          <p>
            No reviews for <span className="italic">{actualTopic}</span>!
          </p>
        </div>
      )}
    </section>
  );
}
