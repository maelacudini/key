import Image from "next/image";
import style from "./card.module.scss";

export default function Card({ user }) {
  const actualBio = user?.bio?.slice(0, 200);

  return (
    <div className={`card ${style.card}`}>
      <div className={style.user}>
        <Image
          className={style.avatar}
          alt="avatar"
          src={user?.avatar ? user?.avatar : "/noavatar.png"}
          height={100}
          width={100}
        />
        <span>{user.reviews.length} reviews</span>
        <p className="h4">{user.username}</p>
        <p className="gray">
          {user?.bio ? actualBio : `${user?.username} has no bio yet!`}
        </p>
      </div>

      <div className={style.bottom}>
        <div className={style.social}>
          <a className="white" href="/">
            Instagram
          </a>
          <Image alt="arrow" src="/arrow.svg" height={20} width={20} />
        </div>
        <div className={style.social}>
          <a className="white" href="/">
            Twitter
          </a>
          <Image alt="arrow" src="/arrow.svg" height={20} width={20} />
        </div>
      </div>
    </div>
  );
}
