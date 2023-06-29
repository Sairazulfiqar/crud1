const port = 3000;
const cruddb = require ('./cruddb');

app.use(express.static('public'))

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

//Obtener todos los usuarios
app.get('/',(req,res)=>{
    sql = 'select * from usuarios';
    cruddb.query(sql,(error,results)=>{
        if (error) throw error;
        res.render('index',{usuarios: results});
    });
});

//Eliminar un usuario de la base de datos
app.get('/eliminar/:id',(req, res) => {
const id = req.params.id;
    sql = 'DELETE FROM usuarios WHERE id= ?'; 
    cruddb.query(sql, id, (error,result)=> {
        if (error) throw error;
        res.render('index', {usuario, results});
    });
});
    

//Mostrar formulario para agregar un usuario
app.get('/agregar', (req,res) => {
    res.render('agregar');
});

//Agregar un usuario a la base de datos
app.post('agregar', (req,res) => {
    const {nombre, email} = req.body;
    sql = 'INSERT INTO usuarios SET?';
    cruddb.query(sql, {nombre,email}, (error, result) => {
        if (error) throw error;
        res.redirect('/');
    });
});

//Mostrar formulario para editar un usuario
app.get('/editar/id', (req,res) => {
    const id = req.params.id;
    cruddb.query('SELECT FROM usuarios WHERE id = ?',id, (error, result) => {
        if (error) throw error; 
        res.render('editar', {usuario: result [0]});
    });
});

//Actualizar un usuario en la base de datos
app.post('/editar/:id', (req,res) => {
    const id= req.params.id;
    const {nombre,email} = req.body;
    cruddb.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?',
    [nombre, email, id], (error, result) => {
        if (error) throw error;
        res.redirect('/');
    });
});
