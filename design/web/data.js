/* Design inventory. US IDs refer to develop 89470fc, not the earlier mobile numbering. */
(() => {
  const originals = window.UPC_MOCKUP_INVENTORY.screens;
  const groups = {
    '01': [1,3,4], '02': [2,6], '03': [15,16,17,18,19], '04': [21,22],
    '05': [20,23,24,27,28,29], '06': [11,12,13,43], '07': [7,8,9,10,11,14],
    '08': [7,8], '09': [31,32], '10': [29,30,32,42], '11': [27,33,34,35],
    '12': [36,37], '13': [25,26,35,38,39], '14': [5,40,41,42,43,44],
    '15': [49], '16': [50], '17': [48]
  };
  const extras = [
    ['W-03e','Resultados ordenados por precio'], ['W-03f','Catálogo sin publicaciones'], ['W-03g','Resultados con filtros aplicados'],
    ['W-01b','Iniciar sesión'], ['W-01c','Credenciales incorrectas'],
    ['W-01d','Recuperar contraseña'], ['W-01e','Correo sin cuenta'],
    ['W-01f','Enlace enviado'], ['W-01g','Nueva contraseña'],
    ['W-01h','Enlace vencido'], ['W-01i','Contraseña actualizada'], ['W-01j','Contraseñas no coinciden'],
    ['W-02d','Cuenta pendiente de verificación'],
    ['W-05d','Reportar publicación'], ['W-05e','Reporte recibido'], ['W-05f','Reporte incompleto'],
    ['W-06d','Marcar como vendido'], ['W-06e','Publicación pausada'],
    ['W-06f','Publicación reactivada'], ['W-06g','Reserva confirmada'],
    ['W-07d','Oferta continua'], ['W-07e','Error al cargar fotografías'],
    ['W-08b','Previsualizar oferta continua'], ['W-08c','Oferta continua publicada'], ['W-06h','Administrar oferta continua'],
    ['W-10b','Datos de cobro compartidos'], ['W-10c','Conversación de la vendedora'],
    ['W-13e','Registrar inasistencia'], ['W-13f','Inasistencia registrada'],
    ['W-13g','Cancelación notificada'], ['W-13h','Cancelación recibida por la contraparte'],
    ['W-13i','Encuentro cancelado'], ['W-13j','Calificar al comprador'], ['W-13k','Confirmación de la vendedora'],
    ['W-14e','Datos de cobro'], ['W-14f','Número de cobro inválido'],
    ['W-14g','Preferencias guardadas'], ['W-14h','Datos de perfil incompletos'],
    ['W-14i','Publicaciones vendidas'], ['W-14j','Mi reputación'],
    ['W-15','Centro de ayuda'], ['W-16','Contactar soporte'],
    ['W-16a','Formulario de soporte incompleto'], ['W-16b','Solicitud recibida'],
    ['W-17','Términos y privacidad']
  ];
  const screens = originals.map(s => ({id:s.id.replace('M-','W-'), mobile:s.id, title:s.title, variant:!!s.variant}));
  extras.forEach(([id,title])=>screens.push({id,title,mobile:null,variant:/[a-z]$/.test(id)}));
  screens.forEach(s=>{
    s.base=s.id.slice(0,4); s.stories=groups[s.id.slice(2,4)].map(n=>'US'+String(n).padStart(2,'0'));
    s.persona=/^W-(06|07|08|14)|^W-12[bd]$|^W-13[jhk]$|^W-11c$|^W-10[bc]$/.test(s.id)?'Camila Rojas · vendedora':'Sebastián Torres · comprador';
    s.file=s.id+'-desktop.png'; s.responsiveFile=s.id+'-mobile.png';
  });
  screens.sort((a,b)=>a.id.localeCompare(b.id));
  screens.find(s=>s.id==='W-10').title='Conversación con Camila';
  screens.find(s=>s.id==='W-04b').title='Aviso quitado de Guardados';
  // A route is explicit: adjacent nodes name the action or event that connects them.
  const flows = [
    {id:'UG-01',title:'Acceder y recuperar la cuenta',persona:'Camila Rojas y Sebastián Torres',goal:'Ingresar con una cuenta institucional verificada y recuperar el acceso cuando sea necesario.',rows:[
      ['Registro',['W-01','W-02','W-02c','W-03'],['Enviar código','Verificar código válido','Entrar al catálogo']],
      ['Correo o código incorrecto',['W-01a','W-01','W-02a','W-02'],['Corregir correo','Enviar código; respuesta incorrecta','Corregir y volver a verificar']],
      ['Código vencido y restricciones',['W-02d','W-02b','W-02','W-02c'],['Completar verificación; código vencido','Solicitar otro código','Verificar el código nuevo']],
      ['Inicio de sesión',['W-01b','W-01c','W-01b','W-03'],['Credenciales incorrectas','Corregir credenciales','Credenciales correctas']],
      ['Recuperación',['W-01d','W-01f','W-01g','W-01i','W-01b'],['Solicitar enlace','Abrir enlace vigente en correo','Guardar contraseña válida','Volver al ingreso']],
      ['Recuperación alternativa',['W-01e','W-01d','W-01h','W-01f'],['Corregir dirección','Enlace abierto fuera de vigencia','Solicitar otro enlace']],
      ['Contraseña no coincidente',['W-01g','W-01j','W-01i'],['Guardar contraseñas distintas','Corregir y guardar']]
    ]},
    {id:'UG-02',title:'Encontrar y contactar una oferta',persona:'Sebastián Torres · comprador',goal:'Encontrar una oferta por campus y precio, evaluar a su autor y abrir el chat correcto.',rows:[
      ['Explorar y contactar',['W-03','W-03a','W-03g','W-05','W-10'],['Seleccionar filtros','Aplicar filtros','Abrir calculadora','Contactar a Camila']],
      ['Orden por precio',['W-03','W-03e','W-05'],['Precio menor a mayor; aplicar orden','Abrir calculadora']],
      ['Catálogo vacío',['W-03f','W-07'],['Publicar el primer aviso']],
      ['Sin resultados',['W-03a','W-03b','W-03'],['Aplicar rango sin coincidencias','Limpiar filtros']],
      ['Error de red',['W-03d','W-03c','W-03'],['Reintentar','Carga correcta']],
      ['Disponibilidad y reputación',['W-05a','W-03','W-05b','W-03'],['Volver: reservado','Abrir enlace retirado','Explorar otra oferta']],
      ['Evaluar a la contraparte',['W-05','W-05c','W-05','W-10'],['Ver perfil público','Volver al aviso','Contactar']]
    ]},
    {id:'UG-03',title:'Publicar y administrar avisos',persona:'Camila Rojas · vendedora',goal:'Publicar una oferta con fotos y administrar su disponibilidad conservando el contexto.',rows:[
      ['Publicación',['W-07','W-07a','W-08','W-08a','W-06'],['Continuar','Previsualizar','Publicar','Ver mi aviso']],
      ['Validación y fotos',['W-07b','W-07','W-07e','W-07a'],['Corregir datos','Continuar; archivo rechazado','Elegir JPG o PNG válido']],
      ['Edición y oferta continua',['W-07c','W-06','W-07d','W-08b','W-08c','W-06h'],['Guardar cambios','Editar; activar oferta continua','Revisar disponibilidad recurrente','Publicar oferta continua','Ver disponibilidad recurrente']],
      ['Reserva',['W-06','W-06c','W-06g'],['Reservar','Seleccionar conversación de Sebastián y confirmar']],
      ['Pausa y reactivación',['W-14a','W-06e','W-06f','W-06'],['Pausar publicación','Reactivar mismo aviso','Ver publicación']],
      ['Venta y retirada',['W-06d','W-14i','W-06a','W-06b'],['Confirmar vendido','Abrir otro aviso; retirar','Confirmar retirada']]
    ]},
    {id:'UG-04',title:'Coordinar, documentar y cerrar la entrega',persona:'Sebastián Torres y Camila Rojas · dos perspectivas',goal:'Acordar el encuentro, compartir evidencia opcional y cerrar con la confirmación de ambos.',rows:[
      ['Encuentro',['W-10','W-11','W-11c','W-11b'],['Proponer encuentro','Enviar propuesta; Camila revisa','Camila acepta']],
      ['Campus y mensaje fallido',['W-11a','W-11','W-10a','W-10'],['Corregir campus','Volver al chat; envío falla','Reintentar mensaje']],
      ['Datos de cobro y evidencia opcional',['W-10b','W-12','W-12a','W-12d','W-12b'],['Sebastián paga externamente; adjunta','Compartir captura','Camila abre evidencia','Camila declara recepción']],
      ['Discrepancia',['W-12d','W-12c','W-12','W-12a'],['No reconozco el pago','Aclarar y corregir captura','Compartir nueva evidencia']],
      ['Cierre bilateral',['W-13','W-13a','W-13k','W-13b','W-13d'],['Sebastián confirma entrega','Cambiar perspectiva: Camila revisa','Camila confirma; Sebastián puede calificar','Enviar reseña de Camila']],
      ['Valoración del comprador',['W-13a','W-13j','W-14j'],['Ambos confirman; Camila califica','Enviar valoración de Sebastián']],
      ['Cancelación notificada',['W-13c','W-13g','W-13h','W-13i'],['Confirmar cancelación','Camila recibe notificación','Consultar cancelación']],
      ['Volver sin cancelar',['W-13c','W-13'],['Cerrar confirmación y conservar encuentro']]
    ]},
    {id:'UG-05',title:'Guardar y recuperar avisos',persona:'Sebastián Torres · comprador',goal:'Conservar ofertas de interés sin reservarlas ni modificar su disponibilidad.',rows:[
      ['Guardar y abrir',['W-05','W-04','W-05','W-10'],['Guardar; abrir Guardados','Abrir calculadora','Contactar a Camila']],
      ['Quitar y deshacer',['W-04','W-04b','W-04'],['Quitar de Guardados','Deshacer']],
      ['Lista vacía',['W-04a','W-03','W-05a'],['Explorar avisos','Abrir oferta reservada']]
    ]},
    {id:'UG-06',title:'Gestionar perfil, actividad y cobro',persona:'Camila Rojas y Sebastián Torres',goal:'Mantener los datos propios, revisar actividad y reputación y cerrar la sesión.',rows:[
      ['Perfil y validación',['W-14','W-14c','W-14h','W-14g'],['Editar perfil','Guardar con nombre vacío','Corregir y guardar']],
      ['Datos de cobro',['W-14e','W-14f','W-14e','W-10b'],['Guardar número incompleto','Corregir número','Guardar; compartir en chat']],
      ['Actividad y reputación',['W-14','W-14b','W-14j','W-14a'],['Consultar historial','Volver a Perfil; ver reputación','Volver a Perfil; mis publicaciones']],
      ['Sesión',['W-14','W-14d','W-01b'],['Cerrar sesión','Confirmar salida']],
      ['Conservar sesión',['W-14d','W-14'],['Volver al perfil sin cerrar']]
    ]},
    {id:'UG-07',title:'Comunicar una irregularidad',persona:'Camila Rojas y Sebastián Torres',goal:'Reportar una publicación indebida o declarar una inasistencia con contexto y sin sanciones automáticas.',rows:[
      ['Reporte de aviso',['W-05','W-05d','W-05e','W-03'],['Reportar publicación','Enviar motivo y descripción','Volver al catálogo']],
      ['Corregir reporte',['W-05f','W-05d','W-05e'],['Completar motivo y descripción','Enviar reporte']],
      ['Inasistencia',['W-13','W-13e','W-13f','W-14b'],['No se presentó','Registrar declaración','Consultar historial']]
    ]},
    {id:'UG-08',title:'Consultar ayuda y contactar soporte',persona:'Visitante, Camila Rojas o Sebastián Torres',goal:'Comprender las reglas y solicitar ayuda por un canal identificado.',rows:[
      ['Ayuda y condiciones',['W-15','W-17','W-15'],['Consultar términos y privacidad','Volver a Ayuda']],
      ['Contacto',['W-15','W-16','W-16b','W-15'],['Contactar soporte','Enviar solicitud completa','Volver a Ayuda']],
      ['Formulario incompleto',['W-16a','W-16','W-16b'],['Corregir campos indicados','Enviar solicitud']]
    ]}
  ];
  const storyScreens = {
    US01:['W-01','W-01a'],US02:['W-02','W-02a','W-02b','W-02c'],US03:['W-01b','W-01c'],
    US04:['W-01d','W-01e','W-01f','W-01g','W-01h','W-01i','W-01j'],US05:['W-14d','W-01b'],US06:['W-02d'],
    US07:['W-07','W-08','W-08a'],US08:['W-07a','W-07e'],US09:['W-07'],US10:['W-07','W-07b'],
    US11:['W-07c','W-06'],US12:['W-06d','W-14i'],US13:['W-06a','W-06b'],US14:['W-07d','W-08b','W-08c','W-06h'],
    US15:['W-03','W-03c','W-03d','W-03f'],US16:['W-03','W-03b'],US17:['W-03a','W-03g'],US18:['W-03a','W-03g'],US19:['W-03e'],
    US20:['W-05','W-05a','W-05b'],US21:['W-05','W-04','W-04a'],US22:['W-04b','W-04'],
    US23:['W-05','W-05c'],US24:['W-05c'],US25:['W-13b','W-13d'],US26:['W-13j'],US27:['W-05','W-11','W-11a'],
    US28:['W-05d','W-05e','W-05f'],US29:['W-05','W-10'],US30:['W-10','W-10a','W-10c'],US31:['W-09','W-09a'],US32:['W-09','W-10'],
    US33:['W-11','W-11a','W-11c','W-11b'],US34:['W-11','W-11c'],US35:['W-13c','W-13g','W-13h','W-13i'],
    US36:['W-12','W-12a'],US37:['W-12d','W-12b','W-12c'],US38:['W-13','W-13a','W-13k','W-13b'],US39:['W-13e','W-13f'],
    US40:['W-14b'],US41:['W-14c','W-14h','W-14g'],US42:['W-14e','W-14f','W-14g','W-10b'],US43:['W-14a','W-14i','W-06e','W-06f'],US44:['W-14j'],
    US48:['W-17'],US49:['W-15'],US50:['W-16','W-16a','W-16b']
  };
  // Group-level IDs above are replaced by evidence-specific associations.
  screens.forEach(s=>s.stories=Object.entries(storyScreens).filter(([,ids])=>ids.includes(s.id)).map(([story])=>story));
  window.UPC_WEB = {product:'UPC-X',sourceCommit:'89470fc653f4359af11583393d9c86ea55b9152b',screens,flows,storyScreens};
})();
