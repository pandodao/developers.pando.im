declare namespace Talkee {
  export interface Site {
    id: number;
    user_id: number;
    origins: string[];
    use_arweave: boolean;
    name: string;
    reward_strategy?: number;
    created_at?: string;
    updated_at?: string;
  }

  export interface Callbacks {
    success: (...args: any) => void;
    error: (...args: any) => void;
  }
}

