import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: 'Cumpleaños del ori',
//   notes: 'Hay que comprar la torta',
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: '#605CC7',
//   user: {
//     _id: '123',
//     name: 'Guido'
//   }

// }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [

    ],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map(event => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(event => event._id !== state.activeEvent._id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      payload.forEach(event => {
        const exist = state.events.some(dbEvent => dbEvent.id === event.id);
        if (!exist) {
          state.events.push(event)
        }
      })
    },
    onLogoutCalendar: (state) => {

      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;

    }
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;