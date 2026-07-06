import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import router from "../../Routes";
import { ChatFragmentFragment } from "../../../gql/graphql";
interface ChatListItemProps {
  chat: ChatFragmentFragment;
}

const ChatListItem = ({ chat }: ChatListItemProps) => {
  return (
    <>
      <ListItem alignItems="flex-start" sx={{ minWidth: 0 }} disablePadding>
        <ListItemButton
          onClick={() => {
            router.navigate(`/chats/${chat._id}`);
          }}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            sx={{ minWidth: 0 }}
            slotProps={{
              primary: { noWrap: true },
              secondary: { noWrap: true, sx: { display: "block" } },
            }}
            primary={chat.name}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary" }}
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component={"li"} />
    </>
  );
};

export default ChatListItem;
