export function highlightSubstring(fullString: string, substring: string) {
  if (!substring) return fullString;

  const parts = fullString.split(new RegExp(`(${substring})`, "gi"));
  return parts.map((part, index) => {
    let p = <span key={index}>{part}</span>;
    if (part[0] === " ")
      p = (
        <span key={index}>
          {"\u00A0"} {part}
        </span>
      );
    if (part[part.length - 1] === " ")
      p = (
        <span key={index}>
          {part}
          {"\u00A0"}
        </span>
      );
    if (part === substring) return <strong key={index}>{p}</strong>;
    return p;
  });
}
