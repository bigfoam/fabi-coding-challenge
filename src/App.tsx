import {
  AppWrapper,
  Banner,
  BannerText,
  CompanyTagLine,
  CompanyName,
  Message as MessageBox,
  MessageSection,
  ChatBox,
  Page,
} from "./App.styled";
import { useState } from "react";

type Sender = "client" | "fabi";

interface Message {
  id: number;
  sender: Sender;
  text: string;
  sql_command?: string;
  sql_explanation?: string;
  sql_result_uri?: string;
  status?: number;
}

interface ChatProps {
  sender: Sender;
  responder: "fabi";
}

const Chat: React.FC<ChatProps> = ({ sender, responder }) => {
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    const newMessage: Message = {
      id: Date.now(),
      sender,
      text: inputText,
    };

    setMessageHistory((prevHistory) => [...prevHistory, newMessage]);
    setInputText("");

    try {
      const response = await fetch(
        "http://ec2-44-202-242-21.compute-1.amazonaws.com:8080/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            query: inputText,
          }).toString(),
        }
      );

      if (!response.ok) {
        throw new Error("Chat response request failed");
      }

      const responseData = await response.json();

      const responseMessage: Message = {
        id: Date.now(),
        sender: responder,
        text: responseData.msg,
        sql_command: responseData.sql_command,
        sql_explanation: responseData.sql_explanation,
        sql_result_uri: responseData.sql_result_uri,
        status: responseData.status,
      };

      setMessageHistory((prevHistory) => [...prevHistory, responseMessage]);
    } catch (error) {
      console.error("Error sending chat response:", error);
    }
  };

  return (
    <>
      <ChatBox>
        {messageHistory.map((message) => (
          <MessageBox
            key={message.id}
            alignment={message.sender === "fabi" ? "left" : "right"}
          >
            <MessageSection>{message.sender}</MessageSection>
            <MessageSection>{message.text}</MessageSection>
            {message.sql_command && (
              <>
                <MessageSection>
                  SQL Command: {message.sql_command}
                </MessageSection>
                <MessageSection>
                  SQL Explanation: {message.sql_explanation}
                </MessageSection>
                <MessageSection>
                  SQL Result URI: {message.sql_result_uri}
                  <a href={message.sql_result_uri} download="csv_download">
                    Download CSV
                  </a>
                </MessageSection>
              </>
            )}
          </MessageBox>
        ))}
      </ChatBox>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your prompt..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </>
  );
};

const App = () => {
  return (
    <AppWrapper>
      <Banner>
        <BannerText color={"white"}>
          <CompanyName>fabi.ai</CompanyName>
          <CompanyTagLine>
            The AI engine for your data warehouse.
          </CompanyTagLine>
        </BannerText>
      </Banner>
      <Page>
        <Chat sender="client" responder="fabi" />
      </Page>
    </AppWrapper>
  );
};

export default App;
