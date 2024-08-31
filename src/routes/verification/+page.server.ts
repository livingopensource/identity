import { env } from '$env/dynamic/private';
import { redirect, error } from "@sveltejs/kit";

const authURL = env.BASE_PATH

/** @type {import('./$types').PageServerLoad} */
export async function load({url, request}) {
  const flow = url.searchParams.get("flow") || null
  if (flow != null) {
    const response = await fetch(`${authURL}/self-service/verification/flows?id=${flow}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Cookie": request.headers.get('cookie') || ''
      }
    })
    if (response.status != 200) {
      const data = await response.json()
      console.log(data)
      return {id: flow, kratos: data} 
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
    return {id: flow, csrfToken: csrfToken, methods: method, kratos: resp} 
  }
  const response = await fetch(`${authURL}/self-service/verification/browser`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Cookie": request.headers.get('cookie') || ''
    }
  })
  if (response.ok) {
    return redirect(303, `/verification?flow=${(await response.json()).id}`)
  }
  return error(404, "Not found")
}