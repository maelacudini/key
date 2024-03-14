import style from "./footer.module.scss";
import Link from "next/link";
import { cards, socials } from "./data";
import { getAllReviews, getAllUsers } from "@/app/_utils/functions";

export default async function Footer() {
  const users = await getAllUsers();
  const reviews = await getAllReviews();
  const totalUsers = users.length;
  const totalReviews = reviews.length;

  return (
    <footer className={style.footer}>
      <div className={style.row}>
        <div className={style.col}>
          <h4>
            Please note that this website is entirely fictional, and all
            content, including projects, descriptions, and any other information
            presented here, is entirely invented for creative purposes. Any
            resemblance to real persons, living or dead, or actual events is
            purely coincidental.
          </h4>
        </div>
        <div className={style.col}>
          <p className="h4">CONNECT</p>
          <div>
            {socials.map((social, index) => (
              <div key={index}>
                <a href={social.url} className="link">
                  {social.name}
                </a>
              </div>
            ))}
            <Link className="link" href={"/signup"}>
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className={style.cards}>
        {cards.map((card, index) => (
          <div key={index} className={`card ${style.card}`}>
            <p>{card.title}</p>
            <p className="h3">
              {card.title === "Users" ? totalUsers : totalReviews}
            </p>
          </div>
        ))}
      </div>

      <div className={style.bottom}>
        <p className="gray">
          Key 2024 - Do not share personal info - Site by Maela Cudini
        </p>
      </div>
    </footer>
  );
}
