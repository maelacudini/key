import Link from "next/link";
import style from "./inbox.module.scss";
import Image from "next/image";

export default function Inbox() {
  return (
    <section className={`card ${style.inbox} `}>
      <h2>Get Key In Your Inbox</h2>

      <p className="italic">
        A bi-​​weekly digest with the latest key takeaways.
      </p>

      <div className={style.input}>
        <input type="email" placeholder="Your email address" />
        <button className="b-out">SUBSCRIBE</button>
      </div>

      <div className={style.socials}>
        <div className={style.socialsIntro}>
          <p>Get Key in your feed</p>
          <Image alt="arrow" src="/arrow.svg" width={25} height={25} />
        </div>
        <div className={style.btns}>
          <Link href="insta" className="b-out">
            Instagram
          </Link>
          <Link href="insta" className="b-full">
            Twitter
          </Link>
        </div>
      </div>
    </section>
  );
}
