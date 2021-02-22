import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import logo from './farmer.svg';

const useStyles = makeStyles((theme) => ({
  mainText: {
    display: "block",
    textAlign: "center",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div className={classes.mainText}>
      <h2>Bem-vindo ao Sistema de Gerenciamento de Ordens de Serviço</h2>
      <h3>Para começar, clique ou toque no botão Opções acima</h3>
    </div>
    <div className={classes.mainText}>Ícones feitos por <a href="https://www.freepik.com" title="Freepik" target="_blank" rel="noreferrer">Freepik</a> from <a href="https://www.flaticon.com/br/" title="Flaticon" target="_blank" rel="noreferrer">www.flaticon.com</a></div>
    </div>
  );
}
