"use client";

import { USER_ROLE } from "@/consts/user.const";
import { cn } from "@/lib/utils";
import { TSupportMessage } from "@/types/support.type";
import { formatDistanceToNow } from "date-fns";
import { CheckCheckIcon, CheckIcon } from "lucide-react";
import React from "react";

interface IProps {
  msg: TSupportMessage;
  lastReadAt: string | null;
  otherSideUserId: string;
}

const SupportMessageItem = React.memo(
  ({ msg, lastReadAt, otherSideUserId }: IProps) => {
    const isAgent = msg.senderRole === USER_ROLE.FLEET_MANAGER;
    const isOptimistic = msg._id.startsWith("temp-");

    const isReadByTarget =
      msg.readBy?.[otherSideUserId] ||
      (lastReadAt && new Date(msg.createdAt) <= new Date(lastReadAt));

    return (
      <div
        className={cn(
          "flex flex-col transition-opacity",
          isAgent ? "items-end" : "items-start",
          isOptimistic ? "opacity-60" : "opacity-100",
        )}
      >
        <p className="text-xs text-gray-400 mb-1 px-1">
          {isAgent ? "You" : "Admin"}
        </p>
        <div
          className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${isAgent ? "bg-[#DC3173] text-white rounded-tr-sm" : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm"}`}
        >
          {msg.message}
          <div className="flex justify-between items-center mt-1 gap-2">
            <span
              className={cn(
                "text-xs block text-right",
                isAgent ? "text-gray-300" : "text-gray-400",
              )}
            >
              {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
            </span>
            {isAgent &&
              (isOptimistic ? (
                <CheckIcon size={16} className="text-gray-400 animate-pulse" />
              ) : isReadByTarget ? (
                <CheckCheckIcon size={16} className="text-indigo-400" />
              ) : (
                <CheckIcon size={16} className="text-gray-300" />
              ))}
          </div>
        </div>
      </div>
    );
  },
);

SupportMessageItem.displayName = "SupportMessageItem";

export default SupportMessageItem;
