"use client";
import Image from "next/image";
import style from "./hero.module.scss";
import noavatar from "../../../../public/noavatar.png";
import { useEffect, useState } from "react";
import { useLoadingFeedback } from "@/context/context";
import { handleEditAvatar, handleEditBio } from "@/app/_utils/serverActions";
import { useFormState } from "react-dom";
import Button from "../../common/button/Button";

const initialState = {
  message: "",
};

export default function Hero({ user }) {
  const { isLoading, setIsLoading, feedback, setFeedback } =
    useLoadingFeedback();
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openBio, setOpenBio] = useState(false);
  const [stateAvatar, formActionAvatar] = useFormState(
    handleEditAvatar,
    initialState
  );
  const [stateBio, formActionBio] = useFormState(handleEditBio, initialState);

  useEffect(() => {
    if (stateAvatar?.message) {
      setFeedback(stateAvatar.message);
    }
    if (stateBio?.message) {
      setFeedback(stateBio.message);
    }
  }, [stateAvatar?.message, stateBio?.message, setFeedback]);

  return (
    <section className={style.hero}>
      <div className={style.header}>
        {user?.avatar ? (
          <Image
            className={style.avatar}
            alt="user"
            src={user?.avatar}
            fill
            loading="eager"
            priority
          />
        ) : (
          <Image
            className={style.noavatar}
            alt="user"
            src={noavatar}
            fill
            loading="eager"
            priority
          />
        )}
        <div className={style.overlay} />
        <p className={`h2 white ${style.username}`}>Hi, {user?.username}</p>
        <button
          className={`b-out ${style.button}`}
          onClick={() => setOpenAvatar(!openAvatar)}
        >
          {openAvatar ? "close" : "edit avatar"}
        </button>
        {openAvatar && (
          <form
            action={formActionAvatar}
            className={style.openAvatar}
            onSubmit={() => setOpenAvatar(!openAvatar)}
          >
            <input
              id="avatar"
              name="avatar"
              type="url"
              placeholder="Select an image"
              required
            />
            <input type="hidden" name="userId" value={user?._id} />
            <Button message={"Send"} />
          </form>
        )}
      </div>

      <div className={style.info}>
        <div className={style.col}>
          <p className="h4">{user?.email}</p>
          {openBio ? (
            <form
              action={formActionBio}
              className={style.openBio}
              onSubmit={() => setOpenBio(!openBio)}
            >
              <textarea
                id="bio"
                name="bio"
                rows="5"
                placeholder="Add or edit your bio"
                minLength={10}
                maxLength={200}
                required
              />
              <input type="hidden" name="userId" value={user?._id} />
              <Button message={"Send"} />
            </form>
          ) : (
            <p>{user?.bio}</p>
          )}
          <button className="b-full" onClick={() => setOpenBio(!openBio)}>
            {openBio ? "close" : "edit bio"}
          </button>
        </div>
      </div>
    </section>
  );
}
