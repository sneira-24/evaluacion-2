//Funcionalidad de Registro

let btn_registro = document.getElementById("boton-registrarse");
let contenedor_tabla = document.getElementById("contenedor-tabla-empleados")
let usuarios = []; //Array donde se guardarán los objetos(usuarios)

function usuarioATabla(usuarios){ //Función que convertirá el objeto de usuario a formato table por cada atributo
    const tabla_usuarios = document.getElementById("cuerpo-tabla")
    let ingreso_tabla = ""
    let id = 1
    for (const usuario of usuarios){
        if (usuario !== "") { //La razón del if se explica en la funcionalidad de eliminar usuario
            ingreso_tabla += `<tr>
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
    tabla_usuarios.innerHTML = ingreso_tabla
}

//Renderizar tabla
function mostrarTabla(){ //Al crearse la pagina, la tabla se encuentra con display: none(oculta). Al hacerse el primer registro, la tabla se muestra.
    const tabla = document.querySelector(".contenedor")
    tabla.style.display = "block"
}

//Funciones de validacion
const reglas_validacion = {
    nombre:   { required: true, minLength: 2, pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, label: "Nombre" },
    apellido: { required: true, minLength: 2, pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, label: "Apellido" },
    cargo:    { required: true, minLength: 2, pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, label: "Cargo" },
    email:    { required: true, pattern: /^[^\s@]+@empresa\.cl$/, label: "Email" }
}
    
function erroresEnCampos(campo, valor) {
    const reglas = reglas_validacion[campo]
    if (!reglas) return null

    if (reglas.required && valor === "") 
        return `${reglas.label} es obligatorio.`

    if (reglas.minLength && valor.length < reglas.minLength) 
        return `${reglas.label} debe tener al menos ${reglas.minLength} caracteres.`

    if (reglas.pattern && !reglas.pattern.test(valor)) 
        return `${reglas.label} tiene un formato inválido.`

    return null
}

function validarUsuario(usuario) {
    const errores = {}

    for (const [campo, valor] of Object.entries(usuario)) {
        const error = erroresEnCampos(campo, valor)
        if (error) errores[campo] = error
    }
    return {
        isValid: Object.keys(errores).length === 0,
        errores
    }
}

//Funcionalidad boton registrar
btn_registro.addEventListener("click", e =>{ //Se reciben los datos de los input al hacer click en registrar.
    e.preventDefault()
    const usuario = { 
        nombre:   document.getElementById("nombre").value.trim(),
        apellido: document.getElementById("apellido").value.trim(),
        cargo:    document.getElementById("cargo").value.trim(),
        email:    document.getElementById("email").value.trim()
    }
    const {isValid, errores} = validarUsuario(usuario)
    if (isValid) {
        usuarios.push(usuario)
        usuarioATabla(usuarios) 
        mostrarTabla()
    } else {
        array_errores = Object.entries(errores)
        for (const error of array_errores) {
            console.log(`error_${error[0]}`)
            let error_span = document.getElementById(`error_${error[0]}`)
            error_span.style.display = "block"
            console.log(error[1])
            error_span.textContent = error[1];
        } 
    }
})

//Funcionalidad eliminar usuario

function eliminarUsuario(id) {  
    usuarios[id-1] = "" //Se reemplaza el usuario eliminado por un espacio vacio en el arreglo de objetos, de esa manera los IDs no se modifican ya que.
    usuarioATabla(usuarios) //el objeto previo aun "existe", solo que sin datos(no es representado en la tabla gracias al if en la funcion usuarioALista).
}

//Funcionalidad busqueda

const filtroInput = document.getElementById('filtro-input')
const tabla = document.getElementById('tabla-empleados')
const tr = tabla.getElementsByTagName('tr')

filtroInput.addEventListener('input', ()=> {
    const filtro = filtroInput.value.toLowerCase() //Se pasa a lowercase para evitar errores por mayusculas
    const usuarios_filtrados = usuarios.filter(usuario => usuario.nombre.toLowerCase().includes(filtro) || usuario.cargo.toLowerCase().includes(filtro)) //Se filtra el array de objetos
    usuarioATabla(usuarios_filtrados)//Se pasa a tabla el nuevo array filtrado
    mostrarTabla()
})
