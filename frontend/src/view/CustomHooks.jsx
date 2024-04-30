import { useState } from 'react';

export function useMainContent(defaultContent) {
  const [mainContent, setMainContent] = useState(defaultContent);
  return [mainContent, setMainContent];
}

export function useMenuOpen(defaultValue) {
  const [menuOpen, setMenuOpen] = useState(defaultValue);
  return [menuOpen, setMenuOpen];
}

export function useFloor(defaultFloor) {
    const [floor, setFloor] = useState(() => defaultFloor);
    return [floor, setFloor];
  }