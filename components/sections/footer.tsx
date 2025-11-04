import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { FlowaLogo } from '../ui/flowa-logo';

const linkColumns = [
  {
    title: 'Product',
    links: [
      { text: 'Features', href: '#features' },
      { text: 'Dashboard', href: '/dashboard' },
      { text: 'Pricing', href: '#pricing' },
      { text: 'Security', href: '#security' },
    ],
  },
  {
    title: 'Company',
    links: [
      { text: 'About', href: '#about' },
      { text: 'Contact', href: 'mailto:mdkhalidhossen10@gmail.com' },
    ],
  },
  {
    title: 'Support',
    links: [
      { text: 'Contact Us', href: 'mailto:mdkhalidhossen10@gmail.com' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { text: 'Privacy Policy', href: '#privacy' },
      { text: 'Terms of Service', href: '#terms' },
      { text: 'Cookie Policy', href: '#cookies' },
      { text: 'GDPR', href: '#gdpr' },
    ],
  },
];

const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25zM17.633 19.75h2.073L7.42 4.25H5.216l12.417 15.5z"/>
    </svg>
);

const SocialLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-medium-gray-tertiary hover:text-dark-text transition-colors">
    {children}
  </a>
);

export const Footer = () => {
    return (
        <footer className="bg-[#F1F3F9] text-sm text-medium-gray-secondary pt-24 pb-12 font-sans">
            <div className="max-w-6xl mx-auto px-8">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
                    <div className="flex flex-col gap-12 items-start shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            <FlowaLogo/>
                        </Link>
                        <div className="flex flex-col gap-3">
                            <p className="text-base text-[#8C929D] max-w-xs">
                                AI-powered finance platform for tracking, analyzing, and optimizing your spending.
                            </p>
                            <a href="#status" className="inline-flex items-center gap-2 rounded-md bg-[#EDF2FE] py-1.5 px-3 border border-[#D9E1F7] text-sm text-[#4A7DD9] font-medium transition-colors hover:bg-blue-100/50 w-fit">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                All systems operational
                            </a>
                        </div>
                    </div>
                    <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
                        {linkColumns.map((column) => (
                            <div key={column.title}>
                                <h3 className="font-medium text-dark-text mb-4">{column.title}</h3>
                                <ul className="space-y-3">
                                    {column.links.map((link) => (
                                        <li key={link.text}>
                                            <Link href={link.href} className="hover:text-dark-text transition-colors">
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="mt-16 flex flex-col items-start gap-6">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                        <div className="flex items-center gap-2 text-xs text-[#8C929D]">
                            <div className="px-3 py-1 bg-white rounded-md border border-gray-200">
                                🔒 Bank-level encryption
                            </div>
                            <div className="px-3 py-1 bg-white rounded-md border border-gray-200">
                                ✓ GDPR Compliant
                            </div>
                            <div className="px-3 py-1 bg-white rounded-md border border-gray-200">
                                ✓ SOC 2 Type II
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-[#DFE3EE]">
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
                        <p className="text-medium-gray-tertiary">© 2025 Flowa. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            <SocialLink href="https://x.com/khalidh1b"><XIcon /></SocialLink>
                            <SocialLink href="https://github.com/khalidh1b"><Github className="size-5" /></SocialLink>
                            <SocialLink href="https://linkedin.com/in/khalidh1b"><Linkedin className="size-5" /></SocialLink>
                            <SocialLink href="mailto:mdkhalidhossen10@gmail.com"><Mail className="size-5" /></SocialLink>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};