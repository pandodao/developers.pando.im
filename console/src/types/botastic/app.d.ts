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

  export interface Callbacks {
    success: (...args: any) => void;
    error: (...args: any) => void;
  }
}

