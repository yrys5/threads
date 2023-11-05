import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Search on Thrinks",
  description:
    "Explore and discover a world of content and connections on Thrinks. Join our vibrant community to connect, share, and stay updated with the latest trends, news, and stories from around the globe. Sign up for free and start exploring today!",
};

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user)
    return (
      <p className="text-light-1">
        We're sorry, but to view this content, please log in to your account. If
        you don't have an account yet, you can sign up for free.
      </p>
    );

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch users
  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <Searchbar routeType="search" />
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
