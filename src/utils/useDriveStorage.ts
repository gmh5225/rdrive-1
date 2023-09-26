import axios from "axios";
import { useEffect, useState } from "react";

const useDriveStorage = (token: string) => {
  const [quota, setQuota] = useState({ used: 0, remaining: 0, total: 0, percentageUsed: 0 });

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("https://graph.microsoft.com/v1.0/me/drive", config)
      .then((res) => {
        const used = res.data.quota.used;
        const total = res.data.quota.total;
        const remaining = total - used;
        const percentageUsed = (used / total) * 100;
        setQuota({ used, remaining, total, percentageUsed });
      });
  }, [token]);

  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  return { quota, formatBytes };
};

const useFolderSize = (token: string, folderPath: string) => {
  const [folderSize, setFolderSize] = useState<number | null>(null);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const encodedFolderPath = encodeURIComponent(folderPath);
    axios
      .get(`https://graph.microsoft.com/v1.0/me/drive/root:/${encodedFolderPath}`, config)
      .then((res) => {
        const size = res.data.size;
        setFolderSize(size);
      })
      .catch((error) => {
        console.error("Error fetching folder size:", error);
      });
  }, [token, folderPath]);

  return { folderSize };
};

export { useDriveStorage, useFolderSize };
