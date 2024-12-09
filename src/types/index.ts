export interface Todo {
    id: number;
    title: string;
    type: string;
    priority: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    completed_at: Date;
    deleted_at: Date;
  }
  
  export interface Qaa {
    id: number;
    question: string;
    answer: string;
    link: string;
    type: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }
  
  export interface Blog {
    id: number;
    text: string;
    given_at: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    todo_id: number;
  }
  
  export interface Category {
    id: number;
    name: string;
    children?: Category[];
    todos?: Todo[];
    qaas?: Qaa[];
    blogs?: Blog[];
  }
  