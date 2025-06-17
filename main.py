import functions_framework
import logging
import json
import requests

# Configurar logging
logging.basicConfig(level=logging.INFO)

# Token secreto que ambos deben compartir
TOKEN_SECRETO = "12345ABCDEF"

# URL de tu script desplegado como Web App
URL_SCRIPT = "https://script.google.com/macros/s/AKfycbyyFz1A-fQW5Kh3RQ9TO3nZ16iY3j6QC5b_QcztXWG_OY2c6Irymw4nCANYjU7Zo7vq/exec"

@functions_framework.cloud_event
def registrar_metadatos(event):
    try:
        data = event.data
        logging.info("Evento recibido")

        if not data:
            raise ValueError("El evento no contiene datos")

        nombre = data.get("name", "No disponible")
        tamaño = data.get("size", "No disponible")
        tipo = data.get("contentType", "No disponible")

        logging.info(f"Archivo: {nombre}")
        logging.info(f"Tamaño: {tamaño}")
        logging.info(f"Tipo MIME: {tipo}")

        datos = {
            "nombre_archivo": nombre,
            "tamaño": tamaño,
            "tipo": tipo
        }

        # Enviar datos al Apps Script
        headers = {
            "Content-Type": "application/json",
            "X-Auth-Token": TOKEN_SECRETO
        }

        response = requests.post(URL_SCRIPT, json=datos, headers=headers)
        response.raise_for_status()
        logging.info("Respuesta de Apps Script: " + response.text)

    except Exception as e:
        logging.error("Error en la función", exc_info=True)
