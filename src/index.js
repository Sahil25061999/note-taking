import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { makeServer } from "./server";
import {
  TokenProvider,
  NotesListProvider,
  ArchivesListProvider,
  NoteInputProvider,
  FilterProvider,
  DeleteListProvider,
} from "./context/context-index";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <TokenProvider>
      <Router>
        <FilterProvider>
          <DeleteListProvider>
            <ArchivesListProvider>
              <NotesListProvider>
                <NoteInputProvider>
                  <App />
                </NoteInputProvider>
              </NotesListProvider>
            </ArchivesListProvider>
          </DeleteListProvider>
        </FilterProvider>
      </Router>
    </TokenProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
