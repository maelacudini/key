"use client";
import { useEffect, useState } from "react";
import style from "./addreview.module.scss";
import { motion } from "framer-motion";
import { slidein } from "@/app/_utils/animations";
import { topics } from "../../home/topics/data";
import Button from "../../common/button/Button";
import { useLoadingFeedback } from "@/context/context";
import { useFormState } from "react-dom";
import { addReview } from "@/app/_utils/serverActions";

const initialState = {
  message: "",
};

export default function Addreview({ userId }) {
  const { isLoading, setIsLoading, feedback, setFeedback } =
    useLoadingFeedback();
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
              cols="30"
              rows="10"
              placeholder="Describe your experience with this book: every thought and emotion counts"
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
            <div className={style.cont}>
              <label htmlFor="keywords">Keywords</label>
              <input type="hidden" name="userId" value={userId} />
              <input type="hidden" name="keywords" value={keywords} />
              <p className="b-out" onClick={() => setOpenChecks(!openChecks)}>
                Select 3 keywords
              </p>
              {openChecks && (
                <div className={style.checks}>
                  <div
                    className={style.overlay}
                    onClick={() => setOpenChecks(!openChecks)}
                  />
                  <div className={`card ${style.card}`}>
                    {topics.map((topic, i) => (
                      <label key={topic + i} id={topic}>
                        {topic}
                        <input
                          onChange={() => handleCheckboxClick(topic)}
                          value={topic}
                          checked={keywords.includes(topic)}
                          type="checkbox"
                        />
                        <span className="checkmark" />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={style.buttons}>
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
