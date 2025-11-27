import Message from "@/models/Message";
import { useContext, useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatAnswer from "./ChatAnswer";
import AuthContext from "@/contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { chatStream, resumeChat } from "@/services/ChatService";
import Sidebar from "../sidebar/Sidebar";
import { ToastAlerts } from "@/utils/ToastAlerts";
import Navbar from "../navbar/Navbar";
import { useChatContext } from "@/contexts/ChatContext";
import { useModelContext } from "@/contexts/ModelContext";

function Chat() {

  const [messages, setMessages] = useState<Message[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { refreshChats } = useChatContext();
  const { model } = useModelContext();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [isStreaming, setIsStreaming] = useState(false);



  useEffect(() => {
    if (chatId) {
      loadMessages(chatId);
    } else {
      setMessages([]);
    }

  }, [chatId]);

  async function loadMessages(chatId: string) {
    // setLoading(true);
    try {
      const response = await resumeChat(`/chats/${chatId}`, user.username);

      const formattedMessages = response.messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
        user: user
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error(error);
      ToastAlerts("Erro ao carregar mensagens.", "erro");
    } finally {
      // setLoading(false);
    }
  }

async function handleSendMessage(text: string) {
  const userMessage: Message = {
    role: "user",
    content: text,
    user: user,
    timestamp: new Date().toISOString(),
  };

  const assistantPlaceholder: Message = {
    role: "assistant",
    content: "",
    user: user,
    timestamp: new Date().toISOString(),
  };

  setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);

  let fullResponseContent = "";

  try {
    // streaming começou!
    setIsStreaming(true);

    const endpoint = chatId ? `/chats/${chatId}/add` : "/chats/new";

    const { reader, decoder, chatId: newChatId } = await chatStream(
      endpoint,
      model,
      text,
      user.username
    );

    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        fullResponseContent += chunk;

        // Atualiza a ÚLTIMA mensagem do assistente
        setMessages((prevMessages) => {
          const updated = [...prevMessages];
          const lastIndex = updated.length - 1;

          if (updated[lastIndex].role === "assistant") {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: fullResponseContent,
            };
          }

          return updated;
        });
      }
    }

    // streaming acabou!
    setIsStreaming(false);

    if (!chatId && newChatId) {
      navigate(`/chat/${newChatId}`);
      refreshChats();
    }
  } catch (error) {
    console.error(error);
    setIsStreaming(false);

    setMessages((prevMessages) => {
      const updated = [...prevMessages];
      const lastIndex = updated.length - 1;

      if (updated[lastIndex].role === "assistant") {
        updated[lastIndex].content =
          "Ocorreu um erro ao gerar a resposta. Tente novamente.";
      }

      return updated;
    });
  }
}



  return (
    <div className="flex h-screen antialiased ">
      <Sidebar />
      <div className="flex flex-row  w-screen overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <Navbar />
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-b-2xl bg-neutral-700 p-6 ">

            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {messages.map((message, index) => (
                    <div key={index} className="col-start-1 col-end-13 p-3 rounded-lg">
                      {message.role === 'user' && <ChatMessage message={message} user={user} />}
                      {message.role === 'assistant' && <ChatAnswer answer={message.content} isStreaming={index === messages.length - 1 && isStreaming}  />}

                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ChatInput addMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;