function doPost(e) {
  try {
    const TOKEN_ESPERADO = "12345ABCDEF"; // Mismo token que en Cloud Run

    // Verifica si el token coincide
    const token_recibido = e?.headers?.["x-auth-token"];
    if (token_recibido !== TOKEN_ESPERADO) {
      throw new Error("Token no autorizado");
    }

    if (!e.postData || !e.postData.contents) {
      throw new Error("No se encontró contenido en postData");
    }

    const datos = JSON.parse(e.postData.contents);

    const nombre = datos.nombre_archivo || "Sin nombre";
    const tamaño = datos.tamaño || "Sin tamaño";
    const tipo = datos.tipo || "Sin tipo";

    // Hoja de cálculo destino
    const hoja = SpreadsheetApp.openById("1-dFOGduvCQLmF6Orz4i1lvVhnTUFme1_nXvViSmZVfc").getSheets()[0];

    // Insertar encabezados si es necesario
    if (hoja.getLastRow() === 0) {
      hoja.appendRow(["Nombre del archivo", "Tamaño (bytes)", "Tipo MIME", "Fecha"]);
    }

    // Insertar nueva fila con los datos
    hoja.appendRow([nombre, tamaño, tipo, new Date()]);

    // Enviar correo con GmailApp
    const destinatario = "yostinmndz56@gmail.com";
    const asunto = "Nuevo archivo subido";
    const mensaje = `Se ha subido el archivo:\n\n📄 Nombre: ${nombre}\n📦 Tamaño: ${tamaño} bytes\n📝 Tipo: ${tipo}`;
    GmailApp.sendEmail(destinatario, asunto, mensaje);

    return ContentService
      .createTextOutput("Datos recibidos correctamente")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    Logger.log("Error en doPost: " + error);
    return ContentService
      .createTextOutput("Error al procesar la solicitud")
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
