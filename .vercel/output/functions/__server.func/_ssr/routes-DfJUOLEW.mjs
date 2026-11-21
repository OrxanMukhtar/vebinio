import { i as __toESM } from "../_runtime.mjs";
import { d as require_react_dom, q as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DfJUOLEW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = require_react_dom();
function SectionHeading({ file, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-4 max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-pixel text-xl text-amber",
				children: file
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-pixel text-4xl leading-tight text-balance text-cream sm:text-5xl",
				children: title
			}),
			text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl font-sans text-base leading-relaxed text-pretty text-grey",
				children: text
			}) : null
		]
	});
}
function cn(...parts) {
	return parts.filter(Boolean).join(" ");
}
function Chrome({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "chrome-btn",
		children
	});
}
function WindowFrame({ title, children, tone = "dark", className, status }) {
	const light = tone === "light";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("win-enter", light ? "win-light" : "win-dark", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-center gap-2 px-2", light ? "win-title-light" : "win-title-dark"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2 shrink-0 bg-amber",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-ui text-sm font-bold",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto flex gap-1",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chrome, { children: "_" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chrome, { children: "□" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chrome, { children: "×" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children }),
			status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("border-t-2 border-line px-2 py-1 font-ui text-xs", light ? "text-navy" : "text-grey"),
				children: status
			}) : null
		]
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "haqqimizda",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			file: "HAQQIMIZDA.TXT",
			title: "Biz kimik?"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowFrame, {
			title: "VEBINIO.TXT",
			tone: "light",
			status: "3 sətir  ·  yalnız oxu",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-4 font-sans text-sm leading-relaxed text-pretty text-navy sm:p-5 sm:text-base",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "VEBINIO dizayn və texnologiyanı birləşdirən rəqəmsal kreativ studiyadır." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Biz ideyaları yalnız vizual olaraq gözəl göstərməklə kifayətlənmirik. Onları real istifadə üçün nəzərdə tutulmuş, funksional və düşünülmüş rəqəmsal həllərə çeviririk." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Məqsədimiz bizneslərin rəqəmsal dünyada daha güclü görünməsinə və inkişaf etməsinə kömək etməkdir." })
				]
			})
		})]
	});
}
var BRIEF_KEY = "vebinio.brief";
function readEnv(name) {
	const value = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_AUTH_ENABLED": "false",
		"VITE_DEV_SERVER_HOST": "0.0.0.0"
	}[name];
	return typeof value === "string" ? value.trim() : "";
}
function safeEmail(value) {
	if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return value;
	return null;
}
function safePhone(value) {
	const digits = value.replace(/[^\d]/g, "");
	if (digits.length < 8 || digits.length > 15) return null;
	return digits;
}
function safeHttps(value) {
	try {
		const url = new URL(value);
		if (url.protocol !== "https:") return null;
		return url.toString();
	} catch {
		return null;
	}
}
function getContactChannel() {
	const email = safeEmail(readEnv("VITE_CONTACT_EMAIL"));
	if (email) return {
		kind: "email",
		address: email
	};
	const phone = safePhone(readEnv("VITE_CONTACT_WHATSAPP"));
	if (phone) return {
		kind: "whatsapp",
		phone
	};
	return null;
}
function getSocialLinks() {
	const specs = [
		["VITE_SOCIAL_INSTAGRAM", "Instagram"],
		["VITE_SOCIAL_LINKEDIN", "LinkedIn"],
		["VITE_SOCIAL_BEHANCE", "Behance"]
	];
	const links = [];
	for (const [key, label] of specs) {
		const href = safeHttps(readEnv(key));
		if (href) links.push({
			label,
			href
		});
	}
	return links;
}
function briefText(brief) {
	return `Ad: ${brief.name}\nE-poçt: ${brief.email}\nXidmət: ${brief.service}\n\n${brief.message}`;
}
function handoffBrief(brief, channel) {
	const text = briefText(brief);
	if (channel.kind === "email") {
		const subject = encodeURIComponent(`VEBINIO — ${brief.service}`);
		const body = encodeURIComponent(text);
		window.location.href = `mailto:${channel.address}?subject=${subject}&body=${body}`;
		return;
	}
	const url = `https://wa.me/${channel.phone}?text=${encodeURIComponent(text)}`;
	window.open(url, "_blank", "noopener,noreferrer");
}
function saveBriefLocally(brief) {
	try {
		localStorage.setItem(BRIEF_KEY, JSON.stringify(brief));
	} catch {}
}
function loadBriefLocally() {
	try {
		const raw = localStorage.getItem(BRIEF_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (typeof parsed.name !== "string" || typeof parsed.email !== "string" || typeof parsed.service !== "string" || typeof parsed.message !== "string") return null;
		return {
			name: parsed.name,
			email: parsed.email,
			service: parsed.service,
			message: parsed.message
		};
	} catch {
		return null;
	}
}
var SERVICES$1 = [
	"Veb-saytlar və tətbiqlər",
	"Brendinq və dizayn",
	"AI və avtomatlaşdırma",
	"Rəqəmsal məhsullar",
	"Texniki dəstək",
	"Digər"
];
var schema = object({
	name: string().trim().min(2, "Ad ən azı 2 simvol olmalıdır."),
	email: string().trim().email("Düzgün e-poçt ünvanı yazın."),
	service: string().min(1, "Xidmət seçin."),
	message: string().trim().min(20, "Layihəni bir neçə cümlə ilə təsvir edin.")
});
var EMPTY = {
	name: "",
	email: "",
	service: "",
	message: ""
};
function ContactForm() {
	const [values, setValues] = (0, import_react.useState)(EMPTY);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [status, setStatus] = (0, import_react.useState)({ kind: "idle" });
	(0, import_react.useEffect)(() => {
		const saved = loadBriefLocally();
		if (saved) setValues(saved);
	}, []);
	function update(key, value) {
		setValues((current) => ({
			...current,
			[key]: value
		}));
		setErrors((current) => ({
			...current,
			[key]: void 0
		}));
	}
	function onSubmit(event) {
		event.preventDefault();
		const parsed = schema.safeParse(values);
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) {
				const key = issue.path[0];
				if (typeof key === "string" && !next[key]) next[key] = issue.message;
			}
			setErrors(next);
			setStatus({ kind: "idle" });
			return;
		}
		setErrors({});
		const brief = parsed.data;
		const channel = getContactChannel();
		if (!channel) {
			saveBriefLocally(brief);
			setStatus({
				kind: "local",
				text: "Göndərilmədi. Əlaqə ünvanı hələ qoşulmayıb, ona görə mətn bu cihazda saxlanıldı. Ünvan əlavə olunanda yenidən göndərə bilərsiniz."
			});
			return;
		}
		handoffBrief(brief, channel);
		saveBriefLocally(brief);
		setStatus({
			kind: "handoff",
			text: channel.kind === "email" ? "E-poçt proqramınız açıldı. Mesaj yalnız siz göndərdikdən sonra studiya çatır." : "WhatsApp açıldı. Mesajı orada özünüz göndərin — bu forma onu avtomatik çatdırmır."
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "elaqe",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			file: "ELAQE.EXE",
			title: "Əlaqə",
			text: "Ad, e-poçt və qısa təsvir kifayətdir. Forma yoxlanılır, amma ünvan qoşulmayana qədər mesajı göndərilmiş saymırıq."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowFrame, {
			title: "YENI-MESAJ.EXE",
			status: status.kind === "idle" ? "Gözləyir" : "Qeyd olundu",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3 p-4 sm:p-5",
				onSubmit,
				noValidate: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "ad",
							label: "Ad",
							error: errors.name,
							value: values.name,
							onChange: (value) => update("name", value),
							autoComplete: "name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "epoct",
							label: "E-poçt",
							type: "email",
							error: errors.email,
							value: values.email,
							onChange: (value) => update("email", value),
							autoComplete: "email"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 font-ui text-sm font-bold text-cream",
						htmlFor: "xidmet",
						children: [
							"Xidmət",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "xidmet",
								className: "win-field font-sans font-normal",
								value: values.service,
								"aria-invalid": Boolean(errors.service),
								"aria-describedby": errors.service ? "xidmet-xeta" : void 0,
								onChange: (event) => update("service", event.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Xidmət seçin"
								}), SERVICES$1.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: service,
									children: service
								}, service))]
							}),
							errors.service ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								id: "xidmet-xeta",
								className: "font-sans text-sm font-normal text-amber",
								children: errors.service
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 font-ui text-sm font-bold text-cream",
						htmlFor: "tesvir",
						children: [
							"Layihənin təsviri",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "tesvir",
								className: "win-field font-sans font-normal",
								value: values.message,
								"aria-invalid": Boolean(errors.message),
								"aria-describedby": errors.message ? "tesvir-xeta" : void 0,
								onChange: (event) => update("message", event.target.value)
							}),
							errors.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								id: "tesvir-xeta",
								className: "font-sans text-sm font-normal text-amber",
								children: errors.message
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							"data-tone": "amber",
							className: "win-btn",
							children: "Göndər"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md font-sans text-xs leading-relaxed text-grey",
							children: "Serverə yazılmır. Qoşulmuş ünvan varsa, e-poçt və ya WhatsApp açılır."
						})]
					}),
					status.kind !== "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "win-light p-3",
						role: "status",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-ui text-sm font-bold text-navy",
							children: "VEBINIO"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-sans text-sm leading-relaxed text-navy",
							children: status.text
						})]
					}) : null
				]
			})
		})]
	});
}
function Field({ id, label, value, onChange, error, type = "text", autoComplete }) {
	const errorId = `${id}-xeta`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1 font-ui text-sm font-bold text-cream",
		htmlFor: id,
		children: [
			label,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				type,
				className: "win-field font-sans font-normal",
				value,
				autoComplete,
				"aria-invalid": Boolean(error),
				"aria-describedby": error ? errorId : void 0,
				onChange: (event) => onChange(event.target.value)
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				id: errorId,
				className: "font-sans text-sm font-normal text-amber",
				children: error
			}) : null
		]
	});
}
function Cta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowFrame, {
		title: "YENI-LAYIHE.EXE",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 p-5 sm:p-8 lg:grid-cols-[1.4fr_auto] lg:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-pixel text-xl text-amber",
					children: "HAZIR"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-pixel text-4xl leading-tight text-balance text-cream sm:text-6xl",
					children: "Yeni layihəyə hazırsınız?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl font-sans text-base leading-relaxed text-pretty text-cream",
					children: "İdeyanızı bizimlə paylaşın. Gəlin onu birlikdə reallaşdıraq."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#elaqe",
				"data-tone": "amber",
				className: "win-btn",
				children: "Layihəni müzakirə edək"
			})]
		})
	}) });
}
function Mark({ className, alt = "", size = "sm" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: size === "lg" ? "/brand/mark.png" : "/brand/mark-sm.png",
		alt,
		width: size === "lg" ? 720 : 256,
		height: size === "lg" ? 519 : 184,
		className: cn("h-auto w-full", className),
		decoding: "async"
	});
}
function Wordmark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/brand/wordmark.png",
		alt: "VEBINIO — Digital Creative Studio",
		width: 1600,
		height: 377,
		className: cn("h-auto w-full", className),
		decoding: "async"
	});
}
var LINKS$1 = [
	{
		id: "ana",
		label: "Ana səhifə"
	},
	{
		id: "xidmetler",
		label: "Xidmətlər"
	},
	{
		id: "layiheler",
		label: "Layihələr"
	},
	{
		id: "haqqimizda",
		label: "Haqqımızda"
	},
	{
		id: "elaqe",
		label: "Əlaqə"
	}
];
function Footer() {
	const socials = getSocialLinks();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mx-auto mt-14 w-full max-w-6xl px-4 pb-8 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "win-dark",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "win-title-dark flex items-center gap-2 px-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-ui text-xs font-bold",
					children: "VEBINIO"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 p-4 sm:p-5 lg:grid-cols-[minmax(0,16rem)_1fr] lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { className: "max-w-xs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-pixel text-2xl text-amber",
						children: "DIGITAL CREATIVE STUDIO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-3 flex flex-wrap gap-x-4 gap-y-2",
						"aria-label": "Alt",
						children: LINKS$1.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `#${link.id}`,
							className: "font-ui text-sm text-cream underline-offset-2 hover:text-amber hover:underline",
							children: link.label
						}, link.id))
					}),
					socials.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-3 flex flex-wrap gap-3",
						"aria-label": "Sosial",
						children: socials.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: link.href,
							className: "font-ui text-sm text-amber underline-offset-2 hover:underline",
							target: "_blank",
							rel: "noreferrer",
							children: link.label
						}, link.href))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-ui text-xs text-grey",
						children: "© 2026 VEBINIO. Bütün hüquqlar qorunur."
					})
				] })]
			})]
		})
	});
}
var LINKS = [
	{
		id: "ana",
		label: "Ana səhifə"
	},
	{
		id: "xidmetler",
		label: "Xidmətlər"
	},
	{
		id: "layiheler",
		label: "Layihələr"
	},
	{
		id: "haqqimizda",
		label: "Haqqımızda"
	},
	{
		id: "elaqe",
		label: "Əlaqə"
	}
];
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)("ana");
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const line = 104;
			let current = "ana";
			for (const link of LINKS) {
				const node = document.getElementById(link.id);
				if (!node) continue;
				if (node.getBoundingClientRect().top <= line) current = link.id;
			}
			setActive(current);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 px-3 pt-3 sm:px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "skip win-btn",
			href: "#ana",
			children: "Məzmuna keç"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "header-bar win-light relative mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-nowrap items-center gap-1 px-2 py-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#ana",
						className: "mr-auto flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "win-in grid size-11 shrink-0 place-items-center bg-navy p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "max-h-8" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "leading-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-ui text-base font-bold tracking-tight text-navy",
								children: "VEBINIO"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-pixel text-lg leading-none text-ink",
								children: "VEBINIO.EXE"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-1 lg:flex",
						"aria-label": "Əsas",
						children: LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `#${link.id}`,
							"data-active": active === link.id ? "true" : "false",
							"data-tone": active === link.id ? "amber" : "grey",
							className: "win-btn",
							"aria-current": active === link.id ? "true" : void 0,
							children: link.label
						}, link.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#elaqe",
						"data-tone": "amber",
						className: "win-btn shrink-0",
						children: "Layihəni başlayaq"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "win-btn shrink-0 lg:hidden",
						"aria-expanded": open,
						"aria-controls": "mobil-menu",
						onClick: () => setOpen((value) => !value),
						children: open ? "Bağla" : "Menyu"
					})
				]
			}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				id: "mobil-menu",
				className: "win-light absolute inset-x-0 top-full z-20 mt-1 flex flex-col gap-1 p-2 lg:hidden",
				"aria-label": "Mobil",
				children: LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `#${link.id}`,
					"data-active": active === link.id ? "true" : "false",
					"data-tone": active === link.id ? "amber" : "grey",
					className: "win-btn",
					onClick: () => setOpen(false),
					children: link.label
				}, link.id))
			}) : null]
		})]
	});
}
/** 16×16. `#` ink, `+` amber, `.` empty. */
var MAPS = {
	code: [
		"................",
		".##############.",
		".#++...........#",
		".##############.",
		".#............#.",
		".#..##........#.",
		".#...####.....#.",
		".#............#.",
		".#....####....#.",
		".#............#.",
		".##############.",
		"................",
		"................",
		"................",
		"................",
		"................"
	],
	layers: [
		"................",
		"....##########..",
		"...#++++++++##..",
		"..#+++++++++# #.",
		".##############.",
		".#++++++++++++#.",
		".##############.",
		"..##############",
		"..#++++++++++#..",
		"..############..",
		"................",
		"................",
		"................",
		"................",
		"................",
		"................"
	],
	chip: [
		"................",
		"....#......#....",
		"..############..",
		".#.#++++++++#.#.",
		".#.#++++++++#.#.",
		".#.#++####++#.#.",
		".#.#++++++++#.#.",
		".#.#++++++++#.#.",
		".#.#++++++++#.#.",
		"..############..",
		"....#......#....",
		"................",
		"................",
		"................",
		"................",
		"................"
	],
	app: [
		"................",
		".##############.",
		".#++..........#.",
		".##############.",
		".#............#.",
		".#..########..#.",
		".#..#......#..#.",
		".#..#......#..#.",
		".#..########..#.",
		".#............#.",
		".##############.",
		"................",
		"................",
		"................",
		"................",
		"................"
	],
	folder: [
		"................",
		"..######........",
		".##############.",
		".#++++++++++++#.",
		".#++++++++++++#.",
		".#++++++++++++#.",
		".#++++++++++++#.",
		".##############.",
		"................",
		"................",
		"................",
		"................",
		"................",
		"................",
		"................",
		"................"
	],
	monitor: [
		"................",
		".##############.",
		".#++++++++++++#.",
		".#++++++++++++#.",
		".#+++++##+++++#.",
		".#++++++++++++#.",
		".##############.",
		"......#..#......",
		"......####......",
		"....########....",
		"................",
		"................",
		"................",
		"................",
		"................",
		"................"
	],
	note: [
		"................",
		".############...",
		".#++++++++++#...",
		".#++++++++++#...",
		".#++######++#...",
		".#++++++++++#...",
		".#++######++#...",
		".#++++++++++#...",
		".############...",
		"................",
		"................",
		"................",
		"................",
		"................",
		"................",
		"................"
	],
	mail: [
		"................",
		".##############.",
		".#++++++++++++#.",
		".#++########++#.",
		".#++++####++++#.",
		".#+++++##+++++#.",
		".#++++++++++++#.",
		".##############.",
		"................",
		"................",
		"................",
		"................",
		"................",
		"................",
		"................",
		"................"
	]
};
function cells(rows, mark) {
	const rects = [];
	rows.forEach((row, y) => {
		for (let x = 0; x < 16; x += 1) if (row[x] === mark) rects.push({
			x,
			y
		});
	});
	return rects;
}
function PixelIcon({ name, className }) {
	const rows = MAPS[name];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 16 16",
		className: cn("size-8 text-cream", className),
		"aria-hidden": "true",
		shapeRendering: "crispEdges",
		children: [cells(rows, "#").map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: cell.x,
			y: cell.y,
			width: "1",
			height: "1",
			fill: "currentColor"
		}, `i${cell.x}-${cell.y}`)), cells(rows, "+").map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: cell.x,
			y: cell.y,
			width: "1",
			height: "1",
			fill: "var(--color-amber)"
		}, `a${cell.x}-${cell.y}`))]
	});
}
var SHORTCUTS = [
	{
		id: "xidmetler",
		label: "Xidmətlər",
		icon: "monitor"
	},
	{
		id: "layiheler",
		label: "Layihələr",
		icon: "folder"
	},
	{
		id: "elaqe",
		label: "Əlaqə",
		icon: "mail"
	}
];
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "ana",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowFrame, {
			title: "VEBINIO — Digital Creative Studio",
			status: "Hazır",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-center gap-6 p-4 sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-pixel text-xl tracking-wide text-amber",
						children: "DIGITAL CREATIVE STUDIO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 font-pixel text-5xl leading-tight text-balance text-cream sm:text-6xl",
						children: [
							"Rəqəmsal ideyaları",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-amber",
								children: "real nəticələrə"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"çeviririk."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl font-sans text-base leading-relaxed text-pretty text-cream",
						children: "Veb-saytlar, rəqəmsal məhsullar, brendinq və AI həlləri ilə ideyalarınızı həyata keçiririk."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#xidmetler",
							"data-tone": "amber",
							className: "win-btn",
							children: "Xidmətlərimiz"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#elaqe",
							className: "win-btn",
							children: "Bizimlə əlaqə"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "win-in bg-ink p-3 sm:p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							children: SHORTCUTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `#${item.id}`,
								className: "flex flex-col items-center gap-1 px-1 py-2 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixelIcon, {
									name: item.icon,
									className: "size-8"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-pixel text-lg leading-none text-cream",
									children: item.label
								})]
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mt-2 w-full max-w-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
								size: "lg",
								alt: "VEBINIO loqosu"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "win-light mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "win-title-light flex items-center gap-2 px-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixelIcon, {
									name: "note",
									className: "size-4 text-cream"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-ui text-xs font-bold",
									children: "QEYD.TXT"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-3 py-2 font-ui text-sm leading-snug text-navy",
								children: "İdeyan var. Gəlin onu reallaşdıraq."
							})]
						})
					]
				})]
			})
		})
	});
}
var STEPS = [
	{
		n: "01",
		title: "Brief",
		text: "İdeyanızı və ehtiyaclarınızı öyrənirik."
	},
	{
		n: "02",
		title: "Plan",
		text: "Layihənin strukturunu və həll yolunu müəyyənləşdiririk."
	},
	{
		n: "03",
		title: "Create",
		text: "Dizaynı və texniki icranı həyata keçiririk."
	},
	{
		n: "04",
		title: "Launch",
		text: "Layihəni istifadəyə veririk və lazım olduqda dəstək göstəririk."
	}
];
function Process() {
	const [step, setStep] = (0, import_react.useState)(1);
	const rootRef = (0, import_react.useRef)(null);
	const played = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const node = rootRef.current;
		if (!node) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let timer = 0;
		if (reduce) {
			setStep(4);
			played.current = true;
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			if (!entries.some((entry) => entry.isIntersecting) || played.current) return;
			played.current = true;
			let current = 1;
			setStep(1);
			timer = window.setInterval(() => {
				current += 1;
				setStep(current);
				if (current >= 4) window.clearInterval(timer);
			}, 420);
		}, { threshold: .4 });
		observer.observe(node);
		return () => {
			observer.disconnect();
			window.clearInterval(timer);
		};
	}, []);
	const filled = step * 4;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "proses",
		ref: rootRef,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			file: "PROSES.EXE",
			title: "Necə işləyirik?"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowFrame, {
			title: "SETUP.EXE",
			status: `${step} / 4 addım`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "progress-seg",
					"aria-hidden": "true",
					children: Array.from({ length: 16 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: index < filled ? "bg-amber" : "bg-surface" }, index))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "grid gap-2 sm:grid-cols-2",
					children: STEPS.map((item, index) => {
						const active = index < step;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-active": active ? "true" : "false",
							"data-tone": active ? "amber" : "grey",
							className: "win-btn is-block h-auto",
							onClick: () => setStep(index + 1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-pixel text-2xl leading-none",
										children: item.n
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block font-ui text-sm font-bold",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block font-sans text-xs font-normal leading-relaxed",
										children: item.text
									})
								]
							})
						}) }, item.n);
					})
				})]
			})
		})]
	});
}
function Dialog({ open, title, onClose, children }) {
	const titleId = (0, import_react.useId)();
	const closeRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const previous = document.activeElement;
		closeRef.current?.focus();
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKey);
		const overflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = overflow;
			previous?.focus();
		};
	}, [open, onClose]);
	if (!open || typeof document === "undefined") return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scrim fixed inset-0 z-40 grid place-items-center p-4",
		onMouseDown: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": titleId,
			className: "win-light win-enter max-h-[85vh] w-full max-w-lg overflow-auto",
			onMouseDown: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "win-title-light flex items-center gap-2 px-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2 shrink-0 bg-amber",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: titleId,
						className: "truncate font-ui text-sm font-bold",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						ref: closeRef,
						type: "button",
						className: "chrome-btn ml-auto",
						onClick: onClose,
						"aria-label": "Bağla",
						children: "×"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 text-navy",
				children
			})]
		})
	}), document.body);
}
var PROJECTS = [
	{
		id: "vitrin",
		title: "Şəhər vitrini",
		category: "Veb-sayt",
		summary: "Yerli brend üçün sakit vitrin saytının interfeys konsepsiyası.",
		detail: "Bu, real müştəri işi deyil. Konsept ekran vitrin saytının strukturunu göstərir: qısa giriş, məhsul sırası və aydın hərəkət. Məqsəd səhifəni bəzək yığınına çevirmədən brendi oxunaqlı saxlamaqdır.",
		mock: "vitrin"
	},
	{
		id: "mozaika",
		title: "Mozaika kimlik",
		category: "Brendinq",
		summary: "Loqo, rəng və tipo fayllarının bir qovluqda yığılmış kimlik konsepsiyası.",
		detail: "Konsept layihədir, tamamlanmış brend işi deyil. Fayl siyahısı kimlik sisteminin necə təhvil verilə biləcəyini göstərir: nişan, söz işarəsi, rəng qeydi və tipo. Heç bir real müştəri adı istifadə olunmur.",
		mock: "mozaika"
	},
	{
		id: "novbe",
		title: "Növbə masası",
		category: "Rəqəmsal məhsul",
		summary: "Qəbul və növbə üçün sadə masaüstü cədvəl konsepsiyası.",
		detail: "Demo ekrandır. Növbə sətirləri, vəziyyət və qısa əməliyyat düyməsi bir pəncərədə durur. Məqsəd gündəlik prosesi mürəkkəb panelə çevirmədən izlənilən etməkdir.",
		mock: "novbe"
	},
	{
		id: "katib",
		title: "Katib",
		category: "AI həlli",
		summary: "Uzun mətni qısa iş qeydinə yığan alətin masaüstü konsepsiyası.",
		detail: "Konsept layihədir. Sol tərəfdə mənbə mətn, sağda qısa xülasə və irəliləyiş zolağı var. Real model nəticəsi və ya müştəri sənədi kimi təqdim olunmur.",
		mock: "katib"
	}
];
function Mock({ kind }) {
	if (kind === "vitrin") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "win-in bg-cream p-2 text-navy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between bg-navy px-2 py-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-pixel text-lg text-cream",
				children: "VITRIN"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 bg-amber" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-1",
			children: [
				"01",
				"02",
				"03"
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-panel p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-2 h-8 bg-surface" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-ui text-xs font-bold",
					children: ["Məhsul ", item]
				})]
			}, item))
		})]
	});
	if (kind === "mozaika") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "win-in bg-panel p-2 text-navy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 font-ui text-xs font-bold",
			children: "C:\\MOZAIKA"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: [
			"nisan.v",
			"soz.png",
			"reng.txt",
			"tipo.set"
		].map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-2 border-b border-line py-1 font-ui text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 bg-amber" }), file]
		}, file)) })]
	});
	if (kind === "novbe") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "win-in bg-cream text-navy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 bg-surface px-2 py-1 font-ui text-xs font-bold text-cream",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "İş" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vəziyyət" })
			]
		}), [
			[
				"14",
				"Qəbul",
				"Gözləyir"
			],
			[
				"15",
				"Ölçü",
				"Hazırdır"
			],
			[
				"16",
				"Təhvil",
				"Növbədə"
			]
		].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 border-t border-line px-2 py-1 font-ui text-xs",
			children: row.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cell }, cell))
		}, row[0]))]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "win-in grid gap-2 bg-ink p-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-surface p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-ui text-xs text-grey",
				children: "Mənbə"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-ui text-xs leading-relaxed text-cream",
				children: "Uzun qeyd buraya düşür və sətir-sətir oxunur."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-surface p-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-ui text-xs text-grey",
					children: "Xülasə"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-ui text-xs leading-relaxed text-amber",
					children: "Qısa iş qeydi."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 h-2 bg-navy",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2/3 bg-amber" })
				})
			]
		})]
	});
}
function Projects() {
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const project = PROJECTS.find((item) => item.id === openId) ?? null;
	const close = (0, import_react.useCallback)(() => setOpenId(null), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "layiheler",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				file: "LAYIHELER.EXE",
				title: "Seçilmiş layihələr",
				text: "Hər layihənin arxasında bir ideya, düzgün yanaşma və diqqətli icra dayanır."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: PROJECTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "win-dark flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "win-title-dark flex items-center gap-2 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-pixel text-lg text-amber",
							children: "KONSEPT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ml-auto font-ui text-xs",
							children: item.category
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mock, { kind: item.mock }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-pixel text-3xl leading-tight text-cream",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-sans text-sm leading-relaxed text-pretty text-grey",
								children: item.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "win-btn mt-3",
								onClick: () => setOpenId(item.id),
								children: "Layihəyə bax"
							})
						]
					})]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(project),
				title: project ? `${project.title} — Konsept layihə` : "Konsept",
				onClose: close,
				children: project ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-pixel text-2xl text-amber",
							children: project.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mock, { kind: project.mock }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sans text-sm leading-relaxed text-pretty",
							children: project.detail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-ui text-xs",
							children: "Demo layihə · real müştəri işi deyil"
						})
					]
				}) : null
			})
		]
	});
}
var SERVICES = [
	{
		file: "WEB.EXE",
		title: "Veb-saytlar və tətbiqlər",
		text: "Biznesiniz üçün müasir, sürətli, mobil uyğun və funksional veb-saytlar və veb tətbiqlər hazırlayırıq.",
		icon: "code"
	},
	{
		file: "BREND.EXE",
		title: "Brendinq və dizayn",
		text: "Brendinizin vizual kimliyini, loqosunu, qrafik dizaynını və istifadəçi təcrübəsini formalaşdırırıq.",
		icon: "layers"
	},
	{
		file: "AI.EXE",
		title: "AI və avtomatlaşdırma",
		text: "Süni intellekt və avtomatlaşdırma həlləri ilə gündəlik iş proseslərini daha səmərəli edirik.",
		icon: "chip"
	},
	{
		file: "MEHSUL.EXE",
		title: "Rəqəmsal məhsullar",
		text: "Biznes ideyaları üçün xüsusi platformalar, sistemlər və rəqəmsal məhsullar yaradırıq.",
		icon: "app"
	}
];
function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "xidmetler",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			file: "XIDMETLER.EXE",
			title: "Nə edə bilərik?",
			text: "İdeyadan dizayna, dizayndan işlək rəqəmsal məhsula qədər."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
			children: SERVICES.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "win-dark flex flex-col transition-transform duration-150 ease-out hover:-translate-y-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "win-title-dark flex items-center gap-2 px-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixelIcon, {
						name: service.icon,
						className: "size-5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-ui text-xs font-bold",
						children: service.file
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col gap-2 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-pixel text-2xl leading-tight text-cream",
						children: service.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-sm leading-relaxed text-pretty text-grey",
						children: service.text
					})]
				})]
			}, service.file))
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto flex max-w-6xl flex-col gap-14 px-4 py-6 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid items-start gap-14 lg:grid-cols-2 lg:gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Process, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cta, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Home as component };
