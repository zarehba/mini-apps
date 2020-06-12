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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      /*Firefox :-( */
    }
  };

  return [isCopied, copyToClipboard];
}
