// NOTE: to count the word in user input field
export const countToken = (inputText: string): number => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};
