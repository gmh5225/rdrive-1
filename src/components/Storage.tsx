import { Divider, Progress } from "@nextui-org/react";
import Dropdown from "./Tooltip/Dropdown";
import { useDriveStorage, useFolderSize } from "../utils/useDriveStorage";
import { humanFileSize } from "../utils/fileDetails";
import { BsApple, BsHddFill } from "react-icons/bs";
import { TbApps, TbDeviceGamepad2 } from "react-icons/tb";

const Storage = ({ token }) => {

  const { quota } = useDriveStorage(token);

  const Apps = "RDRIVE/Apps";
  const Apple = "RDRIVE/Apple";
  const Games = "RDRIVE/Games";
  const { folderSize: folderSize1, } = useFolderSize(token, Apps);
  const { folderSize: folderSize2, } = useFolderSize(token, Apple);
  const { folderSize: folderSize3, } = useFolderSize(token, Games);

  return (
    <Dropdown
      open={<div>Storage</div>}
      content={
       <main className="w-full md:w-[300px]  mb-2">
            {/*RDRIVE */}
            <div>
              <div className="flex items-center my-2 justify-between">
                  <p className="flex items-center gap-2 tracking-wider">
                  <BsHddFill size={24}/> RDRIVE (C:)
                  </p>
                  <h1>
                  {humanFileSize(quota.used)} {" "}
                    <span className="text-sm">used</span>
                  </h1>
              </div>
                  <Progress
                    size="md"
                    color="success"
                    value={quota.percentageUsed}
                  />
                   <h1 className="text-sm ml-1 mt-1 tracking-wider">
              {humanFileSize(quota.remaining)} free of {" "}
              <span className=" ">
                {humanFileSize(quota.total)}
              </span>
            </h1>
            </div>       
            <Divider className="my-3 dark:bg-gray-700" />
          {/*Apple */}
            <div>
              <div className="flex items-center my-2 justify-between ">
                  <p className="flex items-center gap-2 tracking-wider">
                  <BsApple size={24}/> Apple (D:)
                  </p>
                  <h1>
                  {humanFileSize(folderSize2)}{" "}
                    <span className="text-sm">used</span>
                  </h1>
              </div>
                  <Progress
                    size="md"
                    value={(folderSize2)}
                    maxValue={10000000000000}
                  />
            </div>
            <Divider className="my-4 dark:bg-gray-700" />
          {/*Apps */}
            <div>
              <div className="flex items-center my-2 justify-between">
                  <p className="flex items-center gap-2 tracking-wider">
                  <TbApps size={24}/> Apps (E:)
                  </p>
                  <h1>
                  {humanFileSize(folderSize1)}{" "}
                    <span className="text-sm">used</span>
                  </h1>
              </div>
                  <Progress
                    size="md"
                    value={(folderSize1)}
                    maxValue={10000000000000}
                  />
            </div>
            <Divider className="mt-4 dark:bg-gray-700" />
          {/* Games
            <div>
              <div className="flex items-center my-2 justify-between">
                  <p className="flex items-center gap-2 tracking-wider">
                  <TbDeviceGamepad2 size={24}/> Apps (F:)
                  </p>
                  <h1>
                  {humanFileSize(folderSize3)}{" "}
                    <span className="text-sm">used</span>
                  </h1>
              </div>
                  <Progress
                    size="md"
                    value={(folderSize1)}
                    maxValue={10000000000000}
                  />
            </div>
            <Divider className="mt-4 dark:bg-gray-700" /> */}
        </main>
        
      }
    />
  );
};

export default Storage;