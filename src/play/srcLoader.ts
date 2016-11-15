export const getSource = () => {
  const afterHash = window.location.hash.substr(1);
  if (!afterHash) return ''; 
  if (!afterHash.startsWith('src=')) return '';
  return decodeURI(afterHash.substr('src='.length));
};
export const setSource = (source: string) => {
  // http://stackoverflow.com/questions/12381563/how-to-stop-browser-back-button-using-javascript
  const hash = '#src=' + encodeURI(source);
  window.location.hash = hash;
  window.location.hash = "Again-No-back-button"; // again because google chrome don't insert first hash into history
  window.location.hash = hash;
  window.onhashchange = function() { window.location.hash = hash }
}

export const getPlaygroundLink = (src: string) => {
  return `${window.location.origin}/play/#src=${encodeURI(src)}`;
}