import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"



const ListadoPacientes = () => {

  const { pacientes } = usePacientes()

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-2xl text-center">Listado de Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus
            <span className="text-indigo-600 font-bold "> Pacientes</span>
          </p>


          {pacientes.map(paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}



        </>
      ) :
        (
          <>
            <h2 className="font-black text-2xl text-center">Aún no tienes ningún <span className="text-indigo-600 font-bold ">Paciente</span></h2>

          </>

        )}

    </>
  )
}

export default ListadoPacientes