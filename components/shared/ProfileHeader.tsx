import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import { Button } from "../ui/button";

interface Props {
  accoundId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community";
}

const ProfileHeader = ({
  accoundId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start max-sm:px-3 max-sm:mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile Image"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading-3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
        {authUserId === accoundId && (
          <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: { organizationSwitcherTrigger: "py-2 px-4" },
            }}
          />
        )}
      </div>
      {/* {TODO: Community} */}
      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
      <Button className="bg-primary-500 mt-4 w-2/6">Follow</Button>
    </div>
  );
};

export default ProfileHeader;
