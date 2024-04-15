"use client";
import { deleteAccount } from "@/app/_utils/serverActions";
import style from "./delete.module.scss";
import { useFormState } from "react-dom";
import { useState } from "react";
import Button from "../../common/button/Button";
import { signOut } from "next-auth/react";

const initialState = {
  message: "",
};

export default function Delete({ userId }) {
  const [state, formAction] = useFormState(deleteAccount, initialState);
  const [password, setPassword] = useState("");

  return (
    <section className={style.delete}>
      <p className="h3">Delete your account</p>
      <form
        action={formAction}
        className={style.form}
        onSubmit={() => signOut()}
      >
        <div className={style.input}>
          <label htmlFor="password">Password</label>
          <input type="hidden" name="userId" id="userId" value={userId} />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="To proceed, type your current password"
            required
          />
        </div>
        <Button message={"delete account"} />
      </form>
    </section>
  );
}
