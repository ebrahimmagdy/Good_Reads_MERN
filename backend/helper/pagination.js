function getLimits(page, size) {
  if (!page || page === "0") {
    page = 1;
  }
  if (!size || size === "0") {
    size = 2;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * limit;

  return { limit, skip };
}

module.exports = { getLimits };
