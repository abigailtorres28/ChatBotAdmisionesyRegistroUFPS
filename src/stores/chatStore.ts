import { create } from "zustand";

type Role = "aspirante" | "estudiante" | "graduado" | "otro" | null;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface UserData {
  name: string;
  id: string;
}

interface ChatState {
  messages: Message[];
  userRole: Role;
  userData: UserData | null;
  setUserRole: (role: Role) => void;
  setUserData: (data: UserData) => void;
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  userRole: null,
  userData: null,
  setUserRole: (role) => set({ userRole: role }),
  setUserData: (data) => set({ userData: data }),
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
}));
