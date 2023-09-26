import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { fetchGitHubUser } from '../../utils/githubApi';
import Hover from "../Tooltip/Tooltip";
import { UserLink, X } from "../icons";

export const UserCard = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGitHubUser(username);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching GitHub user:', error);
      }
    };

    fetchData();
  }, [username]);

  if (!userData) {
    return null; 
  }

  return (
    <Card shadow="none" className="w-full md:max-w-[300px] mb-8 md:mb-0 border-none bg-transparent -mx-2">
      <CardHeader className="justify-between ">
        <div className="flex gap-3">
          <Avatar className="bg-gray-200 dark:bg-gray-700" src={userData.avatar_url} alt={userData.login} />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-black dark:text-white">{userData.name || ''}</h4>
            <Link href={`https://github.com/${userData.login}`} target="_blank" aria-label={userData.login}>
              <h5 className="text-small tracking-tight text-default-500 dark:text-gray-400">@{userData.login}</h5>
            </Link>
          </div>
        </div>
        <Hover tipChildren="In Development">
          <Button
            className={isFollowed ? "bg-transparent text-foreground dark:text-white border-default-200" : ""}
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </Hover>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-small pl-px text-default-500 dark:text-gray-200">
          {userData.bio || 'Sorry, it appears that my GitHub bio is on a coffee break! ☕️'}
        </p>
      </CardBody>
      <CardFooter className="gap-3 text-default-foreground justify-between">
        <div className="flex space-x-2">
        <div className="flex gap-1">
          <p className="font-semibold text-small">{userData.following}</p>
          <p className="text-small">Following</p>
        </div>
        <span className="mx-1">|</span>
        <div className="flex gap-1">
          <p className="font-semibold text-small">{userData.followers}</p>
          <p className="text-small">Followers</p>
        </div> 
        </div>
        <div className="flex space-x-3">
          {userData.twitter_username && (
            <Hover tipChildren="Flollow on X">
            <Link href={`https://twitter.com/${userData.twitter_username}`} target="_blank">
              <X />
            </Link>
          </Hover>
          )}
          {userData.blog && (
            <Hover tipChildren="Visit Profile">
            <Link href={userData.blog.startsWith("http") ? userData.blog : `https://${userData.blog}`} target="_blank">
              <UserLink />
            </Link>
            </Hover>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
