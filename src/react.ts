/**
 * returns undefined or object.
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getReactProps = (o: any): any | undefined => {
  const reactPropsKey = Object.keys(o).filter((key) =>
    key.startsWith("__reactProps$"),
  )[0];

  if (!reactPropsKey) {
    return;
  }

  return o[reactPropsKey];
};
