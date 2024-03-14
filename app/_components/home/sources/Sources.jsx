import style from "./sources.module.scss";
import { getAllUsers } from "@/app/_utils/functions";
import Swpr from "./swpr/Swpr";

export default async function Sources() {
  const users = await getAllUsers();

  if (!users) {
    return (
      <div className={style.nouser}>
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <section id="sources" className={style.sources}>
      <h2>Sources</h2>
      <p className="italic">
        Voices from avid readers like you. No need to sign up—dive into reviews
        and discover your next favorite book.
      </p>
      <Swpr users={users} />
    </section>
  );
}
