import Message from "@/models/Message";
import { useContext, useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatAnswer from "./ChatAnswer";
import { sendMessage } from "@/services/ChatService";
import { RotatingLines } from "react-loader-spinner";
import AuthContext from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Chat() {

    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useContext(AuthContext);
    const token = user.token;

    const navigate = useNavigate();

    useEffect(() => {
        if(token === '') {
          //voltar pro login
          alert('Ta tirando...')
          navigate('/login')
        }
      }, [token])




    async function addMessage(text: string) {
        const newMessage: Message = { message: text, answer: '' };
        setMessages([...messages, newMessage]);
        setLoading(true);
        try {
            const resp = await sendMessage('http://127.0.0.1:5000/query', text);
            // setMessages([...messages, { message: text, answer: resp}]);
            setMessages(prevMessages => {
                const updateMessages = prevMessages.map(msg =>
                    msg.message === text ? { ...msg, answer: resp } : msg
                )
                return updateMessages;
            });

            setLoading(false);

        } catch (error) {
            console.log(error);
            alert("Erro ao enviar mensagem");
            setLoading(false);
        }
    }




    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <div className="flex flex-col flex-auto h-full p-6">
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-300 h-full p-4">
                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">
                                    {messages.map((message, index) => (
                                        <div key={index} className="col-start-1 col-end-13 p-3 rounded-lg">
                                            <ChatMessage message={message} />
                                            {message.answer && <ChatAnswer answer={message.answer} />}

                                                {loading && index === messages.length - 1 && (
                                                <RotatingLines
                                                    strokeColor="black"
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    width="24"
                                                    visible={true}
                                                />
                                            )}
                                            </div>
                                            ))}

                                            {/* <div className="col-start-1 col-end-8 p-3 rounded-lg"> */}
                                                {/* {loading ?
                                            (<RotatingLines
                                                    strokeColor="black"
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    width="24"
                                                    visible={true}
                                                />):(messages.map((message) =>(
                                                <ChatAnswer answer={message.answer} />)))} */}
                                            {/* </div> */}
                                        </div>
                            </div>
                            </div>
                            <ChatInput addMessage={addMessage} />
                        </div>
                    </div>
                </div>
            </div>
            );
}

            export default Chat;