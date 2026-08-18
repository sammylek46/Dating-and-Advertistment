import Link from "next/link";
export const metadata = { title: "Professional Dating" };
export default function DatingPage() { return <section className="shell py-16"><p className="eyebrow">Dating at Linkwell</p><h1 className="mt-3 text-5xl font-black">Meet with more context and more control.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Profile privacy, explainable discovery, mutual matches, and safety tools are core to Linkwell—not upgrades.</p><Link className="button button-primary mt-8" href="/register">Create an adult-only profile</Link></section>; }
