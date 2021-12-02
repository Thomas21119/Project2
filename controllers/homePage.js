const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Product, User, Wallet, Category, History } = require("../models");

const wallet = async (currentUser) => {
  const userWallet = await Wallet.findOne({
    where: {
      user_id: currentUser,
    },
  });
  const currentWallet = userWallet.get({ plain: true });
  console.log(currentWallet);
  return currentWallet;
};

router.get("/", async (req, res) => {
  try {
    const userWallet = await wallet(req.session.user_id);
    const productData = await Product.findAll({
      include: [{ model: Category }],
    });
    const products = productData.map((product) => product.get({ plain: true }));
    res.render("salesPage", {
      products,
      logged_in: req.session.logged_in,
      userWallet,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    const userWallet = await wallet(req.session.user_id);
    res.render("signUp", { logged_in: req.session.logged_in, userWallet });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    const userWallet = await wallet(req.session.user_id);
    res.render("login", { logged_in: req.session.logged_in, userWallet });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userWallet = await wallet(req.session.user_id);
    res.render("dashboard", { logged_in: req.session.logged_in, userWallet });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/wallet", withAuth, async (req, res) => {
  try {
    const userWallet = await wallet(req.session.user_id);
    res.render("wallet", { logged_in: req.session.logged_in, userWallet });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/product/:id", withAuth, async (req, res) => {
  try {
    const userWallet = await wallet(req.session.user_id);
    const postData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }],
    });

    const product = postData.get({ plain: true });
    const user = userData.get({ plain: true });
    res.render("product", {
      product,
      user,
      logged_in: req.session.logged_in,
      userWallet,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/sell", withAuth, async (req, res) => {
  try {
    const userWallet = await wallet(req.session.user_id);
    const userProductsData = await Product.findAll({
      include: [{ model: Category }],
      where: { user_id: req.session.user_id },
    });
    const product = userProductsData.map((Data) => Data.get({ plain: true }));

    res.render("sell", {
      product,
      logged_in: req.session.logged_in,
      userWallet,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/purchase/:id", withAuth, async (req, res) => {
  try {
    const userWallet = await wallet(req.session.user_id);
    const postData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }],
    });

    const product = postData.get({ plain: true });

    res.render("purchase", {
      product,
      logged_in: req.session.logged_in,
      userWallet,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/chart/:id", async (req, res) => {
  try {
    const userWallet = await wallet(req.session.user_id);
    console.log("hello");
    const historyData = await History.findAll({
      where: { product_id: req.params.id },
    });

    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }],
    });

    const product = productData.get({ plain: true });

    const history = await historyData.map((Data) => Data.get({ plain: true }));

    console.log("product plain:", product);

    console.log("history plain:", history);

    res.render("chart", {
      history,
      product,
      logged_in: req.session.logged_in,
      userWallet,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
