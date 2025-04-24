/*  Endpoints Disponibles:
- `GET /usuarios`: Obtiene la lista de todos los usuarios.
- `POST /usuarios`: Crea un nuevo usuario.
- `GET /usuarios/:nombre`: Obtiene un usuario por nombre.
*/
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [                                                     //es la respuesta que se le va a dar al cliente cuando quiera acceder a la url /usuarios.
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//CREATE
app.get('/usuarios', (req, res) => {                                      //el get /usuarios, le establezco la ruta a ese array
    //console.log(usuarios);                                                obtengo la lista de usuarios completa, el let usuarios.
    res.json(usuarios);                                                  //res.json(usuarios), ese usuarios es el nombre de la variable array let USUARIOS 
});

app.get('/usuarios/:nombre', (req, res) => {                          //con el get, busco un usuario por su nombre.
    const { nombre } = req.params;                                     //req.params, es el nombre que le voy a dar al usuario.
    const nombreNormalizado = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/-/g, '');
    const usuario = usuarios.find((usuario) => usuario.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/-/g, '') === nombreNormalizado);
   
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);                                                  //res.json(usuario), me devuelve en json el usuario que busque por su nombre.
});

app.get('/usuarios/id/:id', (req, res) => {
    const { id } = req.params;                                          //req.params, es el id que le voy a dar al usuario.
    const usuarioPorId = usuarios.find((usuario) => usuario.id == id);  //busco el usuario por su id.
    if (!usuarioPorId) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuarioPorId);                                             //res.json(usuarioPorId), me devuelve en json el usuario que busque por su id.
});

app.get('/usuarios/edad/:edad', (req, res) => {                                   
    const { edad } = req.params;                                             
    const usuariosPorEdad = usuarios.filter((usuario) => usuario.edad == edad);       //filtro por edades
    if (usuariosPorEdad.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (usuariosPorEdad.length === 1) {  
        return res.json(usuariosPorEdad[0]);
    }
    res.json(usuariosPorEdad);                                                      
})

app.get('/usuarios/lugar/:lugarProcedencia', (req, res) => {                              
    const { lugarProcedencia } = req.params;
    const lugarProcedenciaNormalizado = lugarProcedencia.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();                            
    const usuarioPorLugar = usuarios.filter((usuario) => usuario.lugarProcedencia.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === lugarProcedenciaNormalizado
); 
    if (usuarioPorLugar.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (usuarioPorLugar.length === 1) {  
        return res.json(usuarioPorLugar[0]);
    }
    res.json(usuarioPorLugar);                                                     
});

app.post('/usuarios', (req, res) => {                                   //con el post, creo nuevos usuarios y los agrego a el array usuarios.
    const { nombre, edad, lugarProcedencia } = req.body;
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        edad,
        lugarProcedencia,
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});



//READ
/*app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find((usuario) => usuario.id == id);
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
});*/

/*app.get('/', (req, res) => {
    res.send(
      `<h1>Lista de Usuarios</h1>
      <ul>
      ${usuarios
        .map(
          (usuario) => `<li>ID: ${usuario.id} | NOMBRE: ${usuario.nombre}</li>`
        )
        .join('')}
      </ul>
      <form action="/usuarios" method="post">
        <label for"nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" required>
        <button type="submit">Agregar nuevo usuario</button>
      </form>
      <a href="/usuarios">Usuarios JSON</a>
      `
    );
  });
*/
app.listen(PORT, () => {
    console.log('Servidor escuchando en puerto http://localhost:3000');
  });