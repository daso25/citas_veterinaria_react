import { useState, useEffect } from "react";
import Error from "./error";
import Paciente from "./Paciente";

function Formulario({ pacientes, setPacientes, paciente, setPaciente }) {
  const [nombre, setNombre] = useState(""); //State Nombre
  const [propietario, setPropietario] = useState(""); //State Propietario
  const [email, setEmail] = useState(""); //State Email
  const [alta, setAlta] = useState(""); //State Alta
  const [sintomas, setSintomas] = useState(""); //State Sintomas
  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setAlta(paciente.alta);
      setSintomas(paciente.sintomas);
    }
  },[paciente])

  // validación de Formularios
  const handleSubmit = (e) => {
    e.preventDefault();

    const generarId = ()=>{
      const random = Math.random().toString(36).substr(2);
      const fecha = Date.now().toString(36)

      return random + fecha
    }

    if ([nombre, propietario, email, alta, sintomas].includes("")) {
      setError(true);
      return;
    } 
    setError(false);
     
    
    //Objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      alta,
      sintomas
    };


    

    if(paciente.id){
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente: pacienteState)
      setPacientes(pacientesActualizados)
      setPaciente({})
    }else{
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    // aca lo que estamos haciendo es sacar una copia del arreglo de pacientes y agregar el nuevo paciente, asi se evita reescribir los datos
    
    //Reiniciar formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setAlta('');
    setSintomas('');
    setError('');
  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center">
        Añade pacientes y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded py-10 px-5 mt-10 mb-10 ml-3 mr-3"
      >
        { error && 
          <Error mensaje='Todos los campos son obligatorios'/>
        }

        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 p-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Propietario{" "}
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 p-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => {
              setPropietario(e.target.value);
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="border-2 p-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 p-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={alta}
            onChange={(e) => {
              setAlta(e.target.value);
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            name="sintomas"
            id="sintomas"
            className="border-2 p-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => {
              setSintomas(e.target.value);
            }}
            placeholder="Describe los sintomas"
          />
        </div>

        <input
          type="submit"
          value={paciente.nombre  ? 'GUARDAR': 'AGREGAR'}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
}

export default Formulario;
