export default (date: string) => {
  return  new Date(date).toLocaleDateString("en-GB");
}
