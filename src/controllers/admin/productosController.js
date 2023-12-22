const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { validationResult } = require("express-validator");

const model = require("../../models/producto");

const index = async (req, res) => {
  try {
    const productos = await model.findAll();
    console.log(productos);
    res.render("admin/index", { productos });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const show = (req, res) => {
  console.log(req.params);
  res.send("Admin Detalle de Producto");
};

const create = (req, res) => {
  res.render("admin/create");
};

const store = async (req, res) => {
  console.log(req.body, req.file);

  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.render("admin/create", {
      values: req.body,
      errors: errores.array(),
    });
  }

  try {
    const producto = await model.create(req.body);
    console.log(producto);
    if (req.file) {
      console.log(req.file, req.file.buffer);

      sharp(req.file.buffer)
        .resize(300)
        .toFile(
          path.resolve(
            __dirname,
            `../../../public/uploads/productos/_${producto.id}.jpg`
          )
        );
    }
    res.redirect("/admin/produtos");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const edit = async (req, res) => {
  try {
    const producto = await model.findByPk(req.params.id);

    if (producto) {
      res.render("admin/edit", { values: producto });
    } else {
      res.status(404).send("No existe el producto");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const update = async (req, res) => {
  console.log(req.body, req.params);

  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.render("admin/create", {
      values: req.body,
      errors: errores.array(),
    });
  }

  try {
    const count = await model.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // console.log(count);

    if (req.file) {
      console.log(req.file);

      sharp(req.file.buffer)
        .resize(300)
        .toFile(
          path.resolve(
            __dirname,
            `../../../public/uploads/productos/_${req.params.id}.jpg`
          )
        );
    }
    res.redirect("/admin/productos")
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const destroy = async (req, res) => {
  console.log(req.params);

  try {

    const destroyed = await model.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(destroyed);
    if (destroyed ==1) {
      fs.unlink(
        path.resolve(
         __dirname,`../../../public/uploads/productos/producto_${req.params.id}.jpg`
        ), (error) => {
             if (error) {
               console.log(error);
             }
           }
       );
    }
    res.redirect("/admin/productos");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
