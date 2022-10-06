class Api {
  #END_POINT = '';
  constructor(endPoint) {
    this.#END_POINT = endPoint;
  }

  async signUp(email, password) {
    const res = await fetch(`${this.#END_POINT}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const { access_token } = await res.json();
    localStorage.setItem('token', access_token);
  }

  async signIn(email, password) {
    const res = await fetch(`${this.#END_POINT}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const { access_token } = await res.json();
    localStorage.setItem('token', access_token);
  }

  async createTodo(todo) {
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

  async getTodos(todo) {
    const res = await fetch(`${this.#END_POINT}/todos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo }),
    });
    return await res.json();
  }

  async updateTodo(todoId, body) {
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

  async deleteTodo(todoId) {
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

const api = Api('localhost:8000');

export { api };
