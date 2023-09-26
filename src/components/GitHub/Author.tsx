import React, { useEffect, useState } from "react";
import { Avatar, User } from "@nextui-org/react";
import { fetchGitHubUser } from '../../utils/githubApi';
import { UserCard } from "../Cards/UserCard";
import Dropdown from "../Tooltip/Dropdown";

export const Author = ({ username }) => {
  const [userData, setUserData] = useState(null);

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
    <Dropdown
      open={
          <div className="flex">
            <Avatar src={userData.avatar_url} className="bg-gray-200 dark:bg-gray-700"/>
          </div>
      }
      content={
          <UserCard username={username} />
      }
    />
  );
};
