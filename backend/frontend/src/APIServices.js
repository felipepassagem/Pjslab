export default class APIService {
  static async LoginUser(body) {
    const resp = await fetch("http://127.0.0.1:8000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await resp.json();
  }

  static async RegisterUser(body) {
    const resp = await fetch(`http://localhost:8000/api/users/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await resp.json();
  }

  static async AddClient(body, token) {
    const resp = await fetch("http://127.0.0.1:8000/api/clients/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await resp.json();
  }

  static async AddJob(body, token, client) {
    const resp = await fetch("http://127.0.0.1:8000/api/job/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await resp.json();
  }

  static async UpdateClient(body, token, id) {
    const resp = await fetch(
      `http://127.0.0.1:8000/api/clients/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    return await resp.json();
  }

  static async UpdateJob(body, token, id) {
    const resp = await fetch(
      `http://127.0.0.1:8000/api/job/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    return await resp.json();
  }

}
