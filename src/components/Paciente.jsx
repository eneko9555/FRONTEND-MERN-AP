import usePacientes from "../hooks/usePacientes"

const Paciente = ({paciente}) => {

    const {setEdicion, eliminarPaciente} = usePacientes()

    const {  fecha, nombre, edad, propietario, sintomas, _id } = paciente


    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-ES', {dateStyle:'long'}).format(nuevaFecha)
    }
    
    return (
        <div className="xl:ml-20 md:ml-10 my-5 pl-5 py-10 p-3 bg-white shadow-md rounded-xl">
            
            <p className="font-bold uppercase text-indigo-700 pb-1">
                Nombre : {''}
               <span className="font-normal normal-case text-gray-600"> {nombre}</span> 
            </p>

            <p className="font-bold uppercase text-indigo-700 pb-1">
                Responsable : {''}
               <span className="font-normal normal-case text-gray-600"> {propietario}</span> 
            </p>

           

            <p className="font-bold uppercase text-indigo-700 pb-1">
                Edad : {''}
               <span className="font-normal normal-case text-gray-600"> {edad}</span> 
            </p>

            <p className="font-bold uppercase text-indigo-700 pb-1">
                Fecha de ingreso: {''}
               <span className="font-normal normal-case text-gray-600"> {formatearFecha(fecha)}</span> 
            </p>

            <p className="font-bold uppercase text-indigo-700 pb-1 ">
                Síntomas: {''}
               <span className="font-normal normal-case text-gray-600"> {sintomas}</span> 
            </p>


            <div className="flex justify-between mt-5">
                <button
                    type="button"
                    className="py-2  px-5 md:px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
                    onClick={ () => setEdicion(paciente)}
                >Editar
                    
                </button>

                <button
                    type="button"
                    className="py-2  px-5 md:px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
                    onClick={ () => eliminarPaciente(_id)}
                >Eliminar
                </button>

            </div>
        </div>

    )
}

export default Paciente