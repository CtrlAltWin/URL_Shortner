const urlValidator = (url) => {
  if(!url) return false;
  return /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/i.test(url);
};

module.exports = {
  urlValidator,
};
