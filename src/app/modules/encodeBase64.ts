export const encodeBase64 = (str: string) => {
  return btoa(unescape(encodeURIComponent(str)));
};
