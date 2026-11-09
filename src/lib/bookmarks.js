const slugPattern = /^mona-[0-9A-Za-z]{4}$/;
const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function normalizeBookmarkUrl(input) {
  const value = typeof input === 'string' ? input.trim() : '';
  if (!value) throw new TypeError('Enter a URL to save.');

  const address = value.startsWith('//')
    ? `https:${value}`
    : /^[a-z][a-z\d+.-]*:\/\//i.test(value)
      ? value
      : `https://${value}`;

  let parsed;
  try {
    parsed = new URL(address);
  } catch {
    throw new TypeError('Enter a valid web URL, such as example.com.');
  }

  if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname) {
    throw new TypeError('Only HTTP and HTTPS URLs can be saved.');
  }

  return parsed.pathname === '/' ? `${parsed.origin}${parsed.search}${parsed.hash}` : parsed.href;
}

export function readStoredBookmarks(rawValue) {
  if (typeof rawValue !== 'string' || rawValue.trim() === '') return [];

  try {
    const decoded = JSON.parse(rawValue);
    if (!Array.isArray(decoded)) return [];

    const bookmarks = [];
    const seenSlugs = new Set();
    for (const entry of decoded) {
      if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) continue;
      if (typeof entry.url !== 'string' || typeof entry.slug !== 'string' || !slugPattern.test(entry.slug)) continue;
      if (seenSlugs.has(entry.slug)) continue;

      try {
        bookmarks.push({ url: normalizeBookmarkUrl(entry.url), slug: entry.slug });
        seenSlugs.add(entry.slug);
      } catch {
        // A malformed saved row is discarded without invalidating other rows.
      }
    }
    return bookmarks;
  } catch {
    return [];
  }
}

export function formatBookmark(bookmark) {
  return `${bookmark.url} :: ${bookmark.slug}`;
}

export function makeBookmarkSlug(existingSlugs = []) {
  const existing = new Set(existingSlugs);
  const randomBytes = new Uint8Array(4);
  for (let attempt = 0; attempt < 128; attempt += 1) {
    crypto.getRandomValues(randomBytes);
    const slug = `mona-${Array.from(randomBytes, (byte) => base62[byte % base62.length]).join('')}`;
    if (!existing.has(slug)) return slug;
  }
  throw new Error('Could not generate a unique bookmark slug. Try again.');
}
