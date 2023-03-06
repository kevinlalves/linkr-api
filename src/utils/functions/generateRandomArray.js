const generateRandomArray = (arr) => {
  let randomIndex;

  for (let i = arr.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * i);

    arr[i] = arr[i] ^ arr[randomIndex];
    arr[randomIndex] = arr[i] ^ arr[randomIndex];
    arr[i] = arr[i] ^ arr[randomIndex];
  }

  return arr;
};

export default generateRandomArray;
