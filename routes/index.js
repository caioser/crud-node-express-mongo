var express = require('express');
var router = express.Router(); 

/* GET home page. */
router.get('/', (req, res) => {
  global.db.findAll((e, docs) => {
    if(e) { return console.log(e); }
    res.render('index', { title: 'Lista de Clientes', docs: docs});
  });
});

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro', doc: {"nome":"", "idade":""}, action: '/new' });
});

router.post('/new', (req, res) => {
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.insert({nome, idade}, (err, result) =>{
    if(err) { return console.log(err); }
    res.redirect('/');
  });
});

router.get('/edit/:id', (req, res, next) => {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
    if(e) { return console.log(e); }
    res.render('new', { title: 'Edição de Cliente', doc: docs[0], action: '/edit/'+docs[0]._id });
  });
});

router.post('/edit/:id', (req, res) => {
  var id = req.params.id;
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.update(id, {nome, idade}, (e, result) => {
    if(e){ return console.log(e); }
    res.redirect('/');
  });
});

router.get('/delete/:id', (req, res) => {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
    if(e){ return console.log(e); }
    res.redirect('/');
  });
});

module.exports = router;
