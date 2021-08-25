export const itemIsActive = (
  pathname: string,
  itemLink: string,
  rootLink?: string,
): boolean => {
  rootLink = rootLink ?? '/';
  return (
    itemLink === pathname || (itemLink !== rootLink && pathname.startsWith(itemLink))
  );
};
