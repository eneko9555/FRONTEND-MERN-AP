import { useState, useEffect } from "react"
import Alerta from './alerta'
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [edad, setEdad] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const {guardarPaciente, paciente} = usePacientes()

    

    useEffect(() => {
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setEdad(paciente.edad)
            setFecha((paciente.fecha).substring(0,10))
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
        

    }, [paciente])





    const handleSubmit = e => {
        e.preventDefault()

        //validar form
        if ([nombre, propietario, email, edad, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        
        guardarPaciente({nombre, propietario, email, edad, fecha, sintomas, id})
        setAlerta({
            msg:'Guardado Correctamente'
        })

        setNombre('')
        setEmail('')
        setPropietario('')
        setFecha('')
        setEdad('')
        setSintomas('')
        setId('')

      
        
        
    }

    

    const { msg } = alerta

    return (
        <>
            <h2 className="font-black text-2xl mb-5 text-center">Administra tus Pacientes</h2>
            <p className="text-xl text-center mb-4 md:mb-6">
                Añade tus  <span className=" text-indigo-600 font-bold">Pacientes</span>
            </p>

            
            <form className="px-5 py-10 bg-white mb-10 rounded-md md:ml-10 lg:mb-0 shadow-md"
                onSubmit={handleSubmit}
            >
                {msg && <Alerta
                    alerta={alerta}
                />}

                

                <div className=" flex flex-col p-3 gap-2">
                    <label htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Paciente</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre del Paciente"
                        className="border-2 w-full p-2 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className=" flex flex-col p-4 gap-2">
                    <label htmlFor="propietario"
                        className="text-gray-700 uppercase font-bold"
                    >Persona Responsable</label>
                    <input
                        type="text"
                        id="propietario"
                        placeholder="Persona responsable del paciente"
                        className="border-2 w-full p-2 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className=" flex flex-col p-4 gap-2">
                    <label htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    > Email </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email "
                        className="border-2 w-full p-2 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className=" flex flex-col p-4 gap-2">
                    <label htmlFor="edad"
                        className="text-gray-700 uppercase font-bold"
                    > Edad </label>
                    <input
                        type="number"
                        id="edad"
                        placeholder="Edad del paciente "
                        className="border-2 w-full p-2 rounded-md"
                        value={edad}
                        onChange={e => setEdad(e.target.value)}
                    />
                </div>

                <div className=" flex flex-col p-4 gap-2">
                    <label htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold"
                    > Fecha de Ingreso </label>
                    <input
                        type="date"
                        id="fecha"
                        className="border-2 w-full p-2 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className=" flex flex-col p-4 gap-2">
                    <label htmlFor="sintomas"
                        className="text-gray-700 uppercase font-bold"
                    > Sintomas </label>
                    <textarea
                        id="sintomas"
                        placeholder="Sintomas del paciente "
                        className="border-2 w-full p-2 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>
                <div className="text-center mt-3">
                    <input
                        type="submit"
                        value= {id ? "Guardar Cambios" : "Agregar Paciente"}
                        className=  "bg-indigo-600 w-3/4 p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer rounded-md transition-colors"
                    />

                </div>

            </form>

        </>





    )
}

export default Formulario