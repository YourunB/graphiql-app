export const encodeBase64 = (str: string) => {
  return btoa(unescape(encodeURIComponent(str)));
};

export const decodeBase64 = (str: string) => {
  return decodeURIComponent(escape(atob(str)));
};
