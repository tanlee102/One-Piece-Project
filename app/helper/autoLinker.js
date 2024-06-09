export const Autolinker = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const replacedText = text.replace(urlRegex, (url) => {
      const displayText = url.replace(/^https?:\/\//, '');
      return `<a href="${url}">${displayText}</a>`;
    });  
    return replacedText;
}