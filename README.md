# AprovIA Frontend

Este documento descreve de forma clara o funcionamento do frontend AprovIA, sua estrutura, tecnologias utilizadas, dependências necessárias e passos para rodar / buildar o projeto.

---

## 🔎 Visão Geral — como funciona

AprovIA é uma SPA (React + TypeScript + Vite) que se comunica com um backend via REST/streaming para:

- autenticação e cadastro de usuários;
- gerenciamento de chats (criar, listar, excluir);
- envio de mensagens e recepção de respostas da IA via streaming;
- edição e exclusão de perfil.

O fluxo de chat por streaming está implementado em [src/services/ChatService.ts](src/services/ChatService.ts) e consumido por [src/components/chat/Chat.tsx](src/components/chat/Chat.tsx). O componente de exibição usa [src/components/chat/ChatAnswer.tsx](src/components/chat/ChatAnswer.tsx) (inclui TTS) e o input por voz em [src/components/chat/ChatInput.tsx](src/components/chat/ChatInput.tsx).

---

## 🏛️ Arquitetura e organização de pastas

Raiz do projeto (resumido):

```
projetoIAWeb-front-vite/
├── public/
├── src/
│   ├── components/        # UI e blocos reutilizáveis (chat, sidebar, navbar, edit user, etc)
│   ├── contexts/          # Contextos React (AuthContext, ChatContext, ModelContext)
│   ├── models/            # Interfaces/Tipos (User, Message, UserLogin, UserType)
│   ├── pages/             # Páginas (login, register, home, help, admin)
│   ├── services/          # Chamadas à API (AuthService, ChatService)
│   ├── utils/             # Utilitários (ToastAlerts)
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig*.json
├── vite.config.ts
└── tailwind.config.js
```

Links úteis:
- Roteamento / entrada: [src/App.tsx](src/App.tsx)
- Autenticação: [src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx) e [src/services/AuthService.ts](src/services/AuthService.ts)
- Chat streaming: [src/services/ChatService.ts](src/services/ChatService.ts) e [src/components/chat/Chat.tsx](src/components/chat/Chat.tsx)
- Contexto de chats: [src/contexts/ChatContext.tsx](src/contexts/ChatContext.tsx)

---

## 🧩 Como foi desenvolvido (padrões e decisões)

- Componentização: UI dividida em componentes pequenos e reutilizáveis (Sidebar, Navbar, ChatMessage, ChatAnswer, ChatInput).
- Context API: estado global para autenticação e lista de chats (AuthProvider, ChatProvider, ModelProvider).
- Tipagem forte: todas as entidades usam interfaces TypeScript em [src/models](src/models).
- Serviços responsáveis por chamadas HTTP/streaming em [src/services](src/services).
- TailwindCSS para estilos utilitários e responsividade.
- Acessibilidade: labels, roles e atributos ARIA em botões e formulários.
- Streaming: ChatService retorna reader/decoder para leitura incremental e atualização de UI enquanto o servidor streama texto (ver Chat.tsx loop de leitura).

---

## ✨ Funcionalidades principais

- Login / Logout / Persistência (localStorage quando “manter conectado”).
- Historico de chats (sidebar).
- Mensagens com streaming (exibição incremental).
- Text-to-Speech para respostas (Web Speech API em ChatAnswer).
- Reconhecimento de voz para digitação por voz (Web SpeechRecognition em ChatInput).
- Edição e exclusão de usuário (modals).

---

## 🛠️ Requisitos e instalação

1. Node 18+ (recomendado Node 20)
2. Git

Passos:

```bash
git clone <repo-url>
cd projetoIAWeb-front-vite
npm install
# ou
# yarn
```

Variáveis de ambiente necessárias (arquivo .env):
- VITE_AUTH_API=http://localhost:8090   # endpoint de auth
- VITE_CHAT_API=http://127.0.0.1:5000   # endpoint de chat (streaming)

Criar .env na raiz com:
```
VITE_AUTH_API=http://localhost:8090
VITE_CHAT_API=http://127.0.0.1:5000
```

Rodar em dev:
```bash
npm run dev
# acessa em http://localhost:5173
```

Build para produção:
```bash
npm run build
npm run preview
```

---

## ⚠️ Observações importantes

- O streaming depende do backend suportar responses com body em streaming; ver implementação em [src/services/ChatService.ts](src/services/ChatService.ts).
- Para TTS e reconhecimento de voz, o navegador deve suportar Web Speech APIs.
- Definir corretamente as variáveis VITE_* antes de iniciar, pois Vite injeta essas variáveis em tempo de build.
- Para deploy (Vercel) veja [vercel.json](vercel.json) e workflow em [.github/workflows/pipeline.yml](.github/workflows/pipeline.yml).

---

## 📚 Referências e docs

- Vite: https://vitejs.dev/
- React + TypeScript: https://react.dev/
- TailwindCSS: https://tailwindcss.com/
- Código fonte: [package.json](package.json), [vite.config.ts](vite.config.ts)

--- 

Contribuições e issues: abrir PRs/Issues no repositório. Obrigatório rodar lint/tests antes do merge (scripts em package.json).
