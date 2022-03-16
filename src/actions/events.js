import { types } from "../types/types";



export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({type: types.eventClearActiveEvent}) 

export const eventUpdated = (ev) => ({
    type: types.eventUpdated,
    payload: ev
})

export const eventDeleted = (ev) => ({
    type: types.eventDeleted,
    payload: ev
})