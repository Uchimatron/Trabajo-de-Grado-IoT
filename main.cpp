#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <stdlib.h>

//---------- CONFIGURACION MQTT -------------
const char *mqtt_server = "192.168.1.75";
const int mqttPort = 1883;


//---------- CONFIGURACION WIFI ---------------
const char* ssid = "VICTORIA PADILLA";
const char* password = "1067900289";

//-----------------------------------------
//---------------- GLOBLES ----------------
//-----------------------------------------

WiFiClient espClient;
PubSubClient client(espClient);

// Para el WIFI
int contconexion = 0;

// Para las salidas
char AlvTk[50];
char OnC1[50];
char OffC1[50];
char OnC2[50];
char OffC2[50];

// Para las entradas
unsigned long previousMillis = 0;
//Los sensores
String strhum = ""; //string de la humedad
String strptk = ""; //string de la presion del tanque
String strpr1 = ""; //string de la presion compresor 1
String strpr2 = ""; //string de la presion compresor 2

//-----------------------------------------
//--------------- FUNCIONES ---------------
//-----------------------------------------
void callback(char* topic, byte* payload, unsigned int length);
void reconnect();
void setup_wifi();
 
void setup() 
{
  //Salidas digitales
  pinMode(5, OUTPUT);
  digitalWrite(5, LOW);

  pinMode(18, OUTPUT);
  digitalWrite(18, LOW);

  pinMode(19, OUTPUT);
  digitalWrite(19, LOW);

  pinMode(21, OUTPUT);
  digitalWrite(21, LOW);

  pinMode(22, OUTPUT);
  digitalWrite(22, LOW);



  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, mqttPort);
  client.setCallback(callback);

  //Temas de las salidas digitales que debe escribir la ESP32
  String IoTAlvTk = "IoT/AlvTk";
  IoTAlvTk.toCharArray(AlvTk, 50);

  String IoTOnC1 = "IoT/OnC1";
  IoTOnC1.toCharArray(OnC1, 50);

  String IoTOffC1 = "IoT/OffC1";
  IoTOffC1.toCharArray(OffC1, 50);

  String IoTOnC2 = "IoT/OnC2";
  IoTOnC2.toCharArray(OnC2, 50);

  String IoTOffC2 = "IoT/OffC2";
  IoTOffC2.toCharArray(OffC2, 50);

}

void loop() 
{
  if (!client.connected())
  {
    reconnect();
  }

    client.loop();
  
    unsigned long currrentMillis = millis();

    if(currrentMillis - previousMillis >= 10000)
    {
      previousMillis = currrentMillis;

      //Configuramos las publicaciones de los valores de los sensores
      int Hum = analogRead(34);
      int Ptk = analogRead(35);
      int Pr1 = analogRead(32);
      int Pr2 = analogRead(33);
      //Realizamos las conversiones necesarias 
      float ValorHum = (Hum*100)/4095;
      float ValorPtk = (Ptk*150)/4095;
      float ValorPr1 = (Pr1*150)/4095;
      float ValorPr2 = (Pr2*150)/4095;

      strhum = String(ValorHum, 1); // 1 decimal
      strptk = String(ValorPtk, 1); // 1 decimal  
      strpr1 = String(ValorPr1, 1); // 1 decimal
      strpr2 = String(ValorPr2, 1); // 1 decimal

      char humString[4];
      char ptkString[4];
      char pr1String[4];
      char pr2String[4];


      dtostrf(ValorHum,4,1,humString);
      dtostrf(ValorPtk,4,1,ptkString);
      dtostrf(ValorPr1,4,1,pr1String);
      dtostrf(ValorPr2,4,1,pr2String);

      Serial.println("Enviando: [IoT/Hum]" + strhum);
      client.publish("IoT/Hum", humString);
      delay(500);
      Serial.println("Enviando: [IoT/Ptk]" + strptk);
      client.publish("IoT/Ptk", ptkString);
      delay(500);
      Serial.println("Enviando: [IoT/Pr1]" + strpr1);
      client.publish("IoT/Pr1", pr1String);
      delay(500);
      Serial.println("Enviando: [IoT/Pr2]" + strpr2);
      client.publish("IoT/Pr2", pr2String);
      delay(500);

      //Configuramos las publicaciones de los estados de los compresores
      int EnerC1 = digitalRead(13);
      int OnOffC1 = digitalRead(12);
      int ParoC1 = digitalRead(14);

      int EnerC2 = digitalRead(27);
      int OnOffC2 = digitalRead(23);
      int ParoC2 = digitalRead(4);

      if(EnerC1 == 1)
      {
        Serial.println("Enviando: [IoT/EnerC1] ON");
        client.publish("IoT/EnerC1", "ON");
        delay(500);
      }else{
        Serial.println("Enviando: [IoT/EnerC1] OFF");
        client.publish("IoT/EnerC1", "OFF");
        delay(500);
      }

      if(OnOffC1 == 1)
      {
        Serial.println("Enviando: [IoT/OnOffC1] ON");
        client.publish("IoT/OnOffC1", "ON");
        delay(500);
      }else{
        Serial.println("Enviando: [IoT/OnOffC1] OFF");
        client.publish("IoT/OnOffC1", "OFF");
        delay(500);
      }

      if(ParoC1 == 1)
      {
        Serial.println("Enviando: [IoT/ParoC1] ON");
        client.publish("IoT/ParoC1", "ON");
        delay(500);
      }else{
        Serial.println("Enviando: [IoT/ParoC1] OFF");
        client.publish("IoT/ParoC1", "OFF");
        delay(500);
      }


      if(EnerC2 == 1)
      {
        Serial.println("Enviando: [IoT/EnerC2] ON");
        client.publish("IoT/EnerC2", "ON");
        delay(500);
      }else{
        Serial.println("Enviando: [IoT/EnerC2] OFF");
        client.publish("IoT/EnerC2", "OFF");
        delay(500);
      }

      if(OnOffC2 == 1)
      {
        Serial.println("Enviando: [IoT/OnOffC2] ON");
        client.publish("IoT/OnOffC2", "ON");
        delay(500);
      }else{
        Serial.println("Enviando: [IoT/OnOffC1] OFF");
        client.publish("IoT/OnOffC1", "OFF");
        delay(500);
      }

      if(ParoC2 == 1)
      {
        Serial.println("Enviando: [IoT/ParoC2] ON");
        client.publish("IoT/ParoC2", "ON");
        delay(500);
      }else{
        Serial.println("Enviando: [IoT/ParoC2] OFF");
        client.publish("IoT/ParoC2", "OFF");
        delay(500);
      }
    }
}

