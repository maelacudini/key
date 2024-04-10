"use client";
import Content from "../content/Content";
import Filter from "../filter/Filter";
import { useFormState } from "react-dom";
import { filterReviews } from "@/app/_utils/serverActions";
import { useGeneralContext } from "@/context/context";

const initialState = {
  message: "",
};

export default function Container() {
  const { feedback, setFeedback, input, setInput, reviews, setReviews } =
    useGeneralContext();
  const [state, formAction] = useFormState(filterReviews, initialState);

  return (
    <section>
      <Filter formAction={formAction} />
      <Content formAction={formAction} />
    </section>
  );
}
