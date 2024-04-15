import dynamic from "next/dynamic";
import Inbox from "./_components/home/inbox/Inbox";
import Loading from "./loading";

const DynamicHero = dynamic(() => import('./_components/home/hero/Hero'), {
  loading: () => <Loading />,
})

const DynamicFeatured = dynamic(() => import("./_components/home/featured/Featured"), {
  loading: () => <Loading />,
})

const DynamicSources = dynamic(() => import("./_components/home/sources/Sources"), {
  loading: () => <Loading />,
})

const DynamicTopics = dynamic(() => import("./_components/home/topics/Topics"), {
  loading: () => <Loading />,
})

export default function Home() {
  return (
    <main>
      <DynamicHero />
      <DynamicFeatured />
      <DynamicSources />
      <DynamicTopics />
      <Inbox />
    </main>
  )
}
