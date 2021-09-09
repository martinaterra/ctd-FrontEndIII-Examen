import data from "./components/data.json";
import React, { Component } from "react";
import Opciones from "./components/Opciones";
import Recordatorio from "./components/Recordatorio";


const historial = [];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 0,
      seleccionPrevia: "",
    };
  }

  componentDidUpdate(prevState) {
    if (prevState.contador !== this.state.contador) {
      historial.push(this.state.seleccionPrevia);
    }
  }

  handleClick = (evento) => {
    if (this.state.contador >= 7) {
      alert("Fin!");
    } else if (evento.target.id === "A" && this.state.seleccionPrevia !== "A") {
        this.setState({
        contador: this.state.contador + 1,
        seleccionPrevia: "A",
      });
    } else if (evento.target.id === "A" && this.state.seleccionPrevia === "A") {
      this.setState({
        contador: this.state.contador + 2,
      });
    } else if (evento.target.id === "B" && this.state.seleccionPrevia === "A") {
      this.setState({
        contador: this.state.contador + 3,
        seleccionPrevia: "B",
      });
    } else if (evento.target.id === "B") {
      this.setState({
        contador: this.state.contador + 2,
        seleccionPrevia: "B",
      });
    }
  };

  render() {
    return (
      <div className="layout">
        <h1 className="titulo">Tu propia aventura</h1>
        <h2 className="historia">{data[this.state.contador].historia}</h2>
        <Opciones
          handleClick={this.handleClick}
          opcionA={data[this.state.contador].opciones.a}
          opcionB={data[this.state.contador].opciones.b}
        />
        <Recordatorio
          seleccionPrevia={this.state.seleccionPrevia}
          historial={historial.map(
            (e, index) => (<li key={index}>{e}</li>)
)}
        />
      </div>
    );
  }
}


export default App;
