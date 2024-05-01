import { useState, useEffect } from 'react';

export function useMainContent(defaultContent) {
  const [mainContent, setMainContent] = useState(defaultContent);
  return [mainContent, setMainContent];
}

export function useMenuOpen(defaultValue) {
  const [menuOpen, setMenuOpen] = useState(defaultValue);
  return [menuOpen, setMenuOpen];
}

export function useFloor(initialContent) {
  const [content, setContent] = useState(initialContent);

  const changeContent = (newContent) => {
    console.log("NewFloor " + (newContent));
    setContent(newContent);
  };

  return [content, changeContent];
}

export function useRoom(roomId) {
  const [room, setRoom] = useState(() => roomId);
  return [room, setRoom];
}

export function useColor(currColor) {
  const [color, setColor] = useState(() => currColor);

  useEffect(() => {
    // This effect will run whenever colors change
    // You can perform any additional logic here if needed
  }, [color]);

  const updateColors = (newColors) => {
    console.log('Updated Colors');
    console.log(newColors);
    setColor(newColors);
  };

  return [color, updateColors];
}