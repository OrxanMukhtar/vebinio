#!/usr/bin/env python3
"""VEBINIO brand assets: hand-authored favicon + composited OG card."""
from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

ROOT = Path("/workspace")
GROK = ROOT / ".grok"
BRAND = ROOT / "public" / "brand"

# Midnight Amber
DEEP = (8, 8, 23)          # #080817
NAVY = (26, 26, 46)        # #1A1A2E
SURFACE = (37, 37, 61)     # #25253D
AMBER = (255, 180, 0)      # #FFB400
CREAM = (246, 234, 214)    # #F6EAD6
GREY = (176, 176, 176)     # #B0B0B0
RAIL = (14, 14, 32)        # deeper than navy, still in family
BORDER = (58, 58, 86)
TRACK = (18, 18, 38)

# Faithful 16px simplification of public/brand/mark.png:
# amber geometric V, cream inner facet, pixel squares breaking off upper left.
FAVICON_GRID = [
    "................",
    "................",
    "...AA...........",
    "...AAA..........",
    "..A.AACC...AAAA.",
    "..AAACCC...AAAA.",
    ".AAAAACCC.AAAAA.",
    "..AA.CCCC.AAAA..",
    "..AAACCCCAAAAA..",
    "...A.AAAAAAAA...",
    ".....AAAAAAAA...",
    "......AAAAAA....",
    "......AAAAAA....",
    ".......AAAA.....",
    "................",
    "................",
]


def merged_rects(grid: list[str], ch: str) -> list[tuple[int, int, int, int]]:
    rects = []
    for y, row in enumerate(grid):
        x = 0
        while x < len(row):
            if row[x] != ch:
                x += 1
                continue
            x0 = x
            while x < len(row) and row[x] == ch:
                x += 1
            rects.append((x0, y, x - x0, 1))
    return rects


def write_favicon(path: Path) -> None:
    amber = merged_rects(FAVICON_GRID, "A")
    cream = merged_rects(FAVICON_GRID, "C")

    def rects(items: list[tuple[int, int, int, int]]) -> str:
        lines = []
        for x, y, w, h in items:
            lines.append(f'    <rect x="{x}" y="{y}" width="{w}" height="{h}"/>')
        return "\n".join(lines)

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
  <rect width="16" height="16" rx="3" fill="#1A1A2E"/>
  <g fill="#FFB400">
{rects(amber)}
  </g>
  <g fill="#F6EAD6">
{rects(cream)}
  </g>
