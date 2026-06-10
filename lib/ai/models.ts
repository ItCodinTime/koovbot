export const DEFAULT_CHAT_MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";

export type ModelCapabilities = {
  tools: boolean;
  vision: boolean;
  reasoning: boolean;
};

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: DEFAULT_CHAT_MODEL,
    name: "Nemotron 3 Ultra",
    provider: "nvidia",
    description: "NVIDIA Nemotron 3 Ultra through OpenRouter",
  },
];

export function getCapabilities(): Record<string, ModelCapabilities> {
  return {
    [DEFAULT_CHAT_MODEL]: {
      tools: false,
      vision: false,
      reasoning: false,
    },
  };
}
