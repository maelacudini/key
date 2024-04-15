"use client";
import { useEffect, useState } from "react";
import style from "./addreview.module.scss";
import { motion } from "framer-motion";
import { slidein } from "@/app/_utils/animations";
import Button from "../../common/button/Button";
import { useFormState } from "react-dom";
import { addReview } from "@/app/_utils/serverActions";
import { topics } from "@/app/_utils/data";

const initialState = {
  message: "",
};

export default function Addreview({ userId }) {
  const [openForm, setOpenForm] = useState(false);
  const [openChecks, setOpenChecks] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [state, formAction] = useFormState(addReview, initialState);

  const handleCheckboxClick = (topic) => {
    if (keywords.includes(topic)) {
      setKeywords(keywords.filter((keyword) => keyword !== topic));
    } else {
      setKeywords([...keywords, topic]);
    }
  };

  useEffect(() => {
    if (openChecks) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openChecks]);

  return (
    <section className={style.addreview}>
      <div className={style.intro}>
        <h3>Share your opinion</h3>
        <button
          onClick={() => {
            setOpenForm(!openForm);
          }}
          className="b-full"
        >
          {openForm ? "close" : "Add a review"}
        </button>
      </div>

      {openForm && (
        <motion.form
          variants={slidein}
          animate="enter"
          initial="initial"
          exit="exit"
          custom={1}
          key={"form"}
          className={style.form}
          action={formAction}
          onSubmit={() => setOpenForm(!openForm)}
        >
          <div className={style.row}>
            <div className={style.cont}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title of the book"
                required
              />
            </div>
            <div className={style.cont}>
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Author of the book"
                required
              />
            </div>
          </div>
          <div className={style.cont}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="10"
              cols="30"
              placeholder="Describe your experience with this book, every thought and emotion counts"
              required
            />
          </div>
          <div className={style.row}>
            <div className={style.cont}>
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                name="rating"
                id="rating"
                min="0"
                max="10"
                placeholder="0"
                required
              />
            </div>
            <div className={style.cont}>
              <label htmlFor="image">Image</label>
              <input
                type="url"
                id="image"
                name="image"
                placeholder="/book_cover.jpg"
                required
              />
            </div>
          </div>
          <div className={style.cont}>
            <label htmlFor="keywords">Select 3 keywords</label>
            <input type="hidden" name="keywords" value={keywords} />
            <div className={`card ${style.keywords}`}>
              {topics.map((topic, i) => (
                <div key={i} className={style.topic}>
                  <input
                    onChange={() => handleCheckboxClick(topic)}
                    value={topic}
                    checked={keywords.includes(topic)}
                    type="checkbox"
                  />
                  <label className="black" key={topic + i} id={topic}>
                    {topic}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={style.buttons}>
            <input type="hidden" name="userId" value={userId} />
            <Button message={"send"} />
            <button className="b-out" type="reset">
              Reset form
            </button>
          </div>
        </motion.form>
      )}
    </section>
  );
}
