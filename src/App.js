import data from "./components/data.json";
import React, { Component } from "react";
import Opciones from "./components/Opciones";
import Recordatorio from "./components/Recordatorio";

export default class App extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.historial = []
    this.state = {
      contador: 0,
      seleccionPrevia: "",
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contador !== this.state.contador) {
      this.historial.push(this.state.seleccionPrevia)
    }
  }

  handleClick(opcion) {
    let contadorAux = 0;

    if (this.state.contador >= 7) {
      alert("Fin!");
    } else if (this.state.seleccionPrevia === opcion) {
      contadorAux = 2
    }
    else if (this.state.seleccionPrevia === "A" && opcion === "B") {
      contadorAux = 3
    } else if (this.state.seleccionPrevia === "B" && opcion === "A") {
      contadorAux = 1
    } else if (opcion === "A") {
      contadorAux = 1
    } else {
      contadorAux = 2
    }


    this.setState({
      contador: this.state.contador + contadorAux,
      seleccionPrevia: opcion
    })
  }

  render() {
    return (
      <div className="layout">
        <h2 className="historia">{data[this.state.contador].historia}</h2>
        <Opciones optionA={data[this.state.contador].opciones.a} optionB={data[this.state.contador].opciones.b} handleClick={this.handleClick} />
        <Recordatorio
          seleccionPrevia={this.state.seleccionPrevia}
          historial={this.historial.map(
            (e, index) => (
              <li key={index}>{e}</li>
            ),
            data[this.state.contador].id
          )}
        />
      </div>
    )
  }
}