</svg>
'''
    path.write_text(svg)


def raster_favicon(scale: int = 16) -> Image.Image:
    n = 16
    im = Image.new("RGBA", (n * scale, n * scale), (0, 0, 0, 0))
    dr = ImageDraw.Draw(im)
    dr.rounded_rectangle([0, 0, n * scale - 1, n * scale - 1], radius=3 * scale, fill=NAVY + (255,))
    for y, row in enumerate(FAVICON_GRID):
        for x, ch in enumerate(row):
            if ch == ".":
                continue
            col = (AMBER if ch == "A" else CREAM) + (255,)
            dr.rectangle(
                [x * scale, y * scale, (x + 1) * scale - 1, (y + 1) * scale - 1],
                fill=col,
            )
    return im


def radial_vignette(w: int, h: int) -> Image.Image:
    yy, xx = np.mgrid[0:h, 0:w]
    cx, cy = w / 2, h / 2
    rx, ry = w * 0.72, h * 0.78
    r = np.sqrt(((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2)
    # 0 in the middle, 1 at the edges
    t = np.clip((r - 0.35) / 0.85, 0, 1)
    t = t * t
    dark = np.array(DEEP, dtype=np.float32)
    mid = np.array((18, 18, 40), dtype=np.float32)
    base = mid * (1 - t)[..., None] + dark * t[..., None]
    return Image.fromarray(base.astype(np.uint8), "RGB")


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return m


def build_card() -> Image.Image:
    W, H = 1200, 630
    canvas = radial_vignette(W, H).convert("RGBA")
    draw = ImageDraw.Draw(canvas)

    # Quiet dot grid — design-desktop wallpaper, not a marketing gradient.
    for y in range(18, H, 28):
        for x in range(18, W, 28):
            draw.point((x, y), fill=SURFACE + (255,))

    # A few brand pixel squares in the outer margin, echoing the mark.
    specks = [
        (16, 14, 4, AMBER),
        (24, 22, 3, CREAM),
        (14, 600, 3, AMBER),
        (1172, 18, 4, CREAM),
        (1164, 606, 3, AMBER),
        (1176, 596, 2, CREAM),
    ]
    for x, y, s, col in specks:
        draw.rectangle([x, y, x + s - 1, y + s - 1], fill=col + (255,))

    # Window geometry
    ox, oy = 52, 40
    ww, wh = 1096, 550
    radius = 18
    title_h = 44
    status_h = 34
    rail_w = 78

    # Soft shadow
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle(
        [ox, oy + 14, ox + ww, oy + wh + 18],
        radius=radius,
        fill=(0, 0, 0, 150),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    canvas = Image.alpha_composite(canvas, shadow)

    # Window surface
    win = Image.new("RGBA", (ww, wh), (0, 0, 0, 0))
    wd = ImageDraw.Draw(win)
    wd.rectangle([0, 0, ww, wh], fill=SURFACE + (255,))
    # body
    wd.rectangle([0, title_h, ww, wh - status_h], fill=NAVY + (255,))
    # rail
    wd.rectangle([0, title_h, rail_w, wh - status_h], fill=RAIL + (255,))
    # 1px amber signature under the title bar
    wd.rectangle([0, title_h, ww, title_h + 1], fill=AMBER + (255,))
    # rail divider
    wd.rectangle([rail_w, title_h, rail_w, wh - status_h], fill=BORDER + (255,))

    # Traffic lights
    cy = title_h // 2
    lights = [GREY, CREAM, AMBER]
    for i, col in enumerate(lights):
        cx = 22 + i * 18
        wd.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=col + (255,))
        # small gloss
        gloss = tuple(min(255, c + 50) for c in col)
        wd.ellipse([cx - 3, cy - 4, cx - 0, cy - 1], fill=gloss + (180,))

    # Quiet status strip: palette chips + the mark's pixel motif. No progress bar.
    sy = wh - status_h // 2
    # Detached pixel squares, same motif as the mark — non-overlapping, crisp.
    cells = [
        (22, sy - 7, 4, AMBER),
        (28, sy - 7, 3, AMBER),
        (24, sy - 2, 2, CREAM),
        (22, sy + 1, 3, AMBER),
    ]
    for x, y, s, col in cells:
        wd.rectangle([x, y, x + s - 1, y + s - 1], fill=col + (255,))
    # three brand chips, right aligned
    chip = 10
    gap = 8
    chips = [AMBER, CREAM, GREY]
    total = len(chips) * chip + (len(chips) - 1) * gap
    cx0 = ww - 20 - total
    for i, col in enumerate(chips):
        x = cx0 + i * (chip + gap)
        wd.rounded_rectangle([x, sy - chip // 2, x + chip, sy + chip // 2], radius=2, fill=col + (255,))

    # Amber glow behind the lockup (left, where the V sits) — drawn before the real assets
    # so neither the rail mark nor the wordmark is blurred.
    glow = Image.new("RGBA", (ww, wh), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    # wordmark slot estimate
    wm = Image.open(BRAND / "wordmark.png").convert("RGBA")
    # trim near-invisible fringe
    alpha = wm.getchannel("A")
    mask_bin = alpha.point(lambda p: 255 if p > 12 else 0)
    bbox = mask_bin.getbbox() or (0, 0, wm.width, wm.height)
    wm = wm.crop(bbox)
    content_left = rail_w + 28
    content_right = ww - 36
    content_top = title_h + 16
    content_bottom = wh - status_h - 16
    max_w = content_right - content_left
    max_h = content_bottom - content_top
    scale = min(max_w / wm.width, max_h / wm.height)
    # Prefer a wide lockup; don't let it get taller than the slot.
    wm_w = int(wm.width * scale)
    wm_h = int(wm.height * scale)
    wm_r = wm.resize((wm_w, wm_h), Image.Resampling.LANCZOS)
    wx = content_left + (max_w - wm_w) // 2
    wy = content_top + (max_h - wm_h) // 2

    gx = wx + int(wm_w * 0.18)
    gy = wy + wm_h // 2
    gd.ellipse([gx - 150, gy - 70, gx + 150, gy + 70], fill=AMBER + (70,))
    glow = glow.filter(ImageFilter.GaussianBlur(28))
    win = Image.alpha_composite(win, glow)

    # Official symbol, centered in the rail. Pasted after the glow so it stays sharp.
    mark = Image.open(BRAND / "mark.png").convert("RGBA")
    target_w = 54
    target_h = max(1, round(mark.height * (target_w / mark.width)))
    mark_r = mark.resize((target_w, target_h), Image.Resampling.LANCZOS)
    rail_top = title_h + 1
    rail_bot = wh - status_h
    mx = (rail_w - target_w) // 2
    my = rail_top + (rail_bot - rail_top - target_h) // 2
    win.paste(mark_r, (mx, my), mark_r)
    win.paste(wm_r, (wx, wy), wm_r)

    # Clip to rounded window and stroke
    mask = rounded_mask((ww, wh), radius)
    clipped = Image.new("RGBA", (ww, wh), (0, 0, 0, 0))
    clipped.paste(win, (0, 0))
    clipped.putalpha(mask)

    # Hairline border in the mask
    border = Image.new("RGBA", (ww, wh), (0, 0, 0, 0))
    bd = ImageDraw.Draw(border)
    bd.rounded_rectangle([0, 0, ww - 1, wh - 1], radius=radius, outline=BORDER + (255,), width=1)
    # top inner highlight
    bd.arc([2, 2, ww - 3, radius * 2], 200, 340, fill=(246, 234, 214, 40))
    border.putalpha(ImageChops_multiply_alpha(border, mask))
    clipped = Image.alpha_composite(clipped, border)

    canvas.paste(clipped, (ox, oy), clipped)

    # Fine grain so the flat navy doesn't posterize in JPEG
    rgb = canvas.convert("RGB")
    arr = np.asarray(rgb).astype(np.int16)
    rng = np.random.default_rng(7)
    noise = rng.integers(-3, 4, size=arr.shape, dtype=np.int16)
    arr = np.clip(arr + noise, 0, 255).astype(np.uint8)
    return Image.fromarray(arr, "RGB")


def ImageChops_multiply_alpha(image: Image.Image, mask: Image.Image) -> Image.Image:
    r, g, b, a = image.split()
    a = Image.fromarray(
        (np.asarray(a).astype(np.uint16) * np.asarray(mask).astype(np.uint16) // 255).astype(np.uint8)
    )
    return a


def main() -> None:
    GROK.mkdir(parents=True, exist_ok=True)
    fav_stage = GROK / "favicon.svg.tmp"
    write_favicon(fav_stage)
    # previews for QA
    raster_favicon(16).save(GROK / "favicon-16.png")
    raster_favicon(8).save(GROK / "favicon-128.png")  # 16*8=128
    card = build_card()
    assert card.size == (1200, 630), card.size
    raw = GROK / "og-raw.png"
    card.save(raw, "PNG")
    print("raw", raw, card.size)


if __name__ == "__main__":
    main()
