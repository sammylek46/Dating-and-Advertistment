import Link from "next/link";

export function SiteFooter() {
  return <footer className="mt-20 border-t border-slate-200 bg-white"><div className="shell grid gap-8 py-10 md:grid-cols-[2fr_1fr_1fr]"><div><p className="text-xl font-black">link<span className="text-[#3157d5]">well</span></p><p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">Professional connections, made more human. Adults only. Kindness and safety are non-negotiable.</p></div><div><p className="font-bold">Explore</p><div className="mt-3 grid gap-2 text-sm text-slate-600"><Link href="/dating">Dating</Link><Link href="/advertisements">Advertisements</Link><Link href="/about">About</Link></div></div><div><p className="font-bold">Support</p><div className="mt-3 grid gap-2 text-sm text-slate-600"><Link href="/safety">Safety</Link><Link href="/contact">Contact</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link></div></div></div><div className="border-t border-slate-200 py-5 text-center text-xs text-slate-500">© {new Date().getFullYear()} Linkwell. Built for meaningful, respectful connections.</div></footer>;
}

