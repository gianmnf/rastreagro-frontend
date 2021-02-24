import moment from "moment";
import "moment/locale/pt-br";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Chip,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  IconButton,
  ListItem,
  InputAdornment,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Save, Delete } from "@material-ui/icons";
import { FixedSizeList } from "react-window";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

// Definindo idioma padrão do componente de Data
moment.locale("pt-br");

// Estilos padrões
const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  button: {
    marginBottom: 3,
  },
}));

// Função para renderizar coluna
function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <TextField id={`insumo[${index + 1}]`} label={`Insumo ${index + 1}`} />
      <TextField
        id={`eficiencia[${index + 1}]`}
        label="Eficiência"
        InputProps={{
          endAdornment: <InputAdornment position="end">l/ha</InputAdornment>,
        }}
      />
    </ListItem>
  );
}

// Definindo propriedades padrão
renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

//Função para alertar quando houver um clique no botão Salvar
function alertaSucesso() {
  Swal.fire({
    title: "Sucesso",
    text: "OS cadastrada com sucesso, redirecionando para página principal!",
    icon: "success",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/";
    }
  });
}

// Visualização Principal
export default function NewOS() {
  const classes = useStyles();

  const [dataSelecionada, setDataSelecionada] = React.useState();
  const [horaInicio, setHoraInicio] = React.useState();
  const [horaFim, setHoraFim] = React.useState();
  const [operadores, setOperadores] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [os] = React.useState(Math.floor(Math.random(6) * Math.floor(999999)));

  const handleData = (data) => {
    setDataSelecionada(data);
  };

  const handleHoraInicio = (inicial) => {
    setHoraInicio(inicial);
  };

  const handleHoraFim = (final) => {
    setHoraFim(final);
  };

  const handleOperadores = (event) => {
    setOperadores(event.target.value);
  };

  // Opções para o select de Operadores
  const Operadores = [
    "Antônio Marcos",
    "Bruna Filgueira",
    "Carlos Magno",
    "Denise Pimentel",
    "Elias Rodrigues",
    "Fernanda Lopes",
    "Gian Michel",
    "Heloísa Fagundes",
  ];

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        text-align="center"
      >
        <h2>Nova OS</h2>
        <Grid item xs={12}>
          <TextField id="standard-name" label="OS:" value={os} disabled />
        </Grid>

        <MuiPickersUtilsProvider utils={MomentUtils} locale="pt-br">
          <KeyboardDatePicker
            disableToolbar
            required
            variant="inline"
            format="DD/MM/YY"
            margin="normal"
            id="date-picker-inline"
            label="Data"
            value={dataSelecionada}
            onChange={handleData}
            KeyboardButtonProps={{
              "aria-label": "alterar data",
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="inicio"
            label="Início"
            required
            ampm={false}
            value={horaInicio}
            onChange={handleHoraInicio}
            KeyboardButtonProps={{
              "aria-label": "alterar hora ínicio",
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="fim"
            label="Fim"
            required
            ampm={false}
            value={horaFim}
            onChange={handleHoraFim}
            KeyboardButtonProps={{
              "aria-label": "alterar hora fim",
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField id="local" label="Local:" required />
        <TextField id="maquina" label="Máquina:" required />
        <TextField id="implemento" label="Implemento:" required />
        <br />
        <InputLabel id="operadores-label">Operadores</InputLabel>
        <Select
          labelId="operadores-label"
          id="select-operadores"
          multiple
          value={operadores}
          onChange={handleOperadores}
          input={<Input id="select-operadores" />}
          displayEmpty
          required
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Selecione os operadores</em>;
            }

            return (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            );
          }}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>Selecione os operadores</em>
          </MenuItem>
          {Operadores.map((operador) => (
            <MenuItem key={operador} value={operador}>
              {operador}
            </MenuItem>
          ))}
        </Select>
        <h4>
          Insumos{" "}
          <IconButton
            aria-label="add"
            className={classes.margin}
            onClick={() => setCount(count + 1)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
          {count >= 2 && (
            <IconButton
              aria-label="delete"
              className={classes.margin}
              onClick={() => setCount(count - 1)}
            >
              <Delete fontSize="small" />
            </IconButton>
          )}
        </h4>
        <FixedSizeList height={140} width={300} itemSize={46} itemCount={count}>
          {renderRow}
        </FixedSizeList>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<Save />}
          onClick={alertaSucesso}
        >
          Salvar
        </Button>
      </Grid>
    </div>
  );
}
