export const formatLetters = (word) => {
  const arrOfWords = word.split(' ');
  const formattedWordsArr = [];

  arrOfWords.forEach(word => {
    const firstLetter = word.slice(0, 1).toUpperCase();
    const remainingLetters = word.slice(1).toLowerCase();
    const newWord = firstLetter + remainingLetters;
    formattedWordsArr.push(newWord);
  });

  return formattedWordsArr.join(" ");
}

export const isFeatured = (post) => {
  if (post.isFeatured === true) {
    return "Featured"
  } else {
    return "Not Featured"
  }
}