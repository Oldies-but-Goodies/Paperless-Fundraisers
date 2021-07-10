const router = require("express").Router();
const {
  userFundraiser,
  User,
  Fundraiser,
  Product,
  Order,
  Order_Details,
} = require("../../models");

// GET all UFs
router.get("/", async (req, res) => {
  if (!req.user) {
    return res.json({ status: "error", message: "not logged in" });
  }
  try {
    const userFundraiserData = await userFundraiser.findAll();
    res.status(200).json(userFundraiserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:fundraiserId/users/:userId", async (req, res, next) => {
  if (!req.user) {
    return res.json({ status: "error", message: "not logged in" });
  }
  try {
    const fundraiserData = await Fundraiser.findByPk(req.params.fundraiserId, {
      include: [
        {
          model: Order,
          where: {
            UserId: req.params.userId,
          },
          include: [
            {
              model: Order_Details,
              include: [
                {
                  model: Product,
                },
              ],
            },
          ],
        },
      ],
    });

    if (!fundraiserData) {
      res.status(404).json({ message: "No orders associated with this user id!" });
      return;
    }

    //  console.log(fundraiserData.dataValues.Orders)

    const totalUserSales = fundraiserData.dataValues.Orders.reduce(
      (total, current) => {
        const addition = current.dataValues.Order_Details.reduce(
          (totalForDetails, currentDetail) => {
            // console.log("currentDetails", currentDetail);
            const qty = currentDetail.dataValues.product_qty;
            const price = parseInt(
              currentDetail.dataValues.Product.dataValues.price
            );
            const newTotal = qty * price + totalForDetails;
            return newTotal;
          },
          0
        );
        // console.log( "addition", addition)
        return addition + total;
      },
      0
    );

    res.status(200).json({ fundraiserData, totalUserSales });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // GET a single UF
// router.get("/:id", async (req, res) => {
//   try {
//     const userFundraiserData = await userFundraiser.findByPk(req.params.id, {

//       //   include: [{ model: userFundraiser, through: ' }]
//     });

//     if (!userFundraiserData) {
//       res.status(404).json({ message: "No userFundraiser found with this id!" });
//       return;
//     }

//     res.status(200).json(userFundraiserData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // CREATE a product
// // TODO add with auth
// router.post("/", async (req, res) => {
//   try {
//     const productData = await Product.create(req.body);
//     res.status(200).json(productData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// //   UPDATE an product
// // TODO add with auth
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedProduct = await Product.update(
//       {
//         name: req.body.name,
//         price: req.body.price,

//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );

//     if (!updatedProduct) {
//       res.status(404).json({ message: "No product found with this id" });
//       return;
//     }
//     res.json(updatedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // DELETE a product
// // TODO add with auth
// router.delete("/:id", async (req, res) => {
//   try {
//     const productData = await Product.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!productData) {
//       res.status(404).json({ message: "No product found with this id!" });
//       return;
//     }

//     res.status(200).json(productData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
