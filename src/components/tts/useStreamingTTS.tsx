// Pode ser implementado no futuro para TTS em streaming

import { useEffect, useRef } from "react";

export function useStreamingTTS(answer: string, isStreaming: boolean) {
    const spokenTextRef = useRef("");

    useEffect(() => {
        if (!isStreaming) {
            // Quando o streaming termina, só sincroniza o texto final
            spokenTextRef.current = answer;
            return;
        }

        // Novo trecho que ainda não foi falado
        const previous = spokenTextRef.current;
        const nextChunk = answer.slice(previous.length).trim();

        if (nextChunk.length === 0) return;

        // Atualiza marcador ANTES de falar para não duplicar em delays
        spokenTextRef.current = answer;

        // Cancelar qualquer fala pendente
        window.speechSynthesis.cancel();

        const utter = new SpeechSynthesisUtterance(nextChunk);
        utter.lang = "pt-BR";

        window.speechSynthesis.speak(utter);
    }, [answer, isStreaming]);
}
