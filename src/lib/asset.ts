export function asset(path?: string) {
  if (!path) return undefined;
  // 既に http(s) の絶対URLならそのまま返す
  if (/^https?:\/\//i.test(path)) return path;

  const base = import.meta.env.BASE_URL;
  // 先頭スラッシュを消してから連結
  const clean = path.replace(/^\/+/, '');
  return `${base}${clean}`;
}
