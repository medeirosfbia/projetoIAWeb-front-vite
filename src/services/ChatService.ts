
import axios from "axios";

  export async function chatAdd(endpoint: string,text: string, userId: string){
    try {
      const response = await axios.post(endpoint, {message: text}, {params: {user_id: userId}});
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Erro no servidor');
      } else {
        throw new Error('Erro na conexão');
      }
    }
  }

    export async function resumeChat(endpoint: string, userId: string){
    try {
      const response = await axios.get(endpoint, {params: {user_id: userId}});
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Erro no servidor');
      } else {
        throw new Error('Erro na conexão');
      }
    }
  }