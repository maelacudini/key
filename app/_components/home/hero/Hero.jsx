import Link from "next/link";
import style from "./hero.module.scss";
import Title from "../../common/title/Title";

export default function Hero() {
  return (
    <section className={`card ${style.hero}`}>
      <p className="italic">A free community resource.</p>
      <Title
        phrase={
          "Share your opinion on books you've read or simply look for your next great read"
        }
      />
      <div className={style.buttons}>
        <Link href="/reviews" className="b-full">
          Read reviews
        </Link>
        <Link href="signup" className="b-out">
          Signup
        </Link>
      </div>
    </section>
  );
}
