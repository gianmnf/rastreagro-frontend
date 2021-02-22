import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  titulo: {
      textAlign: 'center',
  }
});

// Função para Retornar os Dados
function criarDados(os, quando, onde, maquina, implemento) {
  return {
    os,
    quando,
    onde,
    maquina,
    implemento,
    operadores: [
      { nome: "José Carlos", email: "josecarlos@gmail.com" },
      { nome: "Ana Silva", email: "ana-silva@gmail.com" },
      { nome: "Breno Souza", email: "bsouza@rastreagro.com" },
      { nome: "Fernanda Lopes", email: "flopes@rastreagro.com" },
    ],
    insumos: [
      { nome: "Inseticida A", eficiencia: "20 l/HA" },
      { nome: "Inseticida X", eficiencia: "10 l/HA" },
      { nome: "Inseticida D", eficiencia: "5 l/HA" },
      { nome: "Inseticida B", eficiencia: "30 l/HA" },
    ],
  };
}

// Função para criação do conteúdo de cada coluna
function Coluna(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.os}
        </TableCell>
        <TableCell align="right">{row.quando}</TableCell>
        <TableCell align="right">{row.onde}</TableCell>
        <TableCell align="right">{row.maquina}</TableCell>
        <TableCell align="right">{row.implemento}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Operadores
              </Typography>
              <Table size="small" aria-label="operadores">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.operadores.map((colunaOperador) => (
                    <TableRow key={colunaOperador.email}>
                      <TableCell component="th" scope="row">
                        {colunaOperador.nome}
                      </TableCell>
                      <TableCell>{colunaOperador.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Insumos
              </Typography>
              <Table size="small" aria-label="insumos">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Eficiência</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.insumos.map((colunaInsumo) => (
                    <TableRow key={colunaInsumo.nome}>
                      <TableCell component="th" scope="row">
                        {colunaInsumo.nome}
                      </TableCell>
                      <TableCell>{colunaInsumo.eficiencia}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Tipos de cada Proriedade de uma Coluna
Coluna.propTypes = {
  row: PropTypes.shape({
    os: PropTypes.number.isRequired,
    quando: PropTypes.string.isRequired,
    onde: PropTypes.string.isRequired,
    maquina: PropTypes.string.isRequired,
    implemento: PropTypes.string.isRequired,
    operadores: PropTypes.arrayOf(
      PropTypes.shape({
        nome: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      })
    ).isRequired,
    insumos: PropTypes.arrayOf(
      PropTypes.shape({
        nome: PropTypes.string.isRequired,
        eficiencia: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

// Função para popular os Dados da Tabela
const colunas = [
  criarDados(
    123457,
    "20/08/21 - 09:00h às 12:00h",
    "TL 202 132",
    "Trator Massey Ferguson TR27X",
    "MotoCultivador 01"
  ),
  criarDados(
    187426,
    "21/08/21 - 12:00h às 15:00h",
    "TL 200 145",
    "Trator Massey Ferguson TR29X",
    "MotoCultivador 02"
  ),
  criarDados(
    547894,
    "13/12/21 - 15:00h às 17:00h",
    "TL 324 899",
    "Parruda 01",
    "MotoCultivador 07"
  ),
  criarDados(
    999754,
    "24/02/22 - 07:00h às 10:00h",
    "TL 154 211",
    "Trator Massey Ferguson HK28S",
    "MotoCultivador 124"
  ),
  criarDados(
    789451,
    "29/08/22 - 11:00h às 14:00h",
    "TL 98 120",
    "Parruda 04",
    "MotoCultivador 300"
  ),
];

// Visualização Principal
export default function ViewOS() {
    const classes = useRowStyles();
  return (
    <>
      <h3 className={classes.titulo}>Lista de Ordens de Serviço</h3>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>OS</TableCell>
              <TableCell align="right">Quando</TableCell>
              <TableCell align="right">Onde</TableCell>
              <TableCell align="right">Máquina</TableCell>
              <TableCell align="right">Implemento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colunas.map((row) => (
              <Coluna key={row.os} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
