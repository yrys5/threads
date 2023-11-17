import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { communityTabs } from "@/constants";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";
import { getUserFollows, isFollowed } from "@/lib/actions/follow.actions";


async function Page({params}:{params: {id:string}}) {
    const user = await currentUser();
    if (!user) return null;
    
    const communityDetails = await fetchCommunityDetails(params.id)

    const userFollows = await getUserFollows(communityDetails.id);

    const followed = await isFollowed(user.id, communityDetails.id);

    return (
        <section>
            <ProfileHeader
            accoundId={communityDetails.id}
            authUserId={user.id}
            name={communityDetails.name}
            username={communityDetails.username}
            imgUrl={communityDetails.image}
            bio={communityDetails.bio}
            followersNumber={userFollows?.searchedUser?.followers?.length || 0}
            type="Community"
            isFollowed={followed}
            />
            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {communityTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                <Image
                                src={tab.icon}
                                alt={tab.label}
                                width={24}
                                height={24}
                                className="object-contain"
                                />
                                <p className="max-sm:hidden">{tab.label}</p>
                                {tab.label === 'Threads' && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">{communityDetails?.threads.length}</p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                        <TabsContent value="threads" className="w-full text-light-1">
                            <ThreadsTab
                            currentUserId={user.id}
                            accoundId={communityDetails._id}
                            accountType="Community"
                            />
                        </TabsContent>
                        <TabsContent value="members" className="w-full text-light-1">
                            <section className="mt-9 flex flex-col gap-10">
                                {communityDetails?.members.map((member: any) => (
                                    <UserCard 
                                    key={member.id}
                                    id={member.id}
                                    name={member.name}
                                    username={member.username}
                                    imgUrl={member.image}
                                    personType="User"
                                    />
                                ))}
                            </section>
                        </TabsContent>
                        <TabsContent value="requests" className="w-full text-light-1">
                            <ThreadsTab
                            currentUserId={user.id}
                            accoundId={communityDetails._id}
                            accountType="Community"
                            />
                        </TabsContent>

                </Tabs>
            </div>
        </section>
    )
}

export default Page;