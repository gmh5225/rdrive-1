import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getAccessTokens } from "..";
import { DriveItemType } from "../../../types/DriveItemType";
import { getOrigin } from "../../../utils/getBaseUrl";
import { PathUtils } from "../../../utils/getReadablePath";
import { readOdConcealedAccessTokens } from "../../../utils/odAuthTokenStore";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return authenticate(req, res)
        .then(readQueryParams(req, res))
        .then(loadDriveItems())
        .then(loadDriveItemChildren(req,res))
        .catch(error => {
          const message = error.message || error?.response?.data;
          return res.status(error?.response?.status ?? 500)
             .json({ error: message || 'Internal server error.' })
        })
}

export interface DriveItemResult {
  url: string,
  children: string[]
}

interface DriveItem {
  id: Number,
  name: string,
  size: Number,
  principalIndex: Number,
  children: DriveItem[] | null
  isEmpty: Boolean,
  folder: any,
  type: DriveItemType,
}

export interface TotalsResult {
  totalFiles: number,
  totalBytes: number,
}

export interface Memo {
  accessTokens: string[],
  principal: number,
  path: string,
  account: number,
  driveItems: DriveItem[],
}

async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  const accessTokens = ('x-connected-accounts' in req.headers) ? 
    readOdConcealedAccessTokens(req.headers['x-connected-accounts'] as string) :
    await getAccessTokens();

    if(!accessTokens.length) {
      const message = "no access tokens";
      res.status(401).json({ message });
      throw message;
    }

    return {
      accessTokens,
    } as Memo
}

function readQueryParams(req: NextApiRequest, res: NextApiResponse) {
  return (memo: Memo) => {
    const { path = 'root', account = -1 } = req.query;

    if(path != 'root' && memo.accessTokens.length > 0 && account == -1){
      const message = "please specify account";
      res.status(400).json({ message });
      throw message;
    }

    memo.path = PathUtils.readQuery(path);
    memo.principal = Number(account);

    return memo;
  }
}

function loadDriveItems() {
  return async (memo: Memo) => {
    let promise: Promise<DriveItem[]>;
    const { accessTokens, principal, path } = memo;
    if(principal < 0){
      // no principal specified, so visit all OneDrive accounts
      promise = Promise.all(memo.accessTokens.map((accessToken, _principalIndex) => {
        return getDriveItemsWithChildren(path, accessToken, _principalIndex)
      })).then(result => result.reduce((arr, driveItems) => {
        // combine results from each account into a single array
        return arr.concat(...driveItems)
      },[]))
    } else { 
      // only visit the OneDrive account 
      // associated with accessTokens[principalIndex]
      promise = getDriveItemsWithChildren(path, accessTokens[principal], principal)
    }
    
    memo.driveItems = await promise;

    return memo;  
  }  
}

function loadDriveItemChildren(req: NextApiRequest, res: NextApiResponse){
  return async (memo: Memo) => {
    const { driveItems, path } = memo;
    const origin = getOrigin(req);
    const url = `${origin}${req.url}`;
    const children = await Promise.all(driveItems.map(item => item.children as DriveItem[]))
           .then(children => children.reduce((items,nextItem) => { return items.concat(...nextItem) },[]))
           .then(children => children.map(child => {
              const _path = /root/.test(path) 
                ? `${child.name}&account=${child.principalIndex}` 
                : `${path},${child.name}&account=${child.principalIndex}`;
              return `${origin}/api/driveItems/?path=${encodeURI(_path)}`
           }))
    return res.json({ url, children })
  };
}

async function getDriveItemsWithChildren(path: string | string[], accessToken: string, principalIndex: Number){
  const { parentUrl, getChildUrl } = PathUtils(path);
  // get parent drive items
  return getDriveItems(parentUrl, accessToken, principalIndex)
  .then(parentItems => {
    // for each parent item...
    return Promise.all(parentItems.map(async parentItem => {
      // ...make url for the child item API call
      const childUrl = getChildUrl(path, parentItem.id);

      // ...get the child drive items
      const childItems = await getDriveItems(childUrl, accessToken, principalIndex);

      // ..attach children to the parent item
      if (childItems && childItems.length) {
        parentItem.children = childItems;
      }

      // ...return new parent item with attached children
      return parentItem;
    }))
  })
}

function isDriveItemEmpty(data: any): boolean {
  return getDriveItemType(data) == DriveItemType.Folder && data && !!data.folder.childCount;
}

function getDriveItemType(data: any): DriveItemType{ 
  return  'file' in data ? DriveItemType.File : DriveItemType.Folder;
}

async function getDriveItems(url: string, accessToken: string, principalIndex: Number): Promise<DriveItem[]> {
  return axios.get(url, { // call the OneDrive API
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      select: 'name,size,id,folder,file,video,image',
    }
  }).then(response => {
    const { data } = response; // get the response data
    if(!data) return [];
    if(data.folder){ // return a single drive item
      return [{
        id: data.id,
        name: data.name,
        size: Number(data.size),
        principalIndex,
        children: null,
        folder: data.folder,
        isEmpty: isDriveItemEmpty(data),
        type: getDriveItemType(data)
      } as DriveItem]
    } else if(data.value && Array.isArray(data.value)){ // return multiple drive items
      return data.value.map(_data => ({
        id: _data.id,
        name: _data.name,
        size: Number(_data.size),
        principalIndex,
        children: null,
        folder: _data.folder,
        isEmpty: isDriveItemEmpty(_data),
        type: getDriveItemType(_data)
      } as DriveItem))
    }
    return [];
  })
}
