let btn_registro = document.getElementById("boton-registrarse");
let usuarios = [];
let contenedor_tabla = document.getElementById("contenedor-tabla-empleados")

function usuarioALista(usuarios){
    const tabla_usuarios = document.getElementById("cuerpo-tabla")
    let ingreso_lista = ""
    let contador = 1
    for (const usuario of usuarios){
        ingreso_lista += `<tr>
                            <td>${contador}</td>
                            <td>${usuario.nombre}</td>
                            <td>${usuario.apellido}</td>
                            <td>${usuario.cargo}</td>
                            <td>${usuario.email}</td>
                            <td><button>Eliminar</button></td>
                        </tr>`
        contador ++;
    }
    tabla_usuarios.innerHTML = ingreso_lista
}

function mostrarTabla(){
    const tabla = document.querySelector(".contenedor")
    tabla.style.display = "block"
}

btn_registro.addEventListener("click", e =>{
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


