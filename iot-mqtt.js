// Se crea el Id del cliente, siempre con una parte random para evitar problemas por caidas
var clientId = "ws" + Math.random();

// Se crea el cliente como tal otorgando la ubicacion del servidor MQTT, se usa la libreria Paho
var client = new Paho.MQTT.Client("192.168.1.75", 9001, clientId);

// Se establecen controladores de devolución de llamada (Por defecto)
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Se conecta al cliente
client.connect({onSuccess:onConnect});

// Variables que se emplearan para sensores y actuadores
ValorHumedad = -1;
ValorPresionTk = -1;
ValorPresion1 = -1;
ValorPresion2 = -1;
EstadoAlivioTk = "OFF";
EstadoEncenderC1 = "OFF";
EstadoApagarC1 = "OFF";
EstadoEnergiaC1 = "OFF";
EstadoOnOffC1 = "OFF";
EstadoParoC1 = "OFF";

EstadoEncenderC2 = "OFF";
EstadoApagarC2 = "OFF";
EstadoEnergiaC2 = "OFF";
EstadoOnOffC2 = "OFF";
EstadoParoC2 = "OFF";

// Funcion que se ejecuta cuando se eliminan condensados en el tanque
function FuncionAlivioTK()
{
  if (EstadoAlivioTk == "OFF")
  {
    message = new Paho.MQTT.Message("ON");
    message.destinationName = 'IoT/AlvTk'
    client.send(message);
  }
  else if (EstadoAlivioTk == "ON")
  {
    message = new Paho.MQTT.Message("OFF");
    message.destinationName = 'IoT/AlvTk'
    client.send(message);
  }
};

function FuncionEncenderC1()
{
  if (EstadoEncenderC1 == "OFF")
  {
    message = new Paho.MQTT.Message("ON");
    message.destinationName = 'IoT/OnC1'
    client.send(message);
  }
  else if (EstadoEncenderC1 == "ON")
  {
    message = new Paho.MQTT.Message("OFF");
    message.destinationName = 'IoT/OnC1'
    client.send(message);
  }
};

function FuncionApagarC1()
{
  if (EstadoApagarC1 == "OFF")
  {
    message = new Paho.MQTT.Message("ON");
    message.destinationName = 'IoT/OffC1'
    client.send(message);
  }
  else if (EstadoApagarC1 == "ON")
  {
    message = new Paho.MQTT.Message("OFF");
    message.destinationName = 'IoT/OffC1'
    client.send(message);
  }
};

function FuncionEncenderC2()
{
  if (EstadoEncenderC2 == "OFF")
  {
    message = new Paho.MQTT.Message("ON");
    message.destinationName = 'IoT/OnC2'
    client.send(message);
  }
  else if (EstadoEncenderC2 == "ON")
  {
    message = new Paho.MQTT.Message("OFF");
    message.destinationName = 'IoT/OnC2'
    client.send(message);
  }
};

function FuncionApagarC2()
{
  if (EstadoApagarC2 == "OFF")
  {
    message = new Paho.MQTT.Message("ON");
    message.destinationName = 'IoT/OffC2'
    client.send(message);
  }
  else if (EstadoApagarC2 == "ON")
  {
    message = new Paho.MQTT.Message("OFF");
    message.destinationName = 'IoT/OffC2'
    client.send(message);
  }
};

function FuncionConsultarC1()
{
  const idEnerC1 = document.querySelector('#energizadoC1');
  const idOnoffC1 = document.querySelector('#onoffC1');
  const idParoC1 = document.querySelector('#paroC1');
  if (EstadoEnergiaC1 == "OFF")
  {
    idEnerC1.classList.remove('verde');
    
  }else if (EstadoEnergiaC1 == "ON"){
    idEnerC1.classList.add('verde');
  }

  if (EstadoOnOffC1 == "OFF")
  {
    idOnoffC1.classList.remove('verde');
    
  }else if (EstadoOnOffC1 == "ON"){
    idOnoffC1.classList.add('verde');
  }

  if (EstadoParoC1 == "OFF")
  {
    idParoC1.classList.remove('verde');
    
  }else if (EstadoParoC1 == "ON"){
    idParoC1.classList.add('verde');
  }
};

