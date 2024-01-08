import {
  findAllLockedByUser,
  findHistoryByFileId,
} from "@/core/actions/history.actions";
import { getUserProfile } from "@/core/actions/users.actions";
import { History } from "@/core/models/History.model";
import React from "react";
import HistoryList from "./components/HistoryList";

async function HistoryPage({
  searchParams,
}: {
  searchParams: {
    fileId?: number;
  };
}) {
  const currentUser = await getUserProfile();

  let history: History[] = [];
  if (searchParams.fileId) {
    history = await findHistoryByFileId(searchParams.fileId);
  } else {
    history = await findAllLockedByUser(currentUser.id);
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <HistoryList history={history} />
    </div>
  );
}

export default HistoryPage;
