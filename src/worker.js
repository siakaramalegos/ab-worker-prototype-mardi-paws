/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request) {
    async function MethodNotAllowed(request) {
      return new Response(`Method ${request.method} not allowed.`, {
        status: 405,
        headers: {
          Allow: "GET",
        },
      });
    }
    // Only GET requests work with this proxy.
    if (request.method !== "GET") return MethodNotAllowed(request);

    const newRequest = new Request(`https://sia.codes/`)
    // const newRequest = new Request(`https://mardipaws.myshopify.com/`)
    // const newRequest = new Request(`https://performance.shopify.com/`)

    request.headers.forEach((value, key) => {
      console.log(`${key} ==> ${value}`);
      newRequest.headers.set(key, value)
    })
    // newRequest.headers = request.headers
    console.log(newRequest.headers.get("User-Agent"))
    return fetch(newRequest);
  },
};
