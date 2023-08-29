"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  // Or a custom loading skeleton component
  const [loadingStatus, setLoadingStatus] = useState(1);
  setInterval(() => setLoadingStatus(loadingStatus === 1 ? 0 : 1), 1);
  return (
    <div className="h-full w-full flex">
      {loadingStatus === 1 ? (
        <p className="m-auto">Loading...</p>
      ) : (
        <p className="m-auto">Loading..</p>
      )}
    </div>
  );
}
