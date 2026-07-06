import { useState } from "react";
import List from "@mui/material/List";
import ChatListItem from "./chat-list-item/ChatListItem";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { Divider, Stack } from "@mui/material";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";

export const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState<boolean>(false);
  const { data } = useGetChats();
  console.log("CHATS");
  console.log(data);
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
          {data?.chats.map((chat) => (
            <ChatListItem chat={chat} />
          ))}
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
