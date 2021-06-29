const router = require("express").Router();
const { User, Order, Customer, Order_Details, Fundraiser } = require("../../models");

// GET all order details
router.get("/", async (req, res) => {
  try {
    const orderDetails = await Order_Details.findAll();
    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single order detail
router.get("/:id", async (req, res) => {
  try {
    const orderDetails = await Order_Details.findByPk(req.params.id, {
      
      //   include: [{ model: Order, through: Order_Details, as: 'order_details' }]
    });

    if (!orderDetails) {
      res.status(404).json({ message: "No details found with this id!" });
      return;
    }

    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE  order detail
// TODO add with auth
router.post("/", async (req, res) => {
  try {
    const orderDetails = await Order_Details.create(
      {
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        product_qty: req.body.product_qty,
        line_total: req.body.line_total,
        
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(400).json(err);
  }
});

//   UPDATE an order detail
// TODO add with auth
router.put("/:id", async (req, res) => {
  try {
    const updatedOrderDetails = await Order_Details.update(
      {
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        product_qty: req.body.product_qty,
        line_total: req.body.line_total,
        
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedOrderDetails) {
      res.status(404).json({ message: "No details found with this id" });
      return;
    }
    res.json(updatedOrderDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE an order details
// TODO add with auth
router.delete("/:id", async (req, res) => {
  try {
    const orderDetails = await Order_Details.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!orderDetails) {
      res.status(404).json({ message: "No details found with this id!" });
      return;
    }

    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;