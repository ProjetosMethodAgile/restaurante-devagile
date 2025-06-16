import { MouseEvent } from "react";

export const scrollToSection = (
  event: MouseEvent<HTMLElement>,
  sectionId: string
): void => {
  event.preventDefault();

  const selector = sectionId.startsWith('#') ? sectionId : `#${sectionId}`;
  const section = document.querySelector(selector);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.warn(`Seletor não encontrado: ${selector}`);
  }
};