const getScrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

export const scrollToSectionById = (targetId: string) => {
  const element = document.getElementById(targetId);

  if (!element) {
    return;
  }

  element.scrollIntoView({
    behavior: getScrollBehavior(),
    block: 'start',
  });
};
