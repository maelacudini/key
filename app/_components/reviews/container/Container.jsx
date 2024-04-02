"use client";
import Content from "../content/Content";
import Filter from "../filter/Filter";
import { useFormState } from "react-dom";
import { filterReviews } from "@/app/_utils/serverActions";
import { useEffect, useState } from "react";
import { useLoadingFeedback } from "@/context/context";

const initialState = {
  message: "",
};

export default function Container() {
  const { isLoading, setIsLoading, feedback, setFeedback } =
    useLoadingFeedback();
  const [state, formAction] = useFormState(filterReviews, initialState);
  const [reviews, setReviews] = useState();
  const [pagination, setPagination] = useState();

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const data = await filterReviews();
        setReviews(data.reviews);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section>
      <Filter formAction={formAction} />
      <Content
        reviews={state.reviews ? state.reviews : reviews}
        formAction={formAction}
        pagination={pagination ? pagination : 1}
      />
    </section>
  );
}
