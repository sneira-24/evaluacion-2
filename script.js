//Funcionalidad de Registro

let btn_registro = document.getElementById("boton-registrarse");
let contenedor_tabla = document.getElementById("contenedor-tabla-empleados")
let usuarios = []; //Array donde se guardarán los objetos(usuarios)

function usuarioALista(usuarios){ //Función que convertirá el objeto de usuario a formato table por cada atributo
    const tabla_usuarios = document.getElementById("cuerpo-tabla")
    let ingreso_lista = ""
    let id = 1
    for (const usuario of usuarios){
        if (usuario !== "") { //La razón del if se explica en la funcionalidad de eliminar usuario
            ingreso_lista += `<tr>
                                <th>${id}</th>
                                <td>${usuario.nombre}</td>
                                <td>${usuario.apellido}</td>
                                <td>${usuario.cargo}</td>
                                <td>${usuario.email}</td>
                                <td><button class="btn-eliminar" onclick="eliminarUsuario(${id})">Eliminar</button></td>
                            </tr>`
        } 
        id++;
    }
    tabla_usuarios.innerHTML = ingreso_lista
}

//Renderizar tabla
function mostrarTabla(){ //Al crearse la pagina, la tabla se encuentra con display: none(oculta). Al hacerse el primer registro, la tabla se muestra.
    const tabla = document.querySelector(".contenedor")
    tabla.style.display = "block"
}

btn_registro.addEventListener("click", e =>{ //Se reciben los datos de los input al hacer click en registrar.
    e.preventDefault()
    let nombre = document.getElementById("nombre")
    nombre = nombre.value.trim()
    let apellido = document.getElementById("apellido")
    apellido = apellido.value.trim()
    let cargo = document.getElementById("cargo")
    cargo = cargo.value.trim()
    let email = document.getElementById("email")
    email = email.value.trim()

    usuarios.push({nombre, apellido, cargo, email})
    usuarioALista(usuarios) 
    mostrarTabla()
})


//Funcionalidad eliminar usuario

function eliminarUsuario(id) {  
    usuarios[id-1] = "" //Se reemplaza el usuario eliminado por un espacio vacio en el arreglo de objetos, de esa manera los IDs no se modifican ya que.
    usuarioALista(usuarios) //el objeto previo aun "existe", solo que sin datos(no es representado en la tabla gracias al if en la funcion usuarioALista).
}

//Funcionalidad busqueda

const filtroInput = document.getElementById('filtro-input')
const tabla = document.getElementById('tabla-empleados')
const tr = tabla.getElementsByTagName('tr')

filtroInput.addEventListener('input', ()=> {
    const filtro = filtroInput.value.toLowerCase()
    const usuarios_filtrados = usuarios.filter(usuario => usuario.nombre.toLowerCase().includes(filtro) || usuario.cargo.toLowerCase().includes(filtro))
    usuarioALista(usuarios_filtrados)
    mostrarTabla()
})
