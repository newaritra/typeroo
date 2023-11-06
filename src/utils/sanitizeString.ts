const sanitizeString = (str: string): string => {
  // We are cleaning up the string to remove any unwanted characters
  // This keeps the typing experience engaging and realistic
  const regEx: RegExp = /\w|\s|[.+*?^$()[]|['{}|\']/gim;
  let validString = str.match(regEx);
  let finalString = validString?.map((el) => (el == "\n" ? " " : el));
  return finalString?.join("") || " ";
};

export default sanitizeString;
