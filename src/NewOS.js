import 'date-fns';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}))

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
    title: 'Sucesso',
    text: 'OS cadastrada com sucesso, redirecionando para página principal!',
    icon: 'success',
    confirmButtonText: 'OK'
  })
}

export default function NewOS() {
    const classes = useStyles();

    const [dataSelecionada, setDataSelecionada] = React.useState();
    const [horaInicio, setHoraInicio] = React.useState();
    const [horaFim, setHoraFim] = React.useState();
    const [operadores, setOperadores] = React.useState([]);
    const [insumos, setInsumos] = React.useState([]);

    const handleData = (data) => {
        setDataSelecionada(data);
    }

    const handleHoraInicio = (inicial) => {
        setHoraInicio(inicial);
    }

    const handleHoraFim = (final) => {
        setHoraFim(final);
    }

    const handleOperadores = (event) => {
        setOperadores(event.target.value);
    }

    const handleInsumos = (event) => {
        setInsumos(event.target.value);
    }

    const Operadores = [
        "Antônio Marcos",
        "Bruna Filgueira",
        "Carlos Magno",
        "Denise Pimentel",
        "Elias Rodrigues",
        "Fernanda Lopes",
        "Gian Michel",
        "Heloísa Fagundes"
    ];

    const Insumos = [
        "Herbicida A",
        "Inseticida B",
        "Fungicida C",
        "Bactericida D",
        "Rodenticida E"
    ]

    return (
        <>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        text-align="center"
        style={{ minHeight: '10vh' }}
        >
        <h2>Nova OS</h2>
            <TextField id="standard-name" label="OS:" />
      
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Data"
          value={dataSelecionada}
          onChange={handleData}
          KeyboardButtonProps={{
            'aria-label': 'change date',
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
            'aria-label': 'change time',
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
            'aria-label': 'change time',
          }}
        />
    </MuiPickersUtilsProvider>
    <TextField id="standard-name" label="Local:" />
    <TextField id="standard-name" label="Máquina:" />
    <TextField id="standard-name" label="Implemento:" />
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
  
    <InputLabel id="select-insumos-label">Insumos</InputLabel>
        <Select
          labelId="select-insumos-label"
          id="select-insumos-chip"
          multiple
          value={insumos}
          onChange={handleInsumos}
          input={<Input id="select-insumos" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {Insumos.map((insumo) => (
            <MenuItem key={insumo} value={insumo}>
              {insumo}
            </MenuItem>
          ))}
        </Select>
          <Button
            variant="contained"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={alertaSucesso}
          >
            Salvar
          </Button>
        </Grid> 
        </>       
    )
}