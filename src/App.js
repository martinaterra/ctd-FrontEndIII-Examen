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
    if (this.state.contador >= 7) {
      alert("FIN!");
      return;
    }

    let posicion = opcion === "A" ? 1 : 2;

    if (this.historial.length > 0) {
      if (this.state.seleccionPrevia === "A" && opcion === "B") {
        posicion = 3
      }
      else if (this.state.seleccionPrevia === "B" && opcion === "A") {
        posicion = 1
      } else {
        posicion = 2
      }
    }

    this.setState({
      contador: this.state.contador + posicion,
      seleccionPrevia: opcion
    })
  }

  render() {
    return (
      <div className="layout">
        <h1 className="historia">{data[this.state.contador].historia}</h1>
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

