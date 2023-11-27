import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getUserFollows, isFollowed } from "@/lib/actions/follow.actions";
import { useEffect } from "react";
import RepostTab from "@/components/shared/RepostTab";

// Dynamic Metadata ==>
type Props = {
  params: { id: string };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { params } = props;
  // const user = await currentUser();

  const userInfo = await fetchUser(params.id);
  return {
    title: `${userInfo?.name} (@${userInfo?.username}) on Thrinks`,
    description: `${userInfo?.bio}`,
  };
};
// Dynamic Metadata <==

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  const userFollows = await getUserFollows(userInfo.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const followed = await isFollowed(user.id, userInfo.id);

  return (
    <section>
      <ProfileHeader
        accoundId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        followersNumber={userFollows?.searchedUser?.followers?.length || 0}
        isFollowed={followed}
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo?.threads.length}
                  </p>
                )}
                {tab.label === "Reposts" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo?.reposts.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {/* {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              <ThreadsTab
                currentUserId={user.id}
                accoundId={userInfo.id}
                accountType="User"
              />
              <RepostTab
                currentUserId={user.id}
                accoundId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))} */}
          <TabsContent
            key="content-threads"
            value="threads"
            className="w-full text-light-1"
          >
            <ThreadsTab
              currentUserId={user.id}
              accoundId={userInfo.id}
              accountType="User"
            />
          </TabsContent>
          <TabsContent
            key="content-reposts"
            value="reposts"
            className="w-full text-light-1"
          >
            <RepostTab
              currentUserId={user.id}
              accoundId={userInfo.id}
              accountType="User"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
