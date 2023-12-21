"use client";
import Image from "next/image";
import Link from "next/link";

import { formatDateStringUS, formatElapsedTime } from "@/lib/utils";
import OptionsThread from "../forms/OptionsThread";
import { Button } from "../ui/button";
import { useLikes } from "@/lib/context/LikesProvider";
import ShareThread from "../modals/ShareThread";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  likesCount?: number;
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  likesCount,
}: Props) {
  const { likedPosts, repostedPosts, toggleLike, toggleRepost } = useLikes();

  const isLikedByCurrentUser = likedPosts?.includes(id);
  const isRepostedByCurrentUser = repostedPosts?.includes(id);
  const isLiked = likesCount !== undefined && likesCount > 0;

  return (
    <article
      className={`flex w-full flex-col sm:rounded-xl max-sm:p-3 max-sm:border-neutral-900 max-sm:border-t ${
        isComment ? "xs:px-7" : "p-7 sm:bg-dark-2"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-9 w-9">
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                sizes="(max-width: 600px) 100vw, 50vw"
                className="cursor-pointer rounded-full"
              />
            </Link>

           {comments?.length > 0 && <div className="thread-card_bar" />}
          </div>

          <div className="flex w-full flex-col">
            <div className="flex justify-between items-center">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {author.name}
                </h4>
              </Link>

              <div className="flex">
                <h5 className=" text-gray-1 font-light mr-5">
                  {formatElapsedTime(createdAt)}
                </h5>
                <OptionsThread
                  threadId={JSON.stringify(id)}
                  currentUserId={currentUserId}
                  authorId={author.id}
                  parentId={parentId}
                  isComment={isComment}
                />
              </div>
            </div>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "mb-1"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Button
                  className="bg-transparent h-6 w-6"
                  size="icon"
                  onClick={() => toggleLike(id)}
                >
                  <Image
                    src={
                      isLikedByCurrentUser
                        ? "/assets/heart-filled.svg"
                        : "/assets/heart-gray.svg"
                    }
                    alt="heart"
                    width={24}
                    height={24}
                    className={`cursor-pointer object-contain ${
                      isLikedByCurrentUser ? "animate-pulse" : ""
                    }`}
                  />
                </Button>
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Button
                  className="bg-transparent h-6 w-6"
                  size="icon"
                  onClick={() => toggleRepost(id)}
                >
                  <Image
                    src={
                      isRepostedByCurrentUser
                        ? "/assets/repost-red.svg"
                        : "/assets/repost.svg"
                    }
                    alt="repost"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Button>
                <ShareThread id={id} />
              </div>
              {isComment && (
                <div className="flex items-center gap-2">
                  {comments.length > 0 && (
                    <Link href={`/thread/${id}`}>
                      <p className="mt-1 text-subtle-medium text-gray-1">
                        {comments.length} repl
                        {comments.length > 1 ? "ies" : "y"}
                      </p>
                    </Link>
                  )}
                  {isLiked && (
                    <Link href={`/thread/${id}`}>
                      <p
                        className={`mt-1 text-subtle-medium text-gray-1 ${
                          isComment && comments.length > 0 ? "ml-1" : "ml-0"
                        }`}
                      >
                        {likesCount} like{likesCount > 1 ? "s" : ""}
                      </p>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="ml-1.5 mt-3 flex items-center gap-2">
        {!isComment && comments.length > 0 && (
          <>
            {comments.slice(0, 2).map((comment, index) => (
              <Image
                key={index}
                src={comment.author.image}
                alt={`user_${index}`}
                width={24}
                height={24}
                className={`${
                  index !== 0 && "-ml-5"
                } rounded-full object-cover h-6`}
              />
            ))}
            <Link href={`/thread/${id}`}>
              <p
                className={`mt-1 text-subtle-medium text-gray-1 ${
                  comments.length === 1 ? "ml-3" : ""
                }`}
              >
                {comments.length} repl{comments.length > 1 ? "ies" : "y"}
              </p>
            </Link>
          </>
        )}
        {!isComment && isLiked && (
          <Link href={`/thread/${id}`}>
            <p
              className={`mt-1 text-subtle-medium text-gray-1 ${
                comments.length > 0 ? "ml-1" : "ml-11"
              }`}
            >
              {likesCount} like{likesCount > 1 ? "s" : ""}
            </p>
          </Link>
        )}
      </div>

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateStringUS(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;
