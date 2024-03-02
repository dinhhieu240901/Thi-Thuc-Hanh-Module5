const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.listen(3001, () => {
  console.log("Server running on port 3001");
});

const products = [
  {
    id: 1,
    name: "Áo sơ mi dài tay nam",
    price: "795000",
    stock: 100,
    description:
      "Áo sơ mi dài tay phom Regular fit suông nhẹ nhưng vẫn đảm bảo vừa vặn, chỉn chu khi mặc.",
  },
  {
    id: 2,
    name: "Áo sơ mi ngắn tay nam",
    price: "825000",
    stock: 1000,
    description:
      "Áo sơ mi ngắn tay phom Slim fit ôm vừa vặn cơ thể, tôn dáng người mặc.",
  },
  {
    id: 3,
    name: "Áo polo nam",
    price: "550000",
    stock: 200,
    description:
      "Áo Polo phom dáng Regular fit suông nhẹ nhưng vẫn vừa vặn, tôn dáng tối đa khi mặc.",
  },
  {
    id: 4,
    name: "Áo thun nam",
    price: "350000",
    stock: 2200,
    description: "Áo T-shirt ngắn tay phom Regular fit suông nhẹ.",
  },
];

app.get("/products", (req, res) => {
  res.json(products);
});
app.get("/products/names", (req, res) => {
  const productNames = products.map((product) => product.name);
  res.json(productNames);
});
app.get("/products/:id", (req, res) => {
  try {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if (index !== -1) {
      res.json(products[index]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Invalid request data" });
  }
});
app.post("/products", (req, res) => {
  let lastProductIndex;
  if (products.length > 0) {
    lastProductIndex = products[products.length - 1].id;
  } else lastProductIndex = 0;
  const product = {
    id: lastProductIndex + 1,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
  };
  products.push(product);
  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  try {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if (index !== -1) {
      products.splice(index, 1);
      res.json({ message: "Đã xoá sản phẩm", id: id });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Invalid request data" });
  }
});

app.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const index = findProductIndex(id);
  if (index !== -1) {
    const product = products[index];
    product.name = req.body.name;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.description = req.body.description;
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

function findProductIndex(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return i;
    }
  }
  return -1;
}
