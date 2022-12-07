const paging = (page, itemsPerPage, items) => {
  // Calculate total pages
  const total_pages = Math.ceil(items.length / itemsPerPage);
  // Split 20 trending movies for response result
  const results = items.slice(itemsPerPage * (page - 1), itemsPerPage * page);

  // Create paged data
  const paged = { results, page, total_pages };
  // Return
  return paged;
};

module.exports = paging;
