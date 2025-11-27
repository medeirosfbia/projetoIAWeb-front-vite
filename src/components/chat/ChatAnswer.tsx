import ReactMarkdown from "react-markdown";
import { FiVolume2, FiPause, FiPlay, FiStopCircle } from "react-icons/fi";
import { useTTS } from "../tts/useTTS";
import { useModelContext } from "@/contexts/ModelContext";

function ChatAnswer({ answer, isStreaming }: { answer: string, isStreaming: boolean }) {
    const { speak, pause, resume, stop, isSpeaking, isPaused } = useTTS();
    const { model } = useModelContext();

    // Define a linguagem pelo modelo
    const ttsLang = model === "llama3" ? "en-US" : "pt-BR";

    return (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="ml-3 text-sm">
                <div className="relative bg-white py-2 px-4 shadow rounded-xl max-w-xl w-auto">
                    <ReactMarkdown>{answer}</ReactMarkdown>
                </div>

                <div className="mt-2 flex justify-start space-x-2">
                    {!isSpeaking && !isStreaming && (
                        <button
                            onClick={() => speak(answer, ttsLang)}
                            className="p-2 rounded-md text-white hover:bg-gray-800"
                        >
                            <FiVolume2 />
                        </button>
                    )}

                    {isSpeaking && !isPaused && (
                        <button
                            onClick={pause}
                            className="p-2 rounded-md text-white hover:bg-gray-800"
                        >
                            <FiPause />
                        </button>
                    )}

                    {isSpeaking && isPaused && (
                        <button
                            onClick={resume}
                            className="p-2 rounded-md text-white hover:bg-gray-800"
                        >
                            <FiPlay />
                        </button>
                    )}

                    {isSpeaking && (
                        <button
                            onClick={stop}
                            className="p-2 rounded-md text-white hover:bg-gray-800"
                        >
                            <FiStopCircle />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatAnswer;
