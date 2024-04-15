"use client";
import Image from "next/image";
import style from "./hero.module.scss";
import { useState } from "react";
import { useGeneralContext } from "@/context/context";
import { handleEditAvatar, handleEditBio } from "@/app/_utils/serverActions";
import { useFormState } from "react-dom";
import Button from "../../common/button/Button";

const initialState = {
  message: "",
};

export default function Hero({ user }) {
  const { feedback, setFeedback } = useGeneralContext();
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openBio, setOpenBio] = useState(false);
  const [stateAvatar, formActionAvatar] = useFormState(
    handleEditAvatar,
    initialState
  );
  const [stateBio, formActionBio] = useFormState(handleEditBio, initialState);

  return (
    <section className={style.hero}>
      <div className={style.header}>
        <Image
          className={style.avatar}
          alt="user"
          src={user?.avatar ? user?.avatar : "/noavatar.png"}
          fill
          loading="eager"
          priority
          style={{ objectFit: user?.avatar ? "cover" : "contain" }}
        />

        <div className={style.overlay} />
        <p className={`h2 white ${style.username}`} style={{ top: "2rem" }}>
          Hi, {user?.username}
        </p>
        <button
          className={`b-out ${style.button}`}
          style={{ bottom: "2rem" }}
          onClick={() => setOpenAvatar(!openAvatar)}
        >
          {openAvatar ? "close" : "edit avatar"}
        </button>
        {openAvatar && (
          <form
            action={formActionAvatar}
            className={style.openAvatar}
            onSubmit={() => {
              setOpenAvatar(!openAvatar);
              setFeedback(stateAvatar?.message);
            }}
          >
            <input
              id="avatar"
              name="avatar"
              type="url"
              placeholder="Select an image"
            />
            <input type="hidden" name="userId" value={user?._id} />
            <Button message={"Send"} />
          </form>
        )}
      </div>

      <div className={style.info}>
        <div className={style.col} />
        <div className={style.col}>
          <p className="h4">{user?.email}</p>
          {openBio ? (
            <form
              action={formActionBio}
              className={style.openBio}
              onSubmit={() => {
                setOpenBio(!openBio);
                setFeedback(stateBio?.message);
              }}
            >
              <textarea
                id="bio"
                name="bio"
                rows="5"
                placeholder="Add or edit your bio, must be under 200 characters"
                minLength={10}
                maxLength={200}
                required
              />
              <input type="hidden" name="userId" value={user?._id} />
              <Button message={"Send"} />
            </form>
          ) : (
            <p>{user?.bio ? user?.bio : "No bio yet!"}</p>
          )}
          <div className={style.openbiobutton}>
            <button className="b-full" onClick={() => setOpenBio(!openBio)}>
              {openBio ? "close" : "edit bio"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
