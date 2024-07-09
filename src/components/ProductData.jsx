// src/productData.js

export const products = [
  { id: 1, src: "src/timbu/1c806e1deb3638a0305ae3d8d7aeaa4a95b7efec.jpg", title: "Nike Airforce 1' 07", price: 80, reviews: 100 },
  { id: 2, src: "src/timbu/3d2d017cd58ce4025c7580580112012b97eb4aa8.jpg", title: "Nike Air Max 90", price: 85, reviews: 120 },
  { id: 3, src: "src/timbu/e86e4ccedb1bca3b1ba8e1e3c7f0512ce535eaa4.jpg", title: "Air Jordan 13 R.", price: 95, reviews: 90 },
  { id: 4, src: "src/timbu/d5234822891031f94bbc728926060de81e751d57.jpg", title: "Air Jordan Retro", price: 100, reviews: 110 },
  { id: 5, src: "src/timbu/f7de98a0280bf85083fb2e3c87457ab9ad1e65a0.jpg", title: "Nike Free Metcon", price: 90, reviews: 95 },
  { id: 6, src: "src/timbu/35fdb09b153eef1bc923ed13237b045a4fd6c136.jpg", title: "Nike Airforce 4", price: 85, reviews: 105 },
  { id: 7, src: "src/timbu/25105d164850b1a45cf811ed1707809767ef97de.jpg", title: "Vans Airfield 3", price: 80, reviews: 100 },
  { id: 8, src: "src/timbu/b53dee6fc09d923608c2e3b07a60845cf4fbea56.jpg", title: "Puma and Lamelo", price: 95, reviews: 90 },
  { id: 9, src: "src/timbu/272e4d7b8e2dc59b4eca8d09363fc4027af9e813.jpg", title: "Nitro Elite 3", price: 100, reviews: 110 },
  { id: 10, src: "src/timbu/6c2945c3bbe52ba7d0e8d80f17ed01c16e042abd.jpg", title: "Palermo leather", price: 90, reviews: 95 },
  { id: 11, src: "src/timbu/13a92b07c0a40b09d6f1a86719368dec8a1e8ca8.jpg", title: "Team Big Kids", price: 85, reviews: 105 },
  { id: 12, src: "src/timbu/de4bef426a1f8a8f0e306710e10e0192258ebd1e.jpg", title: "Amour Big Kids", price: 75, reviews: 98 },
  { id: 13, src: "src/timbu/041af138c98bd2b9111298d581cbeb4e7a69b3a4.jpg", title: "Nano Court T.S", price: 110, reviews: 115 },
  { id: 14, src: "src/timbu/59e602dad5a7dca654166b3a66154b60f7a6579c.jpg", title: "Panini Pres. 94", price: 120, reviews: 130 },
  { id: 15, src: "src/timbu/1e0c41ff262be9b30fe552158754546fca8a8dee.jpg", title: "Nano X4", price: 95, reviews: 105 },
  { id: 16, src: "src/timbu/55137142ae0bfd3f2660b4fa388ca709e0bf5f1c.jpg", title: "Club C Grounds", price: 85, reviews: 100 },
  { id: 17, src: "src/timbu/baa2ce7c4d99969ebf8b0df7a974bac639a4a277.jpg", title: "Panini ES22", price: 130, reviews: 140 }
];

export const getRandomProducts = (count) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const selectedProducts = getRandomProducts(products, 3);