let btn_registro = document.getElementById("boton-registrarse");
let usuarios = [];


function usuarioALista(usuarios){
    const lista_usuarios = document.getElementById("lista-empleados")
    let contador = 0
    let test = ""
    for (usuario in usuarios){
        test += "<li>"+Object.values(usuarios[contador]).join(" ")+"<button>Eliminar</button></li>"
        contador++
        ;
    }
    lista_usuarios.innerHTML = test
        
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
})

