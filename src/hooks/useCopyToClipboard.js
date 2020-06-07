import { useState, useEffect } from 'react';

export function useCopyToClipboard(resetTimeout) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied || !resetTimeout) {
      return;
    }

    const timer = setTimeout(() => setIsCopied(false), resetTimeout);

    return () => clearTimeout(timer);
  }, [isCopied, resetTimeout]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  return [isCopied, copyToClipboard];
}
