
function formatrendertext(text) {
  const newline = text.replace(/\n/g, "<br>");
    const code = newline.replace(/!(.*?)!/g, "<code>$1</code>");
   const bold = code.replace(/__(.*?)__/g, "<strong>$1</strong>");
   const italic = bold.replace(/_(.*?)_/g, "<em>$1</em>");
    const strike = italic.replace(/~~(.*?)~~/g, "<del>$1</del>");
    const link = strike.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    const image = link.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
    const list = image.replace(/^\s*-\s(.*)/gm, '<li>$1</li>');
    const ul = list.replace(/<li>(.*)<\/li>/g, '<ul>$1</ul>');
    return ul;
}


export
{
    formatrendertext
}