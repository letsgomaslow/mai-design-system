import { readFileSync } from "node:fs";

const tokens = JSON.parse(readFileSync(new URL("../../src/tokens.json", import.meta.url), "utf8"));
const logoAssets = JSON.parse(readFileSync(new URL("../../src/logo-assets.json", import.meta.url), "utf8"));
const approvedLogoPaths = new Set(logoAssets.variants.map(({ path }) => path.toLowerCase()));
const approvedColors = new Set(
  Object.values(tokens).flatMap((group) =>
    typeof group === "object" ? Object.values(group).filter((value) => /^#[0-9a-f]{6}$/i.test(value)) : [],
  ).map((value) => value.toLowerCase()),
);

const rules = [
  {
    ruleId: "copy.em-dash",
    message: "Replace em dashes with direct sentence structure.",
    matches: (source) => visibleText(source).includes("—"),
  },
  {
    ruleId: "copy.hype",
    message: "Remove hype or unsupported certainty.",
    matches: (source) => /\b(revolutionary|game-changing|guaranteed|disruptive)\b/i.test(visibleText(source)),
  },
  {
    ruleId: "copy.self-certifying",
    message: "Show evidence instead of self-certifying the claim.",
    matches: (source) => /\b(honest|real|plainly|by design)\b/i.test(visibleText(source)),
  },
  {
    ruleId: "content.unresolved-variable",
    message: "Resolve all template variables before release.",
    matches: (source) => /\{\{[^}]+\}\}|\b(?:CLIENT NAME|PRESENTER NAME|PLACEHOLDER)\b/i.test(source),
  },
  {
    ruleId: "evidence.unlabeled-claim",
    message: "Label quantitative claims with an evidence status beside the claim.",
    matches: hasUnlabeledClaim,
  },
  {
    ruleId: "evidence.missing-source",
    message: "Production and modeled evidence require adjacent source provenance.",
    matches: hasUnsourcedEvidence,
  },
  {
    ruleId: "visual.pink-fill",
    message: "Reserve pink backgrounds for small signals, underlines, or pseudo-elements.",
    matches: hasPinkElementFill,
  },
  {
    ruleId: "visual.pink-readable-text",
    message: "Use accessible purple for readable links and text. Pink is a non-text signal.",
    matches: hasPinkReadableText,
  },
  {
    ruleId: "visual.interactive-capsule",
    message: "Use capsules only for non-interactive taxonomy labels. Keep actions and controls square.",
    matches: hasInteractiveCapsule,
  },
  {
    ruleId: "visual.structural-radius",
    message: "Use zero radius for actions, controls, and structural surfaces. Capsules are limited to non-interactive taxonomy labels.",
    matches: hasRoundedStructure,
  },
  {
    ruleId: "visual.unapproved-color",
    message: "Use colors from the canonical Brand OS token source.",
    matches: hasUnapprovedColor,
  },
  {
    ruleId: "visual.unsupported-font",
    message: "Use Manrope, DM Sans, or IBM Plex Mono and approved platform fallbacks.",
    matches: (source) => /font-family\s*:[^;}]*\b(?:Arial|Helvetica|Inter|Roboto|Georgia|Times New Roman)\b/i.test(source),
  },
  {
    ruleId: "asset.unapproved-logo",
    message: "Use an immutable designer-supplied Maslow logo asset without redrawing, recoloring, tracing, cropping, or re-encoding it.",
    matches: hasUnapprovedLogo,
  },
];

function visibleText(source) {
  if (!/<[a-z][\s\S]*>/i.test(source)) return source;
  return source
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<!--([\s\S]*?)-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|gt|lt|amp|quot);/gi, " ");
}

function styleRules(source) {
  const blocks = [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((match) => ({
    selector: match[1].trim(),
    declarations: match[2],
  }));
  const inline = [...source.matchAll(/<([a-z][\w-]*)([^>]*?)\sstyle=["']([^"']*)["'][^>]*>/gi)].map((match) => ({
    selector: `${match[1]} ${match[2]}`.trim(),
    declarations: match[3],
  }));
  return [...blocks, ...inline];
}

function hasPinkElementFill(source) {
  const pink = /background(?:-color)?\s*:\s*(?:#(?:ee7bb3|da85b2)|var\([^)]*(?:pink|signal)[^)]*\))/i;
  const signal = /::(?:before|after)|\b(?:signal|underline|accent-line|interaction-dot)\b/i;
  return styleRules(source).some(({ selector, declarations }) => pink.test(declarations) && !signal.test(selector));
}

function hasPinkReadableText(source) {
  const pinkText = /(?:^|;)\s*color\s*:\s*(?:#(?:ee7bb3|da85b2)|var\([^)]*(?:pink|signal)[^)]*\))/i;
  return styleRules(source).some(({ declarations }) => pinkText.test(declarations));
}

function hasRoundedStructure(source) {
  const exception = /avatar|status[-_ ]?dot|step[-_ ]?marker|small[-_ ]?signal|interaction[-_ ]?dot|::(?:before|after)/i;
  const customProperties = new Map(
    [...source.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+)/g)].map((match) => [match[1].toLowerCase(), match[2].trim()]),
  );
  return styleRules(source).some(({ selector, declarations }) =>
    [...declarations.matchAll(/border-radius\s*:\s*([^;}]+)/gi)].some((match) => {
      if (isZeroRadius(match[1], customProperties) || exception.test(selector)) return false;
      return !(isTaxonomySelector(selector) && isCapsuleRadius(match[1], customProperties));
    }),
  );
}

