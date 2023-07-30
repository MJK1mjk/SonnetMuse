const punctuation = [".", "?", "!", ",", ";", ":", "-", " "];

const LastWord = (value) => {
  let word = value.split(" ").slice(-1)[0];
  while (punctuation.includes(word[word.length - 1]))
    word = word.slice(0, word.length - 1);
  return word;
};

export default LastWord;