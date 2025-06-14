import { BellIcon } from "lucide-react";
import React from "react";

const NoNotificationFound = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="size-20 rounded-full bg-base-300 flex items-center justify-center shadow-inner mb-5">
        <BellIcon className="size-9 text-base-content opacity-40" />
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">
        No Notifications Yet
      </h3>
      <p className="text-base-content opacity-70 max-w-md leading-relaxed">
        You're all caught up! Friend requests, and other alerts will show up here when available.
      </p>
    </div>
  );
};

export default NoNotificationFound;
