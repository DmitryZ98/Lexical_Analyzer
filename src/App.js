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
   * check - Функция для проверки словаря
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

        case "C":
          switch (symbols[i]) {
            case "a":
              break;
            case "b":
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
              location = "A";
              break;

            default:
              showError();
              return;
          }
          break;

        case "A":
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
   * showSuccess - Функция для отображения уведомления о вводе верной последовательности символов
   */
  function showSuccess() {
    toast.current.show({ severity: "success", summary: "Верно",detail:`Данное слово ${word}  принадлежит грамматике` });
  }

  /**
   * showError - Функция для отображения уведомления о вводе неверной последовательности символов
   */
  function showError() {
    toast.current.show({ severity: "error", summary: "Неверно",detail: `Данное слово ${word} не принадлежит грамматике` });
  }

  /**
   * Символ '*' - это признак конца цепочки.
   * return JSX разметка
   */
  return (
    <div className="App">
      <div title="Лексический анализатор" className="App-card">
        <h1>Лексический анализатор</h1>
        <h2>Курсовая работа</h2>
        <img src={photo} alt="Схема задания" />
        <div>
          <label>Введите цепочку символов a,b, *(конечная цепочка символов)</label>

          <div className="p-fluid">
            <div className="p-inputgroup">
              <InputText
                value={word}
                keyfilter={/[^\s]/}
                onChange={(e) => setWord(e.target.value)}
                onKeyPress={(e) => {
                  e.code === "Enter" && !disabledButtons && check();
                }}
                style={{width: '350px'}}
              />
              <Button
                className='p-button-info'
                onClick={check}
                disabled={disabledButtons}
                label='Проверить'
              />
              <Button
                className="p-button-danger"
                onClick={() => setWord("")}
                disabled={disabledButtons}
                label='Очистить'
              />
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toast} position='bottom-right'/>
    </div>
  );
}

export default App;
