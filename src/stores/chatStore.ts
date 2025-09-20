import { create } from "zustand";

type Role = "aspirante" | "estudiante" | "graduado" | "otro" | null;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  messages: Message[];
  userRole: Role;
  setUserRole: (role: Role) => void;
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  userRole: null,
  setUserRole: (role) => set({ userRole: role }),
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
}));