function FuncionConsultarC2()
{
  const idEnerC2 = document.querySelector('#energizadoC2');
  const idOnoffC2 = document.querySelector('#onoffC2');
  const idParoC2 = document.querySelector('#paroC2');
  if (EstadoEnergiaC2 == "OFF")
  {
    idEnerC2.classList.remove('verde');
    
  }else if (EstadoEnergiaC2 == "ON"){
    idEnerC2.classList.add('verde');
  }

  if (EstadoOnOffC2 == "OFF")
  {
    idOnoffC2.classList.remove('verde');
    
  }else if (EstadoOnOffC2 == "ON"){
    idOnoffC2.classList.add('verde');
  }

  if (EstadoParoC2 == "OFF")
  {
    idParoC2.classList.remove('verde');
    
  }else if (EstadoParoC2 == "ON"){
    idParoC2.classList.add('verde');
  }
};

// Cuando el cliente se conecta al broker se ejecuta esto
function onConnect() {
  console.log("Conexion MQTT-Websockets: OK");

  //Suscribimos a los topic de interes
  //Topics de red
  client.subscribe("IoT/Hum");
  //Topics de tanque
  client.subscribe("IoT/Ptk");
  client.subscribe("IoT/AlvTk");
  //Topics de Compresor principal
  client.subscribe("IoT/Pr1"); //
  client.subscribe("IoT/OnC1"); //
  client.subscribe("IoT/OffC1"); //
  client.subscribe("IoT/EnerC1");
  client.subscribe("IoT/OnOffC1");
  client.subscribe("IoT/ParoC1");
  //Topics de Compresor principal
  client.subscribe("IoT/Pr2");
  client.subscribe("IoT/OnC2");
  client.subscribe("IoT/OffC2");
  client.subscribe("IoT/EnerC2");
  client.subscribe("IoT/OnOffC2");
  client.subscribe("IoT/ParoC2");
}

// Cuando el cliente pierde conexion con el broker se ejecuta esto
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Conexión Perdida:"+responseObject.errorMessage);
  }
}

// Cuando se reciben mensajes se ejecuta esto
function onMessageArrived(message) {
  console.log(message.destinationName + ":" + message.payloadString);

  //Se revisa el topic y se actualizan las variables
  // Topics de Red
  if(message.destinationName == 'IoT/Hum')
  {
    ValorHumedad = parseFloat(message.payloadString);
  }
  // Topics de Tanque
  if(message.destinationName == 'IoT/Ptk')
  {
    ValorPresionTk = parseFloat(message.payloadString);
  }
  if(message.destinationName == 'IoT/AlvTk')
  {
    EstadoAlivioTk = message.payloadString;
  }
  //Topics de Compresor 1
  if(message.destinationName == 'IoT/Pr1')
  {
    ValorPresion1 = parseFloat(message.payloadString);
  }
  if(message.destinationName == 'IoT/OnC1')
  {
    EstadoEncenderC1 = message.payloadString;
  }
  if(message.destinationName == 'IoT/OffC1')
  {
    EstadoApagarC1 = message.payloadString;
  }
  if(message.destinationName == 'IoT/EnerC1')
  {
    EstadoEnergiaC1 = message.payloadString;
  }
  if(message.destinationName == 'IoT/OnOffC1')
  {
    EstadoOnOffC1 = message.payloadString;
  }
  if(message.destinationName == 'IoT/ParoC1')
  {
    EstadoParoC1 = message.payloadString;
  }

  //Topics de Compresor 2
  if(message.destinationName == 'IoT/Pr2')
  {
    ValorPresion2 = parseFloat(message.payloadString);
  }
  if(message.destinationName == 'IoT/OnC2')
  {
    EstadoEncenderC2 = message.payloadString;
  }
  if(message.destinationName == 'IoT/OffC2')
  {
    EstadoApagarC2 = message.payloadString;
  }
  if(message.destinationName == 'IoT/EnerC2')
  {
    EstadoEnergiaC2 = message.payloadString;
  }
  if(message.destinationName == 'IoT/OnOffC2')
  {
    EstadoOnOffC2 = message.payloadString;
  }
  if(message.destinationName == 'IoT/ParoC2')
  {
    EstadoParoC2 = message.payloadString;
  }

}




