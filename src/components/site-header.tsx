import Link from "next/link";

const links = [
  ["Dating", "/dating"], ["Advertisements", "/advertisements"], ["Advertise", "/advertise"], ["Safety", "/safety"],
] as const;

export function SiteHeader() {
  return <header className="border-b border-slate-200 bg-white/90 backdrop-blur"><div className="shell flex min-h-18 items-center justify-between gap-5 py-3"><Link href="/" className="text-xl font-black tracking-tight">link<span className="text-[#3157d5]">well</span></Link><nav aria-label="Primary navigation" className="hidden items-center gap-5 text-sm font-semibold text-slate-600 md:flex">{links.map(([label, href]) => <Link key={href} href={href} className="hover:text-slate-950">{label}</Link>)}</nav><div className="flex items-center gap-2"><Link href="/login" className="button button-secondary text-sm">Sign in</Link><Link href="/register" className="button button-primary text-sm">Join Linkwell</Link></div></div></header>;
}

