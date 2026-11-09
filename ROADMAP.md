# Mona's Bookmark Manager Roadmap

This roadmap reflects the current app behavior and open project issues. No delivery dates are committed.

## 🚀 Planned features

- **Search and filter bookmarks.** Find saved entries by URL or slug, without changing the saved collection. Tracked in [#7](https://github.com/annakost1/skills-idea-to-merge-with-the-copilot-app/issues/7).
- **Back up and restore bookmarks.** Let users export and restore their collection, and clearly explain that bookmarks are stored on this device. Tracked in [#6](https://github.com/annakost1/skills-idea-to-merge-with-the-copilot-app/issues/6).

## 🐛 Known bugs & risks

- **Browser storage loss.** Bookmarks currently live only in `localStorage`; clearing site data can remove them. A backup/restore flow is not yet available. Tracked in [#6](https://github.com/annakost1/skills-idea-to-merge-with-the-copilot-app/issues/6).
- **Clipboard permission dependency.** Copying a slug can fail when clipboard access is unavailable or denied. The app reports the failure and keeps the slug visible for manual copying.

## Summary

| Area | Roadmap item | Current status |
| --- | --- | --- |
| Planned feature | Search and filter bookmarks | Open issue #7 |
| Planned feature | Back up and restore bookmarks | Open issue #6 |
| Risk | Browser storage loss | Present: bookmarks are device-local |
| Risk | Clipboard permission dependency | Present: manual copy may be needed |
