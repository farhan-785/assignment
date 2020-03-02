const HOST = 'http://localhost:4000'

class HttpService {

  static async get(url) {
    const response = await fetch(`${HOST}${url}`);
    if (response.ok)
      return Promise.resolve(await response.json())
    else
      return Promise.reject(await response.json());
  }

  static async call(url, method = 'GET', params = {}) {
    const response = await fetch(`${HOST}${url}`, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    if (response.ok)
      return Promise.resolve(method != 'DELETE' ? await response.json() : {})
    else
      return Promise.reject(await response.json());
  }
}

export default HttpService