//-----------------------------------------
//------------   CALLBACK  ----------------
//-----------------------------------------
void callback(char* topic, byte* payload, unsigned int length)
{
  String incoming = "";
  Serial.print("Mensaje recibido:[");
  Serial.print(topic);
  Serial.print("]");
  for (int i = 0; i < length; i++)
  {
    incoming += (char)payload[i];
  }
  incoming.trim();
  Serial.println("Mensaje: " + incoming);

  if (String(topic) == String(AlvTk))
  {
    if (payload[1] == 'N')
    {
      digitalWrite(5, HIGH);
    }
    if  (payload[1] == 'F')
    {
      digitalWrite(5, LOW);
    }
  }

  if (String(topic) == String(OnC1))
  {
    if (payload[1] == 'N')
    {
      digitalWrite(18, HIGH);
    }
    if  (payload[1] == 'F')
    {
      digitalWrite(18, LOW);
    }
  }

  if (String(topic) == String(OffC1))
  {
    if (payload[1] == 'N')
    {
      digitalWrite(19, HIGH);
    }
    if  (payload[1] == 'F')
    {
      digitalWrite(19, LOW);
    }
  }

  if (String(topic) == String(OnC2))
  {
    if (payload[1] == 'N')
    {
      digitalWrite(21, HIGH);
    }
    if  (payload[1] == 'F')
    {
      digitalWrite(21, LOW);
    }
  }

  if (String(topic) == String(OffC2))
  {
    if (payload[1] == 'N')
    {
      digitalWrite(22, HIGH);
    }
    if  (payload[1] == 'F')
    {
      digitalWrite(22, LOW);
    }
  }
}

//-----------------------------------------
//------------   RECONNECT  ---------------
//-----------------------------------------
void reconnect()
{
  // Loop hasta que hay reconexion
  while (!client.connected())
  {
    Serial.println("Intentando Conexión MQTT...");

    //Creamos un cliente ID
    String clientId = "Iot-ESP32";
    clientId += String(random(0xfff),HEX);
    //Se intenta la conexion
    if  (client.connect(clientId.c_str()))
    {
      Serial.println("Conectado!");
      if(client.subscribe(AlvTk))
      {
        Serial.println("Suscripcion a IoT/AlvTk: OK");
      }
      else
      {
        Serial.println("Fallo Suscripcion a IoT/AlvTk");
      }

      if(client.subscribe(OnC1))
      {
        Serial.println("Suscripcion a IoT/OnC1: OK");
      }
      else
      {
        Serial.println("Fallo Suscripcion a IoT/OnC1");
      }

      if(client.subscribe(OffC1))
      {
        Serial.println("Suscripcion a IoT/OffC1: OK");
      }
      else
      {
        Serial.println("Fallo Suscripcion a IoT/OffC1");
      }

      if(client.subscribe(OnC2))
      {
        Serial.println("Suscripcion a IoT/OnC2: OK");
      }
      else
      {
        Serial.println("Fallo Suscripcion a IoT/OnC2");
      }

      if(client.subscribe(OffC2))
      {
        Serial.println("Suscripcion a IoT/OffC2: OK");
      }
      else
      {
        Serial.println("Fallo Suscripcion a IoT/OffC2");
      }
      client.subscribe("inTopic");
    }
    else
    {
      Serial.print("Error de conexion MQTT");
      Serial.print(client.state());
      Serial.println("Intentando de nuevo en 5s");
      delay(5000);
    }
  }
}

//-----------------------------------------
//------------   SETUP_WIFI  ----------------
//-----------------------------------------
void setup_wifi()
{
  delay(10);
  //Se realiza conexion a red WiFI
  Serial.println();
  Serial.print("Conectando a red: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Conectado a red WiFi!");
  Serial.println("Direccion IP: ");
  Serial.println(WiFi.localIP());
}




