import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch contacts
export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
);

// Add contact
export const addData = createAsyncThunk(
  "contact/addData",
  async (newContact) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact,
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log(response);
    return response.data;
  }
);

// Update contact
export const updateDataAsync = createAsyncThunk(
  "contact/updateData",
  async (updatedContact) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${updatedContact.id}`,
      updatedContact,
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log(response);
    return response.data;
  }
);

// Delete contact
export const deleteDataAsync = createAsyncThunk(
  "contact/deleteData",
  async (contactId) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${contactId}`
    );
    console.log(response);
    return contactId;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contactList: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    updateData: null,
  },
  reducers: {
    // Adding contact
    addContact: (state, action) => {
      state.contactList.push(action.payload);
    },
    // Deleting data
    deleteContact: (state, action) => {
      const index = state.contactList.findIndex(
        (data) => data.id === action.payload
      );
      console.log(index);
      if (index !== -1) {
        state.contactList.splice(index, 1);
      }
    },
    setUpdateData: (state, action) => {
      state.updateData = action.payload;
    },
    UpdateContact: (state, action) => {
      const id = action.payload.id;
      const index = state.contactList.findIndex((contact) => contact.id === id);

      if (index !== -1) {
        // Check if the contact exists
        console.log(index);
        console.log(action.payload);

        // Create the newContactList by replacing the contact at the found index
        const newContactList = [
          ...state.contactList.slice(0, index),
          action.payload,
          ...state.contactList.slice(index + 1),
        ];

        // Update the state with the new contact list
        return {
          ...state,
          contactList: newContactList,
        };
      } else {
        console.log(`Contact with id ${id} not found`);
        return state; // No changes, return the original state
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contactList = action.payload;
        console.log(state.contactList);
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addData.fulfilled, (state, action) => {
        // state.contactList.push(action.payload);
        console.log("New contact has been added!");
      })
      .addCase(updateDataAsync.fulfilled, (state, action) => {
        const index = state.contactList.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.contactList[index] = action.payload;
        }
        console.log("Contact has been updated!");
      })
      .addCase(deleteDataAsync.fulfilled, (state, action) => {
        state.contactList = state.contactList.filter(
          (contact) => contact.id !== action.payload
        );
        console.log("Contact has been deleted!");
      });
  },
});

export const contactReducer = contactSlice.reducer;
export const dataSelector = (state) => state.contact.contactList;
export const statusSelector = (state) => state.contact.status;
export const errorSelector = (state) => state.contact.error;
export const addContact = contactSlice.actions.addContact;
export const deleteContact = contactSlice.actions.deleteContact;
export const setData = contactSlice.actions.setUpdateData;
export const updateData = (state) => state.contact.updateData;
export const updateContact = contactSlice.actions.UpdateContact;
