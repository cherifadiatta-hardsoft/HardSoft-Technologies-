import { useState, useEffect } from 'react';

export function useSectionObserver() {
  const [activeSection, setActiveSection] = useState<{ id: string; title: string; description: string } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          // Get the section that occupies most of the screen or is top-most
          const target = visibleSections[0].target as HTMLElement;
          const title = target.getAttribute('data-seo-title');
          const description = target.getAttribute('data-seo-description');
          
          if (title && description) {
            setActiveSection({
              id: target.id,
              title,
              description
            });
          }
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section passes the top part of screen
        threshold: 0
      }
    );

    const sections = document.querySelectorAll('section[data-seo-title]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return activeSection;
}
