const spreadAttributes = (attributes, ignore = []) =>
  [...attributes].reduce(
    (accumulator, current) =>
      ignore.includes(current.name)
        ? accumulator
        : `${accumulator} ${current.name}="${current.value}"`,
    ""
  );

export default spreadAttributes;