function hasInteractiveCapsule(source) {
  const interactiveElement = /^(?:a|button|input|select|textarea|summary|label)$/i;
  const interactiveAttribute = /\s(?:href|on[a-z]+|tabindex|contenteditable)\s*=|\srole\s*=\s*["'](?:button|link|checkbox|menuitem|option|radio|switch|tab|treeitem)["']/i;
  const elements = [...source.matchAll(/<([a-z][\w-]*)\b([^>]*\bdata-taxonomy-label\b[^>]*)>/gi)];
  if (elements.some((match) => interactiveElement.test(match[1]) || interactiveAttribute.test(match[2]))) return true;

  return styleRules(source).some(({ selector, declarations }) =>
    isTaxonomySelector(selector)
      && (/(?:^|[\s>+~,])(?:a|button|input|select|textarea|summary)(?:\b|[.#[:])/i.test(selector)
        || /cursor\s*:\s*pointer/i.test(declarations)),
  );
}

function isTaxonomySelector(selector) {
  return /data-taxonomy-label/i.test(selector);
}

function isCapsuleRadius(value, customProperties, visited = new Set()) {
  const normalized = value.trim().toLowerCase();
  if (normalized === "9999px") return true;
  const variable = normalized.match(/^var\((--[\w-]+)(?:,[^)]+)?\)$/);
  if (!variable || visited.has(variable[1])) return false;
  if (/--(?:maslow-)?radius-capsule$/.test(variable[1])) return true;
  const resolved = customProperties.get(variable[1]);
  if (!resolved) return false;
  visited.add(variable[1]);
  return isCapsuleRadius(resolved, customProperties, visited);
}

function isZeroRadius(value, customProperties, visited = new Set()) {
  const normalized = value.trim().toLowerCase();
  if (/^0(?:px|rem|em|%)?(?:\s+0(?:px|rem|em|%)?){0,3}$/.test(normalized)) return true;
  const variable = normalized.match(/^var\((--[\w-]+)(?:,[^)]+)?\)$/);
  if (!variable || visited.has(variable[1])) return false;
  const resolved = customProperties.get(variable[1]);
  if (!resolved) return false;
  visited.add(variable[1]);
  return isZeroRadius(resolved, customProperties, visited);
}

function normalizeHex(value) {
  const hex = value.toLowerCase();
  if (hex.length === 4) return `#${hex.slice(1).split("").map((character) => character.repeat(2)).join("")}`;
  return hex;
}

function hasUnapprovedColor(source) {
  return [...source.matchAll(/#[0-9a-f]{3}(?:[0-9a-f]{3})?\b/gi)]
    .map((match) => normalizeHex(match[0]))
    .some((color) => !approvedColors.has(color));
}

function hasUnapprovedLogo(source) {
  const references = [...source.matchAll(/(?:src|href)=["']([^"']*(?:maslow|logo)[^"']*)["']/gi)]
    .map((match) => match[1]);
  return references.some((reference) => {
    const normalized = decodeURIComponent(reference)
      .split(/[?#]/, 1)[0]
      .replaceAll("\\", "/")
      .toLowerCase();
    return ![...approvedLogoPaths].some((path) => normalized.endsWith(path));
  });
}

function hasUnlabeledClaim(source) {
  const claim = /\b\d+(?:\.\d+)?(?:%|×|x)(?=\s|[.,;:)</]|$)/i;
  if (!claim.test(visibleText(source))) return false;
  return !/data-evidence-status=["'](?:production|modeled|illustrative|in_preparation)["']/i.test(source);
}

function hasUnsourcedEvidence(source) {
  return [...source.matchAll(/<[^>]+data-evidence-status=["'](?:production|modeled)["'][^>]*>/gi)]
    .some((match) => !/data-evidence-source=["'][^"']+["']/i.test(match[0]));
}

export function validateSource(source, input, mode = "draft") {
  const isRelease = mode === "release";
  const violations = rules.filter(({ matches }) => matches(source)).map(({ ruleId, message }) => ({
    ruleId,
    severity: isRelease ? "error" : "warning",
    location: input,
    message,
    blocking: isRelease,
  }));
  return { mode, input, blocking: isRelease && violations.length > 0, violations };
}
