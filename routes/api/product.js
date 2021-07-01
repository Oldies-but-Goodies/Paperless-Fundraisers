const router = require("express").Router();
const { Product } = require("../../models");

// GET all products for a given fundraiser Id
router.get("/fundraiser/all/:fundraiserId", async (req, res) => {
  try {
    console.log("product")
    const productData = await Product.findAll({
      where: {
        fundraiserId: req.params.fundraiserId,
        active: true
      }
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single order
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      //   include: [{ model: Product, through: ' }]
    });

    if (!productData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a product
// TODO add with auth
router.post("/", async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//   UPDATE an product
// TODO add with auth
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.update(
      {
        name: req.body.name,
        price: req.body.price,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "No product found with this id" });
      return;
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a product
// TODO add with auth
router.delete("/:id", async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
