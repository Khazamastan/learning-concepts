# HTML Meta Tags: Purpose and Impact of Removal

| Meta Tag | Purpose | If Removed |
| --- | --- | --- |
| `<meta charset="utf-8">` | Defines character encoding so browsers render correctly | Browser falls back to legacy encoding (ISO-8859-1), causing mojibake for non-ASCII content |
| `<meta name="viewport" content="width=device-width, initial-scale=1">` | Controls layout on mobile devices | Mobile browsers default to 980px viewport, zoomed-out UI |
| `<meta name="description">` | Summary for search engines and link previews | Search engines auto-generate snippets; social previews degrade |
| `<meta name="robots" content="noindex">` | Limits indexing | Removing may expose staging/private pages to search indexing |
| Open Graph/Twitter Cards | Improve social share previews | Links display generic titles, no images |
| `<meta http-equiv="X-UA-Compatible" content="IE=edge">` | Forces modern rendering mode in IE | Older IE versions may render in quirks mode |

## Best Practices
1. Keep critical tags at top of `<head>` to ensure early parsing.
2. Use social tags (`og:title`, `og:image`, `twitter:card`) for marketing pages.
3. Automate meta management via React Helmet, Next.js metadata API, or templating macros.
4. Document which tags are mandatory per page type to avoid accidental removal.
