import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ChatListItem from "./chat-list-item/ChatListItem";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { Divider, Stack } from "@mui/material";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import { useParams } from "react-router-dom";
import { usePath } from "../../hooks/usePath";

export const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState<boolean>(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data } = useGetChats();
  const { path } = usePath();

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) setSelectedChatId(pathSplit[1]);
  }, [path]);
  return (
    <>
      <Stack sx={{ width: "100%", minWidth: 0, overflow: "hidden" }}>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <List
          sx={{
            width: "100%",
            minWidth: 0,
            bgcolor: "background.paper",
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "85vh",
          }}
        >
          {data?.chats
            .map((chat) => (
              <ChatListItem
                chat={chat}
                selected={selectedChatId === chat._id}
              />
            ))
            .reverse()}
        </List>
      </Stack>

      {/* Add Chat Modal */}
      <ChatListAdd
        handleClose={() => setChatListAddVisible(false)}
        open={chatListAddVisible}
      />
    </>
  );
};
