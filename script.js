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
                                <td>${id}</td>
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
const reglas_validacion = { //Creamos un objeto con las reglas para cada campo
    nombre:   { required: true, minLength: 2, maxLength: 30, pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, label: "Nombre" },
    apellido: { required: true, minLength: 2, maxLength: 30, pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, label: "Apellido" },
    cargo:    { required: true, minLength: 2, maxLength: 30, pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, label: "Cargo" },
    email:    { required: true, maxLength: 30, pattern: /^[^\s@]+@empresa\.cl$/, label: "Email" }
}
    
function erroresEnCampos(campo, valor) { //Creamos una funcion que retorna un mensaje de error adaptado al campo que se evalúa y el tipo de error
    const reglas = reglas_validacion[campo]
    if (!reglas) return null

    if (reglas.required && valor === "") 
        return `${reglas.label} es obligatorio.`

    if (reglas.minLength && valor.length < reglas.minLength) 
        return `${reglas.label} debe tener al menos ${reglas.minLength} caracteres.`

    if (reglas.maxLength && valor.length > reglas.maxLength)
        return `${reglas.label} debe tener como maximos ${reglas.maxLength} caracteres.`

    if (reglas.pattern && !reglas.pattern.test(valor)) 
        return `${reglas.label} tiene un formato inválido.`

    if (campo === "email" && usuarios.some(usuario => usuario.email === valor))
        return `Este correo ya está registrado.`

    return null
}

function validarUsuario(usuario, usuarios) { //Creamos una funcion que valida al objeto de usuario
    const errores = {} //Se crea un objeto que tendrá todos los errores 

    for (const [campo, valor] of Object.entries(usuario)) { //las conststantes campo y valor recibirán los valores de campo y el input que se obtienen de Object.entries(usuario)
        const error = erroresEnCampos(campo, valor) //evaluamos el campo y el input con la funcion erroresEnCampos y guardamos el mensaje de error en una variable (si es que lo hay)
        if (error) errores[campo] = error //si hay un error, se agrega al objeto errores, usando el campo como key y el mensaje de error como valor
    }
    return {
        isValid: Object.keys(errores).length === 0, //se retornan dos variables: isValid que retornará True si hay errores o False si no los hay
        errores //y la segunda variable es el objeto que almacena los errores
    }
}

//Funcionalidad boton registrar
btn_registro.addEventListener("click", e =>{ //Se reciben los datos de los input al hacer click en registrar.
    e.preventDefault()
    const usuario = { //se guardan los valores en un objeto de usuario
        nombre:   document.getElementById("nombre").value.trim(),
        apellido: document.getElementById("apellido").value.trim(),
        cargo:    document.getElementById("cargo").value.trim(),
        email:    document.getElementById("email").value.toLowerCase().trim()
    }
    const {isValid, errores} = validarUsuario(usuario) //se validan los campos

    const divs_errores = document.querySelectorAll("[id^='error_']") //se limpian los errores
    divs_errores.forEach(div => { //para cada div de error
        div.style.display = "none"
        div.textContent = ""
    })

    if (isValid) { //si isValid es true significa que no hay errores, asi que se agrega el usuario a el array usuarios, y se agrega cada usuario en dicho array a la tabla
        usuarios.push(usuario)
        usuarioATabla(usuarios) 
        mostrarTabla() //renderizamos la tabla
    } else { //si isValid es False
        array_errores = Object.entries(errores) //array_errores será un array que tendrá la siguiente estructura [["Campo", "Mensaje error"]]
        for (const error of array_errores) { //por cada array de error
            let error_div = document.getElementById(`error_${error[0]}`) //se selecciona la ID del error del campo correspondiente
            error_div.style.display = "block"   //se hace visible al error
            error_div.textContent = error[1]; //se le agrega el mensaje del error
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
