// This file controls the buttons.
// Each button calls the backend API and prints the result on screen.

const out = document.getElementById("out");

// If your backend runs locally, keep this.
const API_BASE = "http://localhost:3000";

function show(obj) {
  // Render HTML blocks into the output container.
  out.innerHTML = '';

  if (typeof obj === 'string') {
    const p = document.createElement('p');
    p.className = 'out-message';
    p.textContent = obj;
    out.appendChild(p);
    return;
  }

  if (obj && typeof obj === 'object') {
    let hasContent = false;

    if (obj.message && typeof obj.message === 'string') {
      const p = document.createElement('p');
      p.className = 'out-message';
      p.textContent = obj.message;
      out.appendChild(p);
      hasContent = true;
    }

    Object.keys(obj).forEach(key => {
      if (key === 'message') return;
      hasContent = true;
      const val = obj[key];

      if (val === null || typeof val !== 'object') {
        const row = document.createElement('div');
        row.className = 'out-row';
        const k = document.createElement('span'); k.className = 'out-key'; k.textContent = key;
        const colon = document.createElement('span'); colon.textContent = ': ';
        const v = document.createElement('span'); v.className = 'out-val'; v.textContent = String(val);
        row.appendChild(k); row.appendChild(colon); row.appendChild(v);
        out.appendChild(row);
      } else {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = key;
        const pre = document.createElement('pre');
        pre.textContent = JSON.stringify(val, null, 2);
        details.appendChild(summary);
        details.appendChild(pre);
        out.appendChild(details);
      }
    });

    if (!hasContent) {
      out.textContent = String(obj);
    }
    return;
  }

  out.textContent = String(obj);
}

async function getJSON(url) {
  const res = await fetch(url);
  return res.json();
}

document.getElementById("btnFortune").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/fortune`);
  show(data);
});

document.getElementById("btnJoke").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/joke`);
  show(data);
});

document.querySelectorAll(".btnMood").forEach(btn => {
  btn.addEventListener("click", async () => {
    const mood = btn.dataset.mood;
    const data = await getJSON(`${API_BASE}/api/vibe?mood=${mood}`);
    show(data);
  });
});

document.getElementById("btnSmash").addEventListener("click", async () => {
  const res = await fetch(`${API_BASE}/api/smash`, { method: "POST" });
  const data = await res.json();
  show({ message: "SMASH registered 💥", ...data });
});

document.getElementById("btnSecret").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/secret?code=411L`);
  show(data);
});