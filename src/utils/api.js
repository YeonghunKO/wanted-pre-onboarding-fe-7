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
}
