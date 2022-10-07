import { getItem, setItem } from './storage';

type gerneralTodo = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

type updateTodo = {
  todo?: string;
  isCompleted?: boolean;
};

interface apiInterface {
  signUp(email: string, password: string): void;
  signIn(email: string, password: string): void;
  createTodo(todo: string): Promise<gerneralTodo>;
  getTodos(): Promise<gerneralTodo[]>;
  updateTodo(todoId: number, body: updateTodo): Promise<gerneralTodo>;
  deleteTodo(todoId: number): void;
}

class Api implements apiInterface {
  #END_POINT = '';
  constructor(endPoint: string) {
    this.#END_POINT = endPoint;
  }

  async signUp(email: string, password: string) {
    try {
      const res = await fetch(`${this.#END_POINT}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const { access_token } = await res.json();
      setItem('token', access_token);
    } catch (error) {
      alert(error);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const res = await fetch(`${this.#END_POINT}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const { access_token, message } = await res.json();

      if (access_token) {
        setItem('token', access_token);
      } else {
        throw new Error(message);
      }
    } catch (error) {
      alert(error);
    }
  }

  async createTodo(todo: string) {
    try {
      const res = await fetch(`${this.#END_POINT}/todos`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo }),
      });
      return await res.json();
    } catch (error) {
      alert(error);
    }
  }

  async getTodos() {
    try {
      const res = await fetch(`${this.#END_POINT}/todos`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return await res.json();
    } catch (error) {
      alert(error);
    }
  }

  async updateTodo(todoId: number, body: updateTodo) {
    try {
      const res = await fetch(`${this.#END_POINT}/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (error) {
      alert(error);
    }
  }

  async deleteTodo(todoId: number) {
    try {
      const res = await fetch(`${this.#END_POINT}/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      // console.log(res.json());

      // return await res.json();
    } catch (error) {
      alert(error);
    }
  }
}

const api = new Api('https://pre-onboarding-selection-task.shop');

export { api };
