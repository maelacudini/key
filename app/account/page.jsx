import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getReviews, getUser } from "@/app/_utils/functions";
import { getServerSession } from "next-auth";
import Hero from "@/app/_components/account/hero/Hero";
import Reviews from "@/app/_components/account/reviews/Reviews";
import Addreview from "@/app/_components/account/addreview/Addreview";
import { revalidateTag } from "next/cache";
import Delete from "../_components/account/delete/Delete";

export default async function Account() {
  const session = await getServerSession(authOptions);
  const user = await getUser(session?.user?.id);
  const reviews = await getReviews(user?._id);

  async function action(tag) {
    "use server";
    revalidateTag(tag);
  }

  return (
    <main>
      <Hero user={user} />
      <Reviews userId={user?._id} reviews={reviews} />
      <Addreview userId={user?._id} />
      <Delete userId={user?._id} />
    </main>
  );
}
