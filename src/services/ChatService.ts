
import axios from "axios";

const chatAPI = axios.create({
  baseURL: import.meta.env.VITE_CHAT_API
});

function authorizationHeader(token: string) {
  if (!token?.trim()) {
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  return {
    Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
  };
}

// export async function chatAdd(endpoint: string,text: string, userId: string){
//   try {
//     const response = await chatAPI.post(endpoint, {message: text}, {params: {user_id: userId}});
//     return response.data;
//   } catch (error: any) {
//     if (error.response) {
//       throw new Error(error.response.data.error || 'Erro no servidor');
//     } else {
//       throw new Error('Erro na conexão');
//     }
//   }
// }

export async function resumeChat(endpoint: string, userId: string, token: string) {
  try {
    const response = await chatAPI.get(endpoint, {
      params: { user_id: userId },
      headers: authorizationHeader(token),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro no servidor');
    } else {
      throw new Error('Erro na conexão');
    }
  }
}

export async function chatStream(endpoint: string, model: string, text: string, userId: string, token: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHAT_API}${endpoint}?user_id=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authorizationHeader(token),
        },
        body: JSON.stringify({ message: text, model: model }),
      }
    )
    if (!response.ok || !response.body) {
      const errorText = await response.text();
      throw new Error(errorText || 'Erro na resposta do servidor ou streaming não suportado');
    }
    return {
      reader: response.body.getReader(),
      decoder: new TextDecoder(),
      chatId: response.headers.get('X-Chat-ID')
    };
  } catch (error: any) {
    console.error("Erro no chatStream:", error);
    throw new Error(error.message || 'Erro na conexão');
  }
}

export async function deleteChat(endpoint: string, userId: string, chatId: string, token: string) {
  try {
    const url = `${endpoint}/${chatId}/delete?user_id=${userId}`;
    const response = await chatAPI.delete(url, {
      headers: authorizationHeader(token),
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao deletar o chat');
    } else {
      throw new Error('Erro na conexão');
    }
  }
}