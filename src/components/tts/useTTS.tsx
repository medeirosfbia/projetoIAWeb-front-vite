import { useState, useEffect, useRef } from "react";

export function useTTS(defaultLang: string = "pt-BR") {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

    

    const speak = (text: string, lang?: string) => {
        if (!text) return;

        // // Remove markdown antes de falar
        // const cleanText = text
        //     .replace(/[#_*~`>]/g, "") 
        //     .replace(/\[(.*?)\]\((.*?)\)/g, "$1"); // remove links markdown

        // cancela qualquer fala anterior
        window.speechSynthesis.cancel();

        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = lang || defaultLang;

        utter.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            utterRef.current = null;
        };

        utter.onerror = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            utterRef.current = null;
        };

        utterRef.current = utter;
        window.speechSynthesis.speak(utter);
        setIsSpeaking(true);
        setIsPaused(false);
    };

    const pause = () => {
        if (isSpeaking && !isPaused) {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    };

    const resume = () => {
        if (isSpeaking && isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        }
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
        utterRef.current = null;
    };

    // cancela qualquer fala ao desmontar
    useEffect(() => {
        return () => stop();
    }, []);

    return { speak, pause, resume, stop, isSpeaking, isPaused };
}
