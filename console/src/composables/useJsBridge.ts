import Bridge from "@foxone/mixin-sdk-jsbridge";
import { getConversation } from "@/services/mixin"

export function useJsBridge() {
  const env = useRuntimeConfig();

  const jsbridge = new Bridge({
    client_id: env.public.clientId,
  });

  async function getCurrentConversation() {
    const ctx = jsbridge.getContext();
    if (ctx) {
      const conv = await getConversation(ctx.conversation_id);
      if (conv && conv.category === "GROUP") {
        return conv;
      }
    }
    return null;
  };

  return {
    getCurrentConversation,
  };
}
