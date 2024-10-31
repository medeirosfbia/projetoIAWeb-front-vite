import { ChangeEvent, Key, KeyboardEvent, useState } from "react";
import Message from "../../models/Message";
import User from "../../models/User";
import { sendMessage } from "../../services/ChatService";

function Home() {

  const [messages, setMessages] = useState<Message[]>([]);


  // const [chatAnswer, setChatAnswer] = useState<Message>({
  //   message: '',
  //   answer: 'bot'
  // });


  const [userMessage, setUserMessage] = useState<string>('');


  const handleMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getChatAnswer()
    }
  }

  // function setMessage(chatAnswer: Message) {
  //   setMessages(...messages, {
  //     message: chatAnswer.message,
  //     answer: chatAnswer.answer
  //   })
  // }

  const appendMessage = (message: string) => {
    setMessages((prevMessage) => [...prevMessage, { id: 0, message, answer: '' }]);
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight
    }
  }


  async function getChatAnswer() {
    if (userMessage.trim() === '') return;
    appendMessage(userMessage);
    setUserMessage('');
    try {
      const [response, setResponse] = useState<string>('')
      await sendMessage('/query', userMessage, setResponse)
      appendMessage(response);

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <div className="container">

        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col flex-auto h-full p-6">
              <div
                className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
              >
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                          >
                            foto
                          </div>
                          <div
                            className="relative mr-3 text-sm bg-indigo-100
                             py-2 px-4 shadow rounded-xl"
                            id="chat-box">
                            <div >
                              {messages.map((message, index) => (
                                <div key={index}>
                                  <div>{message.message}</div>
                                  <div>{message.answer}</div>
                                </div>
                              ))}
                            </div>

                          </div>
                        </div>
                      </div>

                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <form >
                  <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div className="flex-grow ml-4" >
                      <div className="relative w-full">
                        <input
                          id="message"
                          placeholder="Digite sua mensagem..."
                          name="message"
                          type="text"
                          className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                          value={userMessage}
                          onChange={(e) => setUserMessage(e.target.value)}
                          onKeyPress={handleMessage}
                        />

                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl
                       text-white px-4 py-1 flex-shrink-0"
                        type="submit"
                        onClick={getChatAnswer}
                      >
                        <span>Send</span>
                        <span className="ml-2">
                          <svg
                            className="w-4 h-4 transform rotate-45 -mt-px"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>

  );
}

export default Home;