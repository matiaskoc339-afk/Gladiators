let serial = 0;
export const uid = (prefix = 'id') => `${prefix}-${Date.now().toString(36)}-${(++serial).toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
export const clamp = (n, a, b) => Math.min(b, Math.max(a, Number.isFinite(n) ? n : a));
export const int = (a, b, rng = Math.random) => Math.floor(rng() * (b - a + 1)) + a;
export const pick = (list, rng = Math.random) => list[int(0, list.length - 1, rng)];
export const copy = x => JSON.parse(JSON.stringify(x));
export const seeded = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
export const money = n => Math.floor(n).toLocaleString('es-ES');
