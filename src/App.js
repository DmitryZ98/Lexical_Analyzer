import React, { useState, useEffect, useRef } from "react";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import photo from "./SCHEMA.PNG";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [disabledButtons, setDisableButtons] = useState(true);
  const toast = useRef(null);

  /**
   * Эффект для назначения доступа к кнопкам
   */
  useEffect(() => {
    setDisableButtons(word === "");
  }, [word]);

  /**
   * Функция для проверки задания
   */
  function check() {
    let symbols = word.split("");
    let location = "H";

    if (symbols[symbols.length - 1] !== "*") {
      return showError();
    }

    for (let i = 0; i < symbols.length; i++) {
      switch (location) {
        case "H":
          switch (symbols[i]) {
            case "a":
              location = "C";
              break;

            case "b":
              location = "B";
              break;

            default:
              showError();
              return;
          }
          break;

        case "A":
          switch (symbols[i]) {
            case "a":
              location = "B";
              break;

            default:
              showError();
              return;
          }
          break;

        case "B":
          switch (symbols[i]) {
            case "a":
              location = "C";
              break;

            case "b":
              location = "I";
              break;

            case "c":
              location = "A";
              break;

            default:
              showError();
              return;
          }
          break;

        case "C":
          switch (symbols[i]) {
            case "b":
              break;

            case "*":
              location = "I";
              if (i === symbols.length - 1 && symbols[i] === "*") showSuccess();
              break;

            default:
              showError();
              return;
          }
          break;

        case "I":
          if (i < symbols.length - 1 && symbols[i] === "*") showSuccess();
          else showError();
          break;

        default:
          showError();
          return;
      }
    }
  }

  /**
   * Функция для отображения уведомления о вводе верной последовательности символов
   */
  function showSuccess() {
    toast.current.show({ severity: "success", summary: "Верно", life: 5000 });
  }

  /**
   * Функция для отображения уведомления о вводе неверной последовательности символов
   */
  function showError() {
    toast.current.show({ severity: "error", summary: "Неверно", life: 5000 });
  }

  /**
   * Символ '*' - это признак конца цепочки. Его ввод в конце последовательности обязателен обязателен.
   */
  return (
    <div className="App">
      <Card title="Лексический анализатор" className="App-card">
        <img src={photo} alt="Схема задания" />
        <div>
          <label>Введите цепочку символов a,b,c, *</label>

          <div className="p-fluid">
            <div className="p-inputgroup">
              <InputText
                value={word}
                keyfilter={/[^\s]/}
                onChange={(e) => setWord(e.target.value)}
                onKeyPress={(e) => {
                  e.code === "Enter" && !disabledButtons && check();
                }}
              />
              <Button
                icon="pi pi-check"
                onClick={check}
                disabled={disabledButtons}
              />
              <Button
                className="p-button-danger"
                icon="pi pi-trash"
                onClick={() => setWord("")}
                disabled={disabledButtons}
              />
            </div>
          </div>
        </div>
      </Card>
      <Toast ref={toast} />
    </div>
  );
}

export default App;
