import style from "./topic.module.scss";
import { getTopic } from "@/app/_utils/functions";
import Content from "@/app/_components/topics/content/Content";

export default async function Topic({ params }) {
  const topic = params.slug[0];
  const data = await getTopic(topic, 1, 10);

  if (!data?.reviews) {
    return (
      <div className={style.notopic}>
        <h1>No reviews for this topic.</h1>
      </div>
    );
  }

  return (
    <main className={style.topics}>
      <Content data={data} topic={topic} />
    </main>
  );
}
