import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:8090`
});

export const createUser = async(url: string, dados: Object, setDados: Function) => {
    const resp = await api.post(url, dados)
    setDados(resp.data)
}

export const login = async(url: string, dados: Object, setDados: Function) => {
    const resp = await api.post(url, dados)
    setDados(resp.data)
}

export const cadastrar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.post(url, dados, header)
  setDados(resposta.data)
}

export const atualizar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.put(url, dados, header)
  setDados(resposta.data)
}

export const deletar = async(url: string, header: Object) => {
  await api.delete(url, header)
}
