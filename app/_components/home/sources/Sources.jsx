import style from "./sources.module.scss";
import { getAllUsers } from "@/app/_utils/functions";
import Swpr from "./swpr/Swpr";

export default async function Sources() {
  const { users, pagination } = await getAllUsers(1, 10);

  return (
    <section id="sources" className={style.sources}>
      <h2>Sources</h2>
      <p className="italic">
        Voices from avid readers like you. No need to sign up—dive into reviews
        and discover your next favorite book.
      </p>
      {users ? (
        <Swpr users={users} />
      ) : (
        <div className={style.nouser}>
          <p className="h2">No users found.</p>
        </div>
      )}
    </section>
  );
}
