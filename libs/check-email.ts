export default function checkEmail(email: string) {
  let regex = /@gmail\.com$/;
  if (regex.test(email)) return true;
  return false;
}
