import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useGetMessages } from "../../hooks/useGetMessages";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { ArrowDownward } from "@mui/icons-material";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { MessageFragmentFragment } from "../../gql/graphql";
const Chat = () => {
  const params = useParams();

  const chatId = params._id!;
  const { data } = useGetChat({ _id: chatId });

  const [createMessage] = useCreateMessage();
  const [messages, setMessages] = useState<MessageFragmentFragment[]>([]);

  const [message, setMessage] = useState("");
  const messagesEnd = useRef<HTMLDivElement>(null);
  const messagesContainer = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const location = useLocation();

  const { data: latestMessage } = useMessageCreated({ chatId });
  const { data: existingMessages } = useGetMessages({ chatId });

  useEffect(() => {
    if (existingMessages) setMessages(existingMessages.messages);
  }, [existingMessages]);

  useEffect(() => {
    console.log("MESSAGE FROM SOCKET");
    console.log(latestMessage);
    const existingLatestMessage = messages[messages.length - 1]?._id;
    if (
      latestMessage?.messageCreated &&
      existingLatestMessage !== latestMessage.messageCreated._id
    ) {
      setMessages([...messages, latestMessage.messageCreated]);
    }
  }, [latestMessage, messages]);

  const scrollToEnd = () => {
    messagesEnd.current?.scrollIntoView();
  };
  const handleCreateMessage = async () => {
    try {
      await createMessage({
        variables: {
          createMessageInput: {
            chatId: chatId,
            content: message,
          },
        },
      });

      setMessage("");
      scrollToEnd();
    } catch (error) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  };

  useEffect(() => {
    setMessage("");
    if (messagesEnd.current) {
      scrollToEnd();
    }
  }, [location, messages]);

  useEffect(() => {
    const container = messagesContainer.current;
    if (!container) return;

    const checkOverflow = () =>
      setHasOverflow(container.scrollHeight > container.clientHeight);

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [messages?.length]);

  return (
    <Stack sx={{ height: "90vh", justifyContent: "space-between" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // height: "100%",
        }}
      >
        <h1>{data?.chat.name}</h1>
        {messages?.length === 0 && (
          <Typography
            variant="caption"
            sx={{ width: "100%", textAlign: "center" }}
          >
            No messages yet - send one!
          </Typography>
        )}

        {messages?.length && (
          <Box
            sx={{ overflow: "auto", height: "75vh" }}
            ref={messagesContainer}
          >
            {[...messages]
              .sort((messageA, messageB) => {
                return (
                  new Date(messageA.createdAt).getTime() -
                  new Date(messageB.createdAt).getTime()
                );
              })
              .map((message) => (
                <Grid
                  container
                  sx={{ alignItems: "center", marginBottom: "1rem" }}
                >
                  <Grid size={{ xs: 2, lg: 1 }}>
                    <Avatar src="" sx={{ width: 40, height: 40 }} />
                  </Grid>
                  <Grid size={{ xs: 10, lg: 11 }}>
                    <Stack>
                      <Paper sx={{ width: "fit-content" }}>
                        <Typography sx={{ padding: "0.5rem" }}>
                          {message.content}
                        </Typography>
                      </Paper>

                      <Typography
                        variant="caption"
                        sx={{ marginLeft: "0.25rem" }}
                      >
                        {new Date(message?.createdAt).toLocaleTimeString()}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            <div ref={messagesEnd} />

            {hasOverflow && (
              <Box
                sx={{
                  position: "sticky",
                  bottom: 50,
                  height: 0,
                  left: "90%",
                  display: "flex",
                  padding: 1,
                  justifyContent: "end",
                }}
              >
                <IconButton
                  onClick={scrollToEnd}
                  sx={{ paddingY: 2, paddingX: 1, borderRadius: "200%" }}
                >
                  <ArrowDownward />
                </IconButton>
              </Box>
            )}
          </Box>
        )}
      </Container>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          placeholder="Sent a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              if (message.trim().length === 0) return;
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          onClick={async () => {
            await handleCreateMessage();
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
