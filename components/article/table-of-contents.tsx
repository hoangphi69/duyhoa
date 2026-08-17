'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ToCItem {
  id: string;
  text: string;
  level: string;
}

export function TableOfContents({
  toc,
  hasFaq,
}: {
  toc: ToCItem[];
  hasFaq: boolean;
}) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' },
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    if (hasFaq) {
      const faqEl = document.getElementById('faq');
      if (faqEl) observer.observe(faqEl);
    }

    return () => observer.disconnect();
  }, [toc, hasFaq]);

  return (
    <nav className="flex flex-col py-6 overflow-y-auto scrollbar-hide grow">
      {/* Container with a continuous 1px left border */}
      <div className="flex flex-col mx-6 border-border border-l">
        {toc.map((item, idx) => {
          const isActive = activeId === item.id;

          return (
            <Link
              key={idx}
              href={`#${item.id}`}
              replace
              // -ml-px pulls the 2px active border exactly over the container's 1px border
              className={`-ml-px border-l-2 py-3 pr-4 transition-all font-medium duration-200 text-sm leading-relaxed ${
                isActive
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground '
              } ${item.level === 'h3' ? 'pl-8' : 'pl-5'}`}
            >
              {item.text}
            </Link>
          );
        })}

        {/* Render FAQ link if the article has one */}
        {hasFaq && (
          <Link
            href="#faq"
            replace
            className={`-ml-px border-l-2 py-3 pr-4 transition-all font-medium duration-200 text-sm leading-relaxed pl-5 ${
              activeId === 'faq'
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground '
            }`}
          >
            Câu hỏi thường gặp (FAQ)
          </Link>
        )}
      </div>
    </nav>
  );
}
