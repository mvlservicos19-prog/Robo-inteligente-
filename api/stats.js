export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const LKEY = "cgrzb084pm55BPLw";
  const LSEC = "aYNLJnQZKP2uDPBQ53qg4yltUrzvgk2q";
  const LBASE = "https://livescore-api.com/api-client";

  const { match_id, type } = req.query;

  try {
    // Busca jogos ao vivo
    if (type === "live" || !type) {
      const url = `${LBASE}/scores/live.json?key=${LKEY}&secret=${LSEC}`;
      const r = await fetch(url, { headers: { "Accept": "application/json" } });
      const d = await r.json();
      return res.status(200).json(d);
    }

    // Busca estatísticas de um jogo
    if (type === "stats" && match_id) {
      const url = `${LBASE}/scores/statistics.json?key=${LKEY}&secret=${LSEC}&match_id=${match_id}`;
      const r = await fetch(url, { headers: { "Accept": "application/json" } });
      const d = await r.json();
      return res.status(200).json(d);
    }

    return res.status(400).json({ error: "Parametros invalidos" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
