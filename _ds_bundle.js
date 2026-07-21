/* @ds-bundle: {"format":4,"namespace":"MaslowAIDesignSystem_015edb","components":[{"name":"CTAButton","sourcePath":"components/actions/CTAButton.jsx"},{"name":"CTALink","sourcePath":"components/actions/CTALink.jsx"},{"name":"CategoryTag","sourcePath":"components/badges/CategoryTag.jsx"},{"name":"PillBadge","sourcePath":"components/badges/PillBadge.jsx"},{"name":"SectionEyebrow","sourcePath":"components/badges/SectionEyebrow.jsx"},{"name":"StatusBadge","sourcePath":"components/badges/StatusBadge.jsx"},{"name":"CaseStudyCard","sourcePath":"components/cards/CaseStudyCard.jsx"},{"name":"StatBlock","sourcePath":"components/cards/StatBlock.jsx"},{"name":"TestimonialBlock","sourcePath":"components/cards/TestimonialBlock.jsx"},{"name":"FormInput","sourcePath":"components/forms/FormInput.jsx"},{"name":"FormTextArea","sourcePath":"components/forms/FormTextArea.jsx"},{"name":"NavHeader","sourcePath":"components/navigation/NavHeader.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"}],"sourceHashes":{"components/actions/CTAButton.jsx":"a2616c820246","components/actions/CTALink.jsx":"e9cc886b2ec5","components/badges/CategoryTag.jsx":"02133a28a62e","components/badges/PillBadge.jsx":"de0ffe420fbe","components/badges/SectionEyebrow.jsx":"ee736614e99b","components/badges/StatusBadge.jsx":"c2731df916b2","components/cards/CaseStudyCard.jsx":"872960688b42","components/cards/StatBlock.jsx":"bd42022fa7b9","components/cards/TestimonialBlock.jsx":"b1d32348d23a","components/forms/FormInput.jsx":"d928f4a6f805","components/forms/FormTextArea.jsx":"f74b9db3ffd9","components/navigation/NavHeader.jsx":"6d679284d772","components/navigation/SiteFooter.jsx":"242651de6fb9"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MaslowAIDesignSystem_015edb = window.MaslowAIDesignSystem_015edb || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/CTAButton.jsx
try { (() => {
function CTAButton({
  children,
  href = "#",
  variant = "primary",
  onClick
}) {
  const base = {
    height: 42,
    display: "inline-flex",
    alignItems: "center",
    padding: "0 18px",
    borderRadius: 8,
    font: "600 12px var(--font-primary)",
    letterSpacing: "2px",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
    border: "none"
  };
  const looks = {
    primary: {
      background: "var(--action-button)",
      color: "var(--maslow-white)"
    },
    dark: {
      background: "var(--maslow-dark-navy)",
      color: "var(--maslow-white)"
    },
    ghost: {
      background: "transparent",
      color: "var(--maslow-dark-navy)",
      boxShadow: "inset 0 0 0 1px var(--maslow-dark-navy)"
    }
  };
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    style: {
      ...base,
      ...looks[variant]
    }
  }, children);
}
Object.assign(__ds_scope, { CTAButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/CTAButton.jsx", error: String((e && e.message) || e) }); }

// components/actions/CTALink.jsx
try { (() => {
function CTALink({
  children,
  href = "#"
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      font: "700 9px var(--font-primary)",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "var(--action-link)",
      textDecoration: "none"
    },
    onMouseOver: e => e.currentTarget.style.color = "var(--action-link-hover)",
    onMouseOut: e => e.currentTarget.style.color = "var(--action-link)"
  }, children, "\u00A0\u00A0>");
}
Object.assign(__ds_scope, { CTALink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/CTALink.jsx", error: String((e && e.message) || e) }); }

// components/badges/CategoryTag.jsx
try { (() => {
const PILLARS = {
  strategy: "var(--pillar-strategy)",
  technology: "var(--pillar-technology)",
  design: "var(--pillar-design)"
};
function CategoryTag({
  pillar = "technology",
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 12px var(--font-meta)",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: PILLARS[pillar] || pillar
    }
  }, children || pillar);
}
Object.assign(__ds_scope, { CategoryTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/CategoryTag.jsx", error: String((e && e.message) || e) }); }

// components/badges/PillBadge.jsx
try { (() => {
const COLORS = {
  purple: "var(--maslow-accent-purple)",
  orange: "var(--maslow-accent-orange)",
  teal: "var(--maslow-accent-teal)",
  navy: "var(--maslow-dark-navy)"
};
function PillBadge({
  children,
  color = "purple"
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      height: 34,
      display: "inline-flex",
      alignItems: "center",
      padding: "0 18px",
      borderRadius: 17,
      background: COLORS[color] || color,
      font: "600 12px var(--font-primary)",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "var(--maslow-white)"
    }
  }, children);
}
Object.assign(__ds_scope, { PillBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/PillBadge.jsx", error: String((e && e.message) || e) }); }

// components/badges/SectionEyebrow.jsx
try { (() => {
function SectionEyebrow({
  num,
  children,
  color = "var(--maslow-label-purple)"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 11px var(--font-mono)",
      letterSpacing: "3px",
      textTransform: "uppercase",
      color
    }
  }, num ? num + " \u00B7 " : "", children);
}
Object.assign(__ds_scope, { SectionEyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/SectionEyebrow.jsx", error: String((e && e.message) || e) }); }

// components/badges/StatusBadge.jsx
try { (() => {
function StatusBadge({
  children,
  open = true
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      height: 16,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "0 8px",
      borderRadius: 2,
      background: "var(--maslow-nav-border)",
      font: "500 7px var(--font-primary)",
      letterSpacing: ".4px",
      textTransform: "uppercase",
      color: "var(--maslow-black)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: open ? "var(--maslow-open-green)" : "var(--maslow-closed-red)"
    }
  }), children);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/cards/CaseStudyCard.jsx
try { (() => {
function CaseStudyCard({
  tag = "Case study",
  tagColor = "purple",
  title,
  blurb,
  cta = "Read the case study",
  href = "#",
  featured = false
}) {
  const pill = {
    purple: "var(--maslow-accent-purple)",
    orange: "var(--maslow-accent-orange)",
    teal: "var(--maslow-accent-teal)"
  };
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      display: "flex",
      flexDirection: "column",
      width: 390,
      minHeight: featured ? 548 : 500,
      background: "var(--maslow-white)",
      border: "1px solid var(--maslow-light-grey)",
      borderRadius: 4,
      boxShadow: featured ? "var(--shadow-card-featured)" : "var(--shadow-card)",
      padding: 32,
      boxSizing: "border-box",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: 34,
      alignSelf: "flex-start",
      display: "inline-flex",
      alignItems: "center",
      padding: "0 18px",
      borderRadius: 17,
      background: pill[tagColor] || tagColor,
      font: "600 12px var(--font-primary)",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "700 24px/26px var(--font-primary)",
      letterSpacing: "-.57px",
      color: "var(--maslow-near-black)",
      margin: "24px 0 12px"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "400 15px/24px var(--font-primary)",
      color: "var(--maslow-text-grey)",
      margin: 0
    }
  }, blurb), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: "auto",
      font: "700 9px var(--font-primary)",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "var(--action-link)"
    }
  }, cta, "\u00A0\u00A0>"));
}
Object.assign(__ds_scope, { CaseStudyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CaseStudyCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/StatBlock.jsx
try { (() => {
function StatBlock({
  stats = []
}) {
  const colors = ["var(--maslow-accent-teal)", "var(--maslow-accent-purple)", "var(--maslow-bright-yellow)"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-dark)",
      padding: "64px 48px",
      display: "grid",
      gridTemplateColumns: `repeat(${stats.length || 3},1fr)`,
      gap: 32
    }
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 38px/42px var(--font-primary)",
      letterSpacing: "-.89px",
      color: s.color || colors[i % 3]
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 17px/27px var(--font-primary)",
      color: "var(--maslow-white)",
      marginTop: 8
    }
  }, s.label))));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/cards/TestimonialBlock.jsx
try { (() => {
function TestimonialBlock({
  quote,
  attribution,
  headshotSrc
}) {
  return /*#__PURE__*/React.createElement("blockquote", {
    style: {
      background: "var(--surface-alt)",
      padding: 48,
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 44px/16px var(--font-primary)",
      color: "var(--maslow-accent-teal)"
    }
  }, "\u201C"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "400 18px/30px var(--font-primary)",
      letterSpacing: "-.2px",
      color: "var(--maslow-black)",
      margin: "16px 0 20px",
      maxWidth: 640
    }
  }, quote), /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, headshotSrc && /*#__PURE__*/React.createElement("img", {
    src: headshotSrc,
    alt: "",
    style: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      boxShadow: "var(--shadow-headshot)"
    }
  }), /*#__PURE__*/React.createElement("cite", {
    style: {
      font: "400 12px var(--font-meta)",
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontStyle: "normal",
      color: "var(--maslow-body-grey)"
    }
  }, attribution)));
}
Object.assign(__ds_scope, { TestimonialBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/TestimonialBlock.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormInput.jsx
try { (() => {
function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      font: "600 12px var(--font-primary)",
      letterSpacing: ".4px",
      textTransform: "uppercase",
      color: "var(--maslow-dark-navy)"
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    id: id,
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    style: {
      height: 40,
      border: "none",
      borderBottom: "1px solid var(--border-hairline)",
      background: "transparent",
      font: "400 15px var(--font-primary)",
      color: "var(--maslow-black)",
      outline: "none",
      padding: 0
    },
    onFocus: e => e.target.style.borderBottomColor = "var(--focus-ring)",
    onBlur: e => e.target.style.borderBottomColor = "var(--border-hairline)"
  }));
}
Object.assign(__ds_scope, { FormInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormTextArea.jsx
try { (() => {
function FormTextArea({
  label,
  id,
  placeholder,
  rows = 4,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      font: "600 12px var(--font-primary)",
      letterSpacing: ".4px",
      textTransform: "uppercase",
      color: "var(--maslow-dark-navy)"
    }
  }, label), /*#__PURE__*/React.createElement("textarea", {
    id: id,
    placeholder: placeholder,
    rows: rows,
    value: value,
    onChange: onChange,
    style: {
      border: "none",
      borderBottom: "1px solid var(--border-hairline)",
      background: "transparent",
      font: "400 15px/24px var(--font-primary)",
      color: "var(--maslow-black)",
      outline: "none",
      padding: 0,
      resize: "vertical"
    },
    onFocus: e => e.target.style.borderBottomColor = "var(--focus-ring)",
    onBlur: e => e.target.style.borderBottomColor = "var(--border-hairline)"
  }));
}
Object.assign(__ds_scope, { FormTextArea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormTextArea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavHeader.jsx
try { (() => {
function NavHeader({
  links = [],
  active,
  logoHref = "#"
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Main",
    style: {
      height: 83,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 48px",
      background: "var(--surface-page)",
      borderBottom: "1px solid var(--maslow-nav-border)",
      fontFamily: "var(--font-primary)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: logoHref,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/maslow-mark-gradient.svg",
    alt: "Maslow AI",
    style: {
      width: 36,
      height: 23
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px var(--font-primary)",
      letterSpacing: "2px",
      color: "var(--maslow-dark-navy)"
    }
  }, "MASLOW"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--maslow-meta-grey)"
    }
  }, "|"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 10px var(--font-mono)",
      letterSpacing: "3px",
      color: "var(--maslow-dark-navy)"
    }
  }, "AI")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 32
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    style: {
      font: "600 11px var(--font-primary)",
      letterSpacing: "1.4px",
      textTransform: "uppercase",
      color: l.label === active ? "var(--action-link)" : "var(--maslow-dark-navy)",
      textDecoration: "none"
    }
  }, l.label))));
}
Object.assign(__ds_scope, { NavHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function SiteFooter({
  offices = [],
  note = ""
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--maslow-dark-navy)",
      padding: "40px 48px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "var(--font-primary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/maslow-mark-white.svg",
    alt: "Maslow",
    style: {
      width: 30,
      height: 19
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 12px var(--font-primary)",
      letterSpacing: "2px",
      color: "var(--maslow-white)"
    }
  }, "MASLOW")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 32,
      alignItems: "center"
    }
  }, offices.map(o => /*#__PURE__*/React.createElement("span", {
    key: o.city,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      font: "500 10px var(--font-primary)",
      letterSpacing: ".4px",
      textTransform: "uppercase",
      color: "var(--maslow-dark-text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: o.open ? "var(--maslow-open-green)" : "var(--maslow-closed-red)"
    }
  }), o.city)), note && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 10px var(--font-mono)",
      color: "var(--maslow-dark-text-secondary)"
    }
  }, note)));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CTAButton = __ds_scope.CTAButton;

__ds_ns.CTALink = __ds_scope.CTALink;

__ds_ns.CategoryTag = __ds_scope.CategoryTag;

__ds_ns.PillBadge = __ds_scope.PillBadge;

__ds_ns.SectionEyebrow = __ds_scope.SectionEyebrow;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.CaseStudyCard = __ds_scope.CaseStudyCard;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.TestimonialBlock = __ds_scope.TestimonialBlock;

__ds_ns.FormInput = __ds_scope.FormInput;

__ds_ns.FormTextArea = __ds_scope.FormTextArea;

__ds_ns.NavHeader = __ds_scope.NavHeader;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

})();
