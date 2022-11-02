import "./App.css";
import {useState, useEffect} from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientesArray')) ?? []);
  const [paciente, setPaciente] = useState({});


  useEffect(()=>{
    localStorage.setItem('pacientesArray', JSON.stringify(pacientes))
  },[pacientes])

  const eliminarPaciente = (id) =>{
      const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
      setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto my-5">
      <Header />
      <div className="md:flex mt-8">
        <Formulario 
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente={setPaciente}
        />
        <ListadoPacientes
         pacientes={pacientes}
         setPaciente={setPaciente}
         eliminarPaciente={eliminarPaciente} />
      </div>
    </div>
  );
}

export default App;
