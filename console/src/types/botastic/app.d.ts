declare namespace Botastic {
  export interface App {
    id: number;
    user_id: number;
    app_id: string;
    app_secret: string;
    name: string;
    created_at?: string;
    updated_at?: string;
  }

  export interface Bot {
    id: number;
    name: string;
    user_id: number;
    prompt: string;
    model: string;
    max_turn_count: number;
    context_turn_count: number;
    temperature: number;
    public: boolean;
    middlewares: Record<string, any>;
    created_at?: string;
    updated_at?: string;
  }

  export interface Callbacks {
    success: (...args: any) => void;
    error: (...args: any) => void;
  }
}

