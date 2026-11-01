# Products — what we make and sell, and the pages people see

Built from the markdown in `company/`, `customers/`, `brand/` and `departments/`. If a product and a markdown file disagree, the markdown wins: fix the doc, then rebuild the product.

| Folder | Built in | Plan lives in |
|---|---|---|
| `product.md` | Round 2 | `departments/sales/offer.md` |
| `website/` | Round 4 | `departments/marketing/website.md` |
| `course/` | Round 2 (if the product is a course) | `departments/content/curriculum.md` |

Lead magnet pages live next to their plans in `departments/marketing/lead-magnets/`.

All plain HTML/CSS/JS. Open the `index.html` in a browser to see it.
