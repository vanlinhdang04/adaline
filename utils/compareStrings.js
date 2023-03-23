import slugify from "./slugifyString";

export default function compareStrings(str1, str2) {
  if (!str1 || !str2 || typeof str1 !== "string" || typeof str2 !== "string")
    return false;
  return slugify(str1) === slugify(str2);
}
