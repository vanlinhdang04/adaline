export default function compareVietnameseString(str1, str2) {
  const normalizedStr1 = str1?.toString().normalize("NFD");
  const normalizedStr2 = str2?.toString().normalize("NFD");
  return normalizedStr1 === normalizedStr2;
}
