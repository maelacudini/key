"use client";
import { getFilteredReviews } from "@/app/_utils/functions";
import Button from "../../common/button/Button";
import style from "./filter.module.scss";
import { useGeneralContext } from "@/context/context";

export default function Filter() {
  const { input, setInput, setData, setLoading } = useGeneralContext();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    let page = 1;
    const res = await getFilteredReviews(
      page,
      input?.limit,
      input?.keywords,
      input?.createdAt
    );
    setLoading(false);
    setData(res);
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.input}>
        <label htmlFor="createdAt">Order</label>
        <select
          name="createdAt"
          id="createdAt"
          value={input.createdAt}
          onChange={(e) => setInput({ ...input, createdAt: e.target.value })}
        >
          <option value="1">Ascending order</option>
          <option value="-1">Descending order</option>
        </select>
      </div>
      <div className={style.input}>
        <label htmlFor="keywords">Keywords</label>
        <input
          type="text"
          name="keywords"
          placeholder="Search by keywords"
          value={input.keywords}
          onChange={(e) => setInput({ ...input, keywords: e.target.value })}
        />
      </div>
      <Button message={"search"} />
    </form>
  );
}
