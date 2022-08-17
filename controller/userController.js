const categorias = ['regular', 'premium']

let users = []
let series = []

    // Si no recibe parámetro, devuelve un arreglo con todos los usuarios.
    // En caso de recibir el parámetro <plan>, devuelve sólo los usuarios correspondientes a dicho plan ('regular' o 'premium').
    export const listUsers = (req, res)=>{
        return res.status(200).json(users)  
    }
    export const listUsersPlan = (req, res)=>{
        const { plan } = req.params.plan
        const listUser = users.filter(e => e.plan === plan)
        return res.status(200).json(listUser)
    }

    // Agrega un nuevo usuario, verificando que no exista anteriormente en base a su email.
    // En caso de existir, no se agrega y debe arrojar el Error ('El usuario ya existe') 
    // Debe tener una propiedad <plan> que inicialmente debe ser 'regular'.
    // Debe tener una propiedad <watched> que inicialmente es un array vacío.
    // El usuario debe guardarse como un objeto con el siguiente formato:
    // {  email: email, name: name,  plan: 'regular' , watched: []}
    // En caso exitoso debe retornar el string 'Usuario <email_del_usuario> creado correctamente'.
export const addUser = (req, res)=>{
    const { email, name } = req.body
    let newUser = {
        email,
        name,
        plan: 'regular',
        watched: []
    }
    const validation = users.find(e => e.email === email)
    if(validation !== undefined) return res.status(400).json('El usuario ya existe')
    users.push(newUser)
    return res.status(200).json(`Usuario ${email} creado correctamente`)
}

  // Alterna el plan del usuario: si es 'regular' lo convierte a 'premium' y viceversa.
  // Retorna el mensaje '<Nombre_de_usuario>, ahora tienes el plan <nuevo_plan>'
  // Ej: 'Martu, ahora tienes el plan premium'
  // Si el usuario no existe, arroja el Error ('Usuario inexistente') 
    export const switchPlan = (req, res)=>{
        const email = req.params.email
        users.map(u => {
        if(u.email == email) {
            if(u.plan === "regular") u.plan = "premium";
            else u.plan === "regular";
         //u.plan === "regular" ? u.plan = "premium" : u.plan = "regular";
            return res.json(`${u.name}, ahora tienes el plan ${u.plan}`)
        } else{
         res.json(users)
        }
        })
    }
    // Agrega una nueva serie al catálogo.
    // Si la serie ya existe, no la agrega y arroja un Error ('La serie <nombre_de_la_serie> ya existe')
    // Si la categoría no existe, arroja un Error ('La categoría <nombre_de_la_categoría> no existe') y no agrega la serie.
    // Debe devolver el mensaje 'La serie <nombre de la serie> fue agregada correctamente'
    // Debe guardar la propiedad <category> de la serie (regular o premium)
    // Debe guardar la propiedade <rating> inicializada 0
    // Debe guardar la propiedade <reviews> que incialmente es un array vacío.(name, seasons, category, year)

    export const addSerie = (req, res) => {
        const { name, seasons, category, year } = req.body
        const serie = series.filter(e => e.name === name)
        if(serie === undefined) return res.status(400).json(`La serie ${name} ya existe`)
        if(category !== 'regular' && category !== 'premium') return res.status(404).json(`La categoria ${category} no existe`)
        const newSerie = {
            name,
            seasons,
            category,
            year,
            rating: 0,
            reviews : []
        }
        series.push(newSerie)
        return res.status(200).json('La serie fue añadida con exito')
    }
    // Devuelve un arreglo con todas las series.
    // Si recibe una categoría como parámetro, debe filtrar sólo las series pertenecientes a la misma (regular o premium).
    // Si la categoría no existe, arroja un Error ('La categoría <nombre_de_la_categoría> no existe') y no agrega la serie.  

    export const listSerie = (req, res) => {
        res.status(200).json(series)
    }

    export const listCategory = (req, res) => {
        const category = req.params.category
        if(category !== 'regular' && category !== 'premium') return res.status(404).json(`La categoria ${category} no existe`)
        const seriesCate = series.filter(e => e.category === category)
        return res.status(200).json(seriesCate)
    }

    // Con esta función, se emula que el usuario comienza a reproducir una serie.
    // Si el usuario no existe, arroja el Error ('Usuario inexistente')
    // Si la serie no existe, arroja el Error ('Serie inexistente')
    // Debe validar que la serie esté disponible según su plan. Usuarios con plan regular sólo pueden reproducir series de dicha categoría, usuario premium puede reproducir todo.
    // En caso de contrario arrojar el Error ('Contenido no disponible, contrata ahora HenryFlix Premium!')
    // En caso exitoso, añadir el nombre (solo el nombre) de la serie a la propiedad <watched> del usuario.
    // Devuelve un mensaje con el formato: 'Reproduciendo <nombre de serie>'

    export const play = (req, res) => {
        const { email, serie } = req.body
        const valiUser = users.find(e => e.email === email)
        const valiSerie = series.find(e => e.name === serie)
        if(valiUser && valiSerie){
            if(valiUser.plan === 'premium' || valiSerie.category === 'regular'){
                users.map(e => {
                    if(e.email == email){
                        if(!e.watched.find(e => e === serie)) e.watched.push(serie)
                    }
                })
            }else return res.json('Contenido no disponible con su plan')

        }else return res.json('Usuario o serie inexistente')
        return res.json('Reproduciendo ' + serie)
    }

    // Devuelve sólo las series ya vistas por el usuario
    // Si el usuario no existe, arroja el Error ('Usuario inexistente')



    // Asigna un puntaje de un usuario para una serie:
    // Actualiza la propiedad <reviews> de la serie, guardando en dicho arreglo un objeto con el formato { email : email, score : score } (ver examples.json)
    // Actualiza la propiedad <rating> de la serie, que debe ser un promedio de todos los puntajes recibidos.
    // Devuelve el mensaje 'Le has dado <puntaje> puntos a la serie <nombre_de_la_serie>'
    // Si el usuario no existe, arroja el Error ('Usuario inexistente') y no actualiza el puntaje.
    // Si la serie no existe, arroja el Error ('Serie inexistente') y no actualiza el puntaje.
    // Debe recibir un puntaje entre 1 y 5 inclusive. En caso contrario arroja el Error ('Puntaje inválido') y no actualiza el puntaje.
    // Si el usuario no reprodujo la serie, arroja el Error ('Debes reproducir el contenido para poder puntuarlo') y no actualiza el puntaje. >> Hint: pueden usar la función anterior




















