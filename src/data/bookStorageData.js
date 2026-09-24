const generateStoreData = (book) => {
  const seed = book.cover_i ?? 1;

  return {
    price: Number((25 + (seed % 3500) / 100).toFixed(2)),
    currency: 'PEN',
    stock: (seed % 15) + 1,
    featured: seed % 3 === 0,
  };
};

export default generateStoreData;
