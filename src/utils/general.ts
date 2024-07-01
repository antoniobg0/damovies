const truncate = ({
  input,
  length,
  wordCheck,
}: {
  input: string;
  length: number;
  wordCheck: boolean;
}) => {
  if (input.length <= length) {
    return input;
  }

  const subString = input.slice(0, length - 1);

  return `${wordCheck ? subString.slice(0, subString.lastIndexOf(' ')) : subString}...`;
};

export { truncate };
