export async function onRequest(c) {
    const { request, env, params } = c; const k = `futbol_${params.serie}`;
    const cors = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
    if (request.method === "OPTIONS") return new Response("", { headers: cors });
    if (request.method === "GET") { const d = await env.ESGOLON_KV.get(k, "json"); return new Response(JSON.stringify(d || null), { headers: cors }); }
    if (request.method === "POST") { const b = await request.json(); await env.ESGOLON_KV.put(k, JSON.stringify(b)); return new Response(JSON.stringify({ ok: true }), { headers: cors }); }
    return new Response("ok", { headers: cors });
}