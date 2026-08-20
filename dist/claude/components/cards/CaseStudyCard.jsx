import React from "react";
import { TaxonomyCapsule } from "../badges/TaxonomyCapsule.jsx";
export function CaseStudyCard({ tag = "Case study", tagColor = "purple", title, blurb, cta = "Read the case study", href, featured = false }) {
  const style = {display:"flex",flexDirection:"column",width:390,minHeight:featured?548:500,background:"var(--maslow-white)",border:"1px solid var(--maslow-light-grey)",borderRadius:0,boxShadow:featured?"var(--shadow-card-featured)":"var(--shadow-card)",padding:32,boxSizing:"border-box",textDecoration:"none"};
  const content = <>
      <TaxonomyCapsule color={tagColor}>{tag}</TaxonomyCapsule>
      <h3 style={{font:"700 24px/26px var(--font-primary)",letterSpacing:"-.57px",color:"var(--maslow-near-black)",margin:"24px 0 12px"}}>{title}</h3>
      <p style={{font:"400 15px/24px var(--font-primary)",color:"var(--maslow-text-grey)",margin:0}}>{blurb}</p>
      {href && <span style={{marginTop:"auto",font:"700 9px var(--font-primary)",letterSpacing:"2px",textTransform:"uppercase",color:"var(--action-link)"}}>{cta}{"\u00A0\u00A0>"}</span>}
    </>;
  return href ? <a href={href} style={style}>{content}</a> : <article style={style}>{content}</article>;
}
