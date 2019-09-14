//importo el modelo
const Category = require('../models').Category;

module.exports = {
  create: function(req,res){
    Category.create({
      title: req.body.title,
      color: req.body.color
    }).then(result=>{
      res.json(result);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
  },
  new: function(req,res){
    res.render('categories/new');
  },
  index: function(req, res){
    Category.findAll().then(categories=>{
      res.render('categories/index',{categories: categories});
    }).catch(err=>{
      console.log(err);
      res.json(err);
    })
  },
  show: function(req,res){
    Category.findByPk(req.params.id,{
      include: [
        'tasks'
      ]
    }).then(category=>{
      res.render('categories/show', {category: category})
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
  },
  destroy: function(req,res){
    Category.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(contadorElementosEliminados){
      res.redirect('/categories');
    })
  },
  edit: function(req, res){
    Category.findByPk(req.params.id).then(category=>{
      res.render(`categories/edit`, {category:category});
    }).catch(err=>{
      console.log(err);
      res.json(err);
    })
  },
  update: function(req,res){
    Category.update({ title: req.body.title,
                      color: req.body.color
                    }, {
      where: {
        id: req.params.id
      }
    }).then(function(response){
      res.redirect('/categories/'+req.params.id);
    });
  }
};
