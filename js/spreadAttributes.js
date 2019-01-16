const spreadAttributes = attributes =>
  [...attributes].reduce(
    (accumulator, current) =>
      `${accumulator} ${current.name}="${current.value}"`,
    ""
  );

export default spreadAttributes;
