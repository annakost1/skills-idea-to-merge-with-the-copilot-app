import test from 'node:test';
import assert from 'node:assert/strict';
import { formatBookmark, normalizeBookmarkUrl, readStoredBookmarks } from '../src/lib/bookmarks.js';

test('normalizes a URL with and without https to the same value', () => {
  assert.equal(normalizeBookmarkUrl('www.example.com'), 'https://www.example.com');
  assert.equal(normalizeBookmarkUrl('https://www.example.com'), 'https://www.example.com');
});

test('recovers gracefully from empty, corrupted, legacy, and non-array storage values', () => {
  for (const value of [null, '', 'not-json', '"legacy bookmark"', '{"url":"https://example.com"}', '42']) {
    assert.deepEqual(readStoredBookmarks(value), []);
  }
});

test('discards malformed stored rows while retaining valid bookmarks', () => {
  const raw = JSON.stringify([
    { url: 'https://www.example.com', slug: 'mona-7fk2' },
    { url: 'javascript:alert(1)', slug: 'mona-evil' },
    { url: 3, slug: 'mona-abcd' },
    null,
  ]);
  assert.deepEqual(readStoredBookmarks(raw), [{ url: 'https://www.example.com', slug: 'mona-7fk2' }]);
});

test('formats a saved bookmark using the exact separator', () => {
  assert.equal(
    formatBookmark({ url: 'https://www.example.com', slug: 'mona-7fk2' }),
    'https://www.example.com :: mona-7fk2',
  );
});
