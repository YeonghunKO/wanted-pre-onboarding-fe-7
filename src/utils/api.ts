import { setItem } from './storage';

type gerneralTodo = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

type updateTodo = {
  todo: string;
  isCompleted: boolean;
};

interface apiInterface {
  signUp(email: string, password: string): void;
  signIn(email: string, password: string): void;
  createTodo(todo: string): Promise<gerneralTodo>;
  getTodos(): Promise<gerneralTodo[]>;
  updateTodo(todoId: number, body: updateTodo): Promise<gerneralTodo>;
  deleteTodo(todoId: number): Promise<{ status: number }>;
}

class Api implements apiInterface {
  #END_POINT = '';
  constructor(endPoint: string) {
    this.#END_POINT = endPoint;
  }

  async signUp(email: string, password: string) {
    const res = await fetch(`${this.#END_POINT}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const { access_token } = await res.json();
    setItem('token', access_token);
  }

  async signIn(email: string, password: string) {
    const res = await fetch(`${this.#END_POINT}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const { access_token } = await res.json();
    setItem('token', access_token);
  }

  async createTodo(todo: string) {
    const res = await fetch(`${this.#END_POINT}/todos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo }),
    });
    return await res.json();
  }

  async getTodos() {
    const res = await fetch(`${this.#END_POINT}/todos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }

  async updateTodo(todoId: number, body: updateTodo) {
    const res = await fetch(`${this.#END_POINT}/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  async deleteTodo(todoId: number) {
    const res = await fetch(`${this.#END_POINT}/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }
}

const api = new Api('localhost:8000');

export { api };
