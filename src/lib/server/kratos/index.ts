import { env } from '$env/dynamic/private';

const url = env.BASE_PATH

export async function login(username: string, password: string) {
  const response = await fetch(`${url}/self-service/login/browser`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })

  if (response.status != 200) {
    console.log(response)
    return await response.json()
  }
  const resp = await response.json()
  let csrfToken;
  let method;
  for (const node of Object.values(resp.ui.nodes) as Array<{ attributes: { name: string , value: string} }>) {
    if (node.attributes.name == "csrf_token") {
      csrfToken = node.attributes.value;
    }
    if (node.attributes.name == "method") {
      method = node.attributes.value;
    }
  }
  const cookies = resp.headers
  console.log(`Cookies: ${cookies}`)

  const logIn = await fetch(resp.ui.action, {
    credentials: 'include',
    method: resp.ui.method,
    body: JSON.stringify({
      "identifier": username,
      "password": password,
      "method": method,
      "csrf_token": csrfToken
    }),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Cookie": cookies
    }
  })
  return await logIn.json()
}