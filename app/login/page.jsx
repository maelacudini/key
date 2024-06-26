"use client";
import { useState } from "react";
import style from "./login.module.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGeneralContext } from "@/context/context";

export default function Login() {
  const router = useRouter();
  const { feedback, setFeedback, loading, setLoading } = useGeneralContext();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { email, password } = input;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res.ok) {
        setFeedback("Please enter valid credentials.");
        setLoading(false);
        return;
      }

      router.push("/account");
      setLoading(false);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  return (
    <main className={style.login}>
      <form onSubmit={handleSubmit} className={`card ${style.form}`}>
        <h3 className="italic">Login</h3>
        <div className={style.cont}>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Your Email"
            type="email"
            required
            value={email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
        </div>
        <div className={style.cont}>
          <label htmlFor="password">Password</label>
          <input
            placeholder="Your Password"
            type="password"
            value={password}
            required
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
        </div>
        {feedback && <span>{feedback}</span>}
        <button type="submit" className="b-full" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
        <div className={style.end}>
          <p className="gray">Don't have an account? </p>
          <Link className="link" href="/signup">
            Signup
          </Link>
        </div>
      </form>
    </main>
  );
}
