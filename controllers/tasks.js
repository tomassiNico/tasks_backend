const Task = require('../models').Task;

module.exports = {
  create: function(req,res){
    Task.create({
      description: req.body.description,
      userId: req.user.id
    }).then(result=>{
      res.json(result);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    })
  },
  new: function(req,res){
    res.render('tasks/new');
  },
  index: function(req,res){
    Task.findAll().then(tasks=>{
      res.render('tasks/index', {tasks: req.user.tasks})
    });
  },
  show: function(req, res){
    Task.findByPk(req.params.id,{
      include: [
        'user',
        'categories'
      ]
    }).then(function(task){
      res.render('tasks/show', {task: task})
    });
  },
  update: function(req, res){
    let task = Task.findByPk(req.params.id).then(task=>{
      task.description = req.body.description;
      task.save().then(()=>{
        let categoryIds = req.body.categories.split(',');

        task.addCategories(categoryIds).then(()=>{
          res.redirect(`/tasks/${task.id}`);
        });
      });
    });
  },
  edit: function(req, res){
    Task.findByPk(req.params.id).then(function(task){
      res.render('tasks/edit', {task: task})
    });
  },
  destroy: function(req, res){
    Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(contadorElementosEliminados){
      res.redirect('/tasks');
    });
  }
};
