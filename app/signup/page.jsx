"use client";
import { useRouter } from "next/navigation";
import style from "./signup.module.scss";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [feedback, setFeedback] = useState(null);
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { email, password, username } = input;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email.trim() || !emailPattern.test(email)) {
      setFeedback("Please enter a valid email.");
      setTimeout(() => {
        setFeedback(null);
      }, 3000);
      return;
    }

    if (!password.trim() || !passwordPattern.test(password)) {
      setFeedback(
        "Password must have at least one uppercase letter, one lowercase letter, one digit, one special character, minimum length of 8 characters"
      );
      setTimeout(() => {
        setFeedback(null);
      }, 5000);
      return;
    }

    if (!username.trim()) {
      setFeedback("Please enter a valid username.");
      setTimeout(() => {
        setFeedback(null);
      }, 3000);
      return;
    }

    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
      headers: {
        "Content-Type": "Application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json();
      setFeedback(data.message);
      setTimeout(() => {
        setFeedback(null);
      }, 3000);
      throw new Error("Something went wrong: ", res.status);
    }

    router.push("/login");
  };

  return (
    <main className={style.signup}>
      <form onSubmit={handleSubmit} className={`card ${style.form}`}>
        <h3 className="italic">Signup</h3>
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
          <label htmlFor="username">Username</label>
          <input
            placeholder="Your Username"
            type="text"
            minLength={3}
            required
            value={username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
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
        {feedback && <span className={style.feedback}>{feedback}</span>}
        <button type="submit" className="b-full">
          Submit
        </button>
        <small>
          Already have an account? <Link href="/login">Login</Link>
        </small>
      </form>
    </main>
  );
}
