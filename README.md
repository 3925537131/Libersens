# Libersens — Shopify theme

A custom Shopify theme for **Libersens**, a female intimate-products brand (vibrators and
care accessories). The structure mirrors the reference store (piratefuntech): a
**product-line-led header**, a featured **Best sellers** collection, an **Accessories** page,
a **User guide**, and a full set of policy pages in the footer.

All copy and imagery are auto-generated placeholders — replace them with real products,
photos, and legal text before launch.

## Site map

### Header navigation (product-line-led, mirrors the reference)
| Menu item | Links to | Template |
|-----------|----------|----------|
| Lumé (dropdown) | `/pages/lume` | `templates/page.lume.json` |
| Aura (dropdown) | `/pages/aura` | `templates/page.aura.json` |
| Petite | `/pages/petite` | `templates/page.petite.json` |
| Best sellers | `/pages/best-sellers` | `templates/page.best-sellers.json` |
| Accessories | `/pages/accessories` | `templates/page.accessories.json` |
| User guide (dropdown) | `/pages/user-guide` | `templates/page.user-guide.json` |

### Footer (mirrors the reference policy/info set)
| Link | Links to | Template |
|------|----------|----------|
| About us | `/pages/about-us` | `templates/page.about-us.json` |
| Contact | `/pages/contact` | `templates/page.contact.json` |
| FAQ | `/pages/faq` | `templates/page.faq.json` |
| Refund policy | `/pages/refund-policy` | `templates/page.refund-policy.json` |
| Shipping policy | `/pages/shipping-policy` | `templates/page.shipping-policy.json` |
| Subscription terms | `/pages/subscription-terms` | `templates/page.subscription-terms.json` |
| Terms of service | `/pages/terms-of-service` | `templates/page.terms-of-service.json` |

The home page (`templates/index.json`) is the storefront, and `our-collection` /
`new-arrivals` pages are kept as extra landing pages you can link to or remove.

## Making the links work on Shopify (required one-time setup)

In Shopify, a theme template only renders when a matching **Page** exists in the admin and is
assigned that template. The content lives in the theme (sections fill in placeholder copy and
images), so you do **not** need to type anything into the page body — you only need the page to
exist with the right handle.

For each row in the tables above, in **Shopify admin → Online Store → Pages → Add page**:

1. Create a page whose **handle** matches the URL (e.g. title "Lumé" → handle `lume`).
   Set the handle under "Edit website SEO" if Shopify doesn't generate it automatically.
2. In the **Theme template** dropdown, select the matching template (e.g. `lume`).
3. Save. The page now renders at `/pages/lume` and the header/footer links resolve.

Required handles: `lume`, `aura`, `petite`, `best-sellers`, `accessories`, `user-guide`,
`about-us`, `contact`, `faq`, `refund-policy`, `shipping-policy`, `subscription-terms`,
`terms-of-service` (plus optional `our-collection`, `new-arrivals`).

> Tip: the header/footer links are hard-coded to `/pages/<handle>`, so the handle must match
> exactly. If you'd rather drive the menu from **Online Store → Navigation**, edit
> `sections/header.liquid`.

## Previewing locally

```bash
# Requires the Shopify CLI and a development store
shopify theme dev
```

This serves the theme against a store and lets you click through every header and footer link.
Opening the `.liquid`/`.json` files directly in a browser will **not** work — Liquid needs
Shopify to render.

## Replacing the placeholder content

- **Images:** `assets/libersens-*.png` and `assets/libersens-motion.gif`. Replace these files
  (keep the names) or pick real images per section in the theme editor.
- **Product lines (Lumé / Aura / Petite):** edit `templates/page.lume.json`,
  `page.aura.json`, `page.petite.json`. When you upload real products, repoint the
  `primary_link` / `button_link` fields to `/products/<handle>`.
- **Policies:** default legal copy lives in `sections/main-page.liquid`. Anything you type into
  the Shopify page body overrides it automatically.
- **Brand name, colors:** `config/settings_data.json` and `layout/theme.liquid`.
