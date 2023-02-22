import Formulario from "../components/Formulario"
import { useState } from "react"
import ListadoPacientes from "../components/ListadoPacientes"

const AdministrarPacientes = () => {

  const [mostrarForm, setMostrarForm] = useState(false)

  return (
    <>
    <div className="flex flex-col justify-center md:flex-row ">
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold uppercase mx-10 p-2 rounded-md mb-5 md:hidden "
        onClick={ () => setMostrarForm(!mostrarForm)}
      >{mostrarForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
        
      </button>

        <div className={` ${mostrarForm ? 'block'  : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
        </div>

        <div className="md:w-1/2 lg:w-3/5"> 
        <ListadoPacientes />
        </div>
    </div>
       
      
      
    
    
    </>
   

  )
}

export default AdministrarPacientes