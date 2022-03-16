import { useEffect, useState } from 'react';
import moment from 'moment'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { uiCloseModal } from "../../actions/ui";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const nowPlus = now.clone().add(1, 'hours')


const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus.toDate()
}

export const CalendarModal = () => {


  const {openModal} = useSelector(state => state.ui)
  const {activeEvent} = useSelector(state => state.calendar)

  const dispatch = useDispatch()


  const [dateStart, setDateStart] = useState(now.toDate())
  const [dateEnd, setDateEnd] = useState(nowPlus.toDate())
  const [titleValid, setTitleValid] = useState(true)
  const [formValues, setFormValues] = useState(initEvent)


  const {title, notes, start, end} = formValues

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent)
    } else {
      setFormValues(initEvent)
    }
  
  }, [activeEvent, setFormValues])
  

  const handleInputChage = (ev) => {
    setFormValues({...formValues, [ev.target.name]: ev.target.value})
  }

  const handleSubmitForm = (ev) => {
    ev.preventDefault()
    console.log(formValues)


    const momentStart = moment(start)
    const momentEnd = moment(end)
    if (momentStart.isSameOrAfter(momentEnd )) {
      return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error')
    }
    if(title.trim().length < 2) {

      return setTitleValid(false)
    }

    if(activeEvent) {
      dispatch( eventUpdated(formValues))
    } else {
      dispatch( eventAddNew({
        ...formValues,
        id: new Date().getTime(),
        user: {
          _id: '123',
          name: 'anthony'
        }
      }) )
    }


    setTitleValid(true)
    closeModal()
  }


  const closeModal = () => {
    //TODO: CERRAL EL MODAL
    dispatch( uiCloseModal() )
    dispatch( eventClearActiveEvent() )
    setFormValues(initEvent)
  }

  const handleStartDateChange = (ev) => { 
    setDateStart(ev)
    setFormValues({...formValues, start: ev})
  }

  const handleEdDateChange = (ev) => { 
    setDateEnd(ev)
    setFormValues({...formValues, end: ev})

  }


  return (
    <Modal
        isOpen={openModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal} 
        style={customStyles}
        closeTimeoutMS={200}
        className='modal'
        overlayClassName='modal-fondo'>
        <h1>{(activeEvent)? 'Editar evento' : 'Nuevo evento'}</h1>
        <hr />
        <form className="container" onSubmit={handleSubmitForm}>

            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker 
                onChange={handleStartDateChange} 
                value={dateStart}
                className='form-control' 
                />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker 
                onChange={handleEdDateChange} 
                value={dateEnd}
                minDate={dateStart}
                className='form-control'
                />
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${!titleValid && "is-invalid"}`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChage}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={notes}
                    onChange={handleInputChage}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
      </Modal>
  )
};
