import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import jquery from "jquery";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from "mdb-react-ui-kit";

import "./styles.css";
import "./styles.css";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where
} from "firebase/firestore/lite";
const axios = require("axios");
const firebaseConfig = {
  apiKey: "AIzaSyDwaatnrPGX1cmd_iPQawQy6to-3weRfgM",
  authDomain: "test2-b0c78.firebaseapp.com",
  databaseURL: "https://test2-b0c78-default-rtdb.firebaseio.com",
  projectId: "test2-b0c78",
  storageBucket: "test2-b0c78.appspot.com",
  messagingSenderId: "1020612965446",
  appId: "1:1020612965446:web:eb1e62394169e72485c647",
  measurementId: "G-XYPBVB6JF6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var notas = {
  partidas: []
};
var output;
var tickets = [];
var token;
var $ = jquery;
var elements;
for (let index = 0; index < tickets.length; index++) {
  const element = tickets[index];
}
var fecha = moment().format("MMMM Do YYYY, h:mm:ss a");

const receipt = require("receipt");

var url;
var folio;
var fecha_fin;
var fecha_inicio;
var ffin;
var finicio;

var lista = {
  recibos: []
};

async function global() {
  var config = {
    method: "get",
    url: "https://6cume.sse.codesandbox.io/facturaglobal",
    headers: {
      Accept: "application/json"
    }
  };

  ffin = Date.now();

  axios(config)
    .then(function (response) {
      var doubles = response.data.map(function (x) {
        var date = x.datem * 1000;
        var fechap = new Date(date);

        if (date >= finicio && date <= ffin) {
          console.log("ok");
          var totalsiniva = x.total_ht;
          var totalconiva = x.total_ttc;
          var newCon = {
            clave_producto_servicio: "01010101",
            clave_unidad_de_medida: "ACT",
            cantidad: 1,
            descripcion: "Venta",
            valor_unitario: Number(totalsiniva),
            total: Number(totalconiva)
          };
          notas.partidas.push(newCon);
          console.log(notas.partidas);
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  // var doubles = cityList.map(function (x) {
  //   var ticket = x.ticket;
  //   var id = x.id_ticket;
  //   var fecha = x.Fecha;

  //   if (fecha <= fecha_fin) {
  //     var total = 0;
  //     var prods = "";

  //     ticket.map(function (w) {
  //       prods += w.descripcion + ",";
  //       total += Number(w.precio);
  //       console.log("t:" + total);
  //     });
  //     var newCon = {
  //       id: id,
  //       total: total,
  //       prods: prods,
  //       fecha: fecha
  //     };
  //     lista.recibos.push(newCon);
  //   }
  //   console.log(lista.recibos);
  // });
}
const format1 = "YYYY-MM-DD HH:mm:ss";
function doFactura() {
  var total3 = 0;

  notas.partidas.map(function (w) {
    total3 += Number(w.total);
    console.log("total3:" + total3);
  });
  var date1 = new Date();
  var dateTime = moment(date1).format(format1);
  var ivatotal = total3 * 0.16;
  var subtotal = total3 - ivatotal;
  var factura_templ = {
    emisor: {
      uuid: "f3313239-a434-4dfd-b10d-63b57e2ea559"
    },
    receptor: {
      uuid: "277ddda0-6254-11eb-a336-331a303b0a87"
    },
    factura: {
      fecha: dateTime,
      folio: 3,
      tipo: "ingreso",
      generacion_automatica: true,
      subtotal: subtotal,
      impuesto_federal: ivatotal,
      total: subtotal + ivatotal,
      conceptos: notas.partidas
    }
  };

  enviaFactura(factura_templ);
}
function enviaFactura(factura) {
  var config2 = {
    method: "post",
    url: "https://fvo7y.sse.codesandbox.io/facturaglobal",
    data: factura,
    token: token
  };

  axios(config2)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
var ticket = (
  <div id="ticket">
    <div id="invoice-POS">
      <div id="mid">
        <div class="info">
          <p>Alma Alicia Flores Zavala</p>
          <p>
            FOZA8801257C2 Carrera Torres 742 Heroe de Nacozari Ciudad Victoria
            Tamps. c.p.87030
          </p>
        </div>
      </div>

      <div id="bot">
        <div id="table">
          <table id="tableElement">
            <tbody>
              <tr class="tabletitle">
                <td class="item">Cantidad</td>
                <td class="Hours">Producto</td>
                <td class="Rate">Importe</td>
              </tr>

              <tr class="tabletitle" id="totalTicket">
                <td class="Rate">
                  <p>Total</p>
                </td>
                <td class="payment">
                  <p id="total">0</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="factura">
          <h3>Si necesita factura de este recibo favor de entrar a :</h3>
        </div>
      </div>
    </div>
  </div>
);

export default function Global() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => jsonCambio(data);
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="date"
          {...register("fecha_inicio")}
          placeholder="fecha inicio"
        />

        <MDBBtn color="success" type="submit" value="agregar">
          seleccionar dia{""}
        </MDBBtn>
      </form>
      <div id="ticket_content"></div>
      <MDBBtn onClick={global}>checar</MDBBtn>
      <MDBBtn onClick={doFactura}>factura</MDBBtn>

      <>
        <MDBBtn id="recibo" onClick={toggleShow}>
          Ver recibo
        </MDBBtn>
        <MDBModal
          show={basicModal}
          getOpenState={(e: any) => setBasicModal(e)}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Recibo</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>{ticket}</MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleShow}>
                  Cerrar
                </MDBBtn>
                <MDBBtn onClick={print}>Imprimir</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    </div>
  );
}
function print(ticket) {
  var printContents = document.getElementById("ticket").innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}
var total;
var rec;

async function jsonCambio(data) {
  fecha_inicio = data.fecha_inicio;
  fecha_fin = data.fecha_fin;
  finicio = Date.parse(fecha_inicio);
  ffin = Date.parse(fecha_inicio);
  var total2 = 0;

  console.log("finicio:" + finicio);
}
