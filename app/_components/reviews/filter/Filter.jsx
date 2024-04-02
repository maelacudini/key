import { useState } from "react";
import Button from "../../common/button/Button";
import style from "./filter.module.scss";
import { topics } from "../../home/topics/data";

export default function Filter({ formAction }) {
  const [keywords, setKeywords] = useState([]);
  const [open, setOpen] = useState(false);

  const handleCheckboxClick = (topic) => {
    if (keywords.includes(topic)) {
      setKeywords(keywords.filter((keyword) => keyword !== topic));
    } else {
      setKeywords([...keywords, topic]);
    }
  };

  return (
    <form action={formAction} className={style.form}>
      <div className={style.cont}>
        <div className={style.input}>
          <label htmlFor="createdAt">Order</label>
          <select name="createdAt" id="createdAt">
            <option value="1">Ascending order</option>
            <option value="-1">Descending order</option>
          </select>
        </div>
        <div className={style.input}>
          <input type="hidden" name="keywords" value={keywords} />
          <p className="b-out" onClick={() => setOpen(!open)}>
            {open ? "close" : "filter by keywords"}
          </p>
          {open && (
            <div className={style.keyword}>
              {topics.map((topic, i) => (
                <label key={topic + i}>
                  {topic}
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxClick(topic)}
                    checked={keywords.includes(topic)}
                  />
                  <span className="checkmark" />
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <Button message={"send"} />
    </form>
  );
}
