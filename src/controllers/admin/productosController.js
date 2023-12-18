const path = require("path");
const sharp = require("sharp");

const { validationResult } = require("express-validator");

const model = require("../../models/producto");

const index = async (req, res) => {
  try {
    const productos = await model.findAll();
    console.log(productos);
    res.render("admin/index", {productos});
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
  res.send("listado de productos");
};

const show = (req, res) => {
  console.log(req.params);
  res.send("Admin Detalle de Producto");
};

const create = (req, res) => {
  res.render("admin/create");
};

const store = (req, res) => {
  console.log(req.body);

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    // Retornar el error al formulario con los errorres
    return res.render("admin/create", {
      values: req.body,
      errors: errores.array(),
    });
  }

  if (req.file) {
    console.log(req.file, req.file.buffer, req.file.originalname);

    sharp(req.file.buffer)
      .resize(300)
      .toFile(
        path.resolve(
          __dirname,
          "../../../public/uploads/" + req.file.originalname
        )
      );
  }

  res.send("Admin Crear Producto");
};

const update = (req, res) => {
  console.log(req.body, req.params);
  res.send("Admin Modificar Producto");
};

const destroy = (req, res) => {
  console.log(req.params);
  res.send("Admin Borrar Producto");
};

module.exports = {
  index,
  show,
  create,
  store,
  update,
  destroy,
};
