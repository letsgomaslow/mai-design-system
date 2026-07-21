import React from "react";
export function TestimonialBlock({ quote, attribution, headshotSrc }) {
  return (
    <blockquote style={{background:"var(--surface-alt)",padding:48,margin:0}}>
      <div style={{font:"800 44px/16px var(--font-primary)",color:"var(--maslow-accent-teal)"}}>{"\u201C"}</div>
      <p style={{font:"400 18px/30px var(--font-primary)",letterSpacing:"-.2px",color:"var(--maslow-black)",margin:"16px 0 20px",maxWidth:640}}>{quote}</p>
      <footer style={{display:"flex",alignItems:"center",gap:12}}>
        {headshotSrc && <img src={headshotSrc} alt="" style={{width:48,height:48,borderRadius:"50%",boxShadow:"var(--shadow-headshot)"}} />}
        <cite style={{font:"400 12px var(--font-meta)",letterSpacing:"1px",textTransform:"uppercase",fontStyle:"normal",color:"var(--maslow-body-grey)"}}>{attribution}</cite>
      </footer>
    </blockquote>
  );
}