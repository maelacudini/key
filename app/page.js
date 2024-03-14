import dynamic from "next/dynamic";
import Inbox from "./_components/home/inbox/Inbox";

const DynamicHero = dynamic(() => import('./_components/home/hero/Hero'), {
  loading: () => <p>Loading...</p>,
})

const DynamicFeatured = dynamic(() => import("./_components/home/featured/Featured"), {
  loading: () => <p>Loading...</p>,
})

const DynamicSources = dynamic(() => import("./_components/home/sources/Sources"), {
  loading: () => <p>Loading...</p>,
})

const DynamicTopics = dynamic(() => import("./_components/home/topics/Topics"), {
  loading: () => <p>Loading...</p>,
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
