"use client";
import React, { useState, useEffect } from "react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  addFollow,
  isFollowed,
  removeFollow,
} from "@/lib/actions/follow.actions";
import { EditProfile } from "../forms/EditProfile";

interface Props {
  accoundId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community";
  followersNumber: string;
  isFollowed: boolean;
}

const ProfileHeader = ({
  accoundId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  followersNumber,
  isFollowed,
}: Props) => {

  const [isUserFollowed, setIsUserFollowed] = useState<boolean>(isFollowed);

  const handleFollow = async () => {
    await addFollow(authUserId, accoundId);
    setIsUserFollowed(true);
  };

  const handleRemoveFollow = async () => {
    await removeFollow(authUserId, accoundId);
    setIsUserFollowed(false);
  };

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
      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio ? bio : ""}</p>
      <p className="mt-6 max-w-lg text-base-regular text-gray-600">
        {followersNumber || 0} followers
      </p>
      {authUserId !== accoundId ?
        (isUserFollowed ? (
          <Button
            onClick={handleRemoveFollow}
            className="bg-primary-500 mt-4 w-2/6"
          >
            Remove follow
          </Button>
        ) : (
          <Button onClick={handleFollow} className="bg-primary-500 mt-4 w-2/6">
            Follow
          </Button>
        ))
      : <></> 
      // TODO: Add EditProfile.tsx
      }
    </div>
  );
};

export default ProfileHeader;
