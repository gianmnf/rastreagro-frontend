import "date-fns";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FixedSizeList } from "react-window";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import fundo from "./images/background-new.jpg";

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  root: {
    backgroundColor: 'lightgreen',
  },
}));

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

function alertaSucesso() {
  Swal.fire({
    title: "Sucesso",
    text: "OS cadastrada com sucesso, redirecionando para página principal!",
    icon: "success",
    confirmButtonText: "OK",
  });
}

export default function NewOS() {
  const classes = useStyles();

  const [dataSelecionada, setDataSelecionada] = React.useState();
  const [horaInicio, setHoraInicio] = React.useState();
  const [horaFim, setHoraFim] = React.useState();
  const [operadores, setOperadores] = React.useState([]);
  const [count, setCount] = React.useState(1);

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
          <TextField id="standard-name" label="OS:" value={Math.floor(Math.random(6) * Math.floor(999999))} disabled />
        </Grid>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yy"
                margin="normal"
                id="date-picker-inline"
                label="Data"
                value={dataSelecionada}
                onChange={handleData}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="inicio"
                label="Início"
                ampm={false}
                value={horaInicio}
                onChange={handleHoraInicio}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="fim"
                label="Fim"
                ampm={false}
                value={horaFim}
                onChange={handleHoraFim}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
        </MuiPickersUtilsProvider>
        <TextField id="standard-name" label="Local:" />
        <TextField id="standard-name" label="Máquina:" />
        <TextField id="standard-name" label="Implemento:" />
        <br />
        <InputLabel id="demo-mutiple-chip-label">Operadores</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={operadores}
          onChange={handleOperadores}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
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
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </h4>
        <FixedSizeList height={200} width={300} itemSize={46} itemCount={count}>
          {renderRow}
        </FixedSizeList>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={alertaSucesso}
        >
          Salvar
        </Button>
      </Grid>
    </div>
  );
}
