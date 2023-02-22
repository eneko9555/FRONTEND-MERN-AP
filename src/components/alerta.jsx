

const alerta = ({alerta}) => {

  
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600 ': 'from-indigo-400 to-indigo-600'} bg-gradient-to-r    mt-5 md:mt-0     text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-8 alerta `}>
        {alerta.msg}
        
    </div>
   
  )
}

export default alerta