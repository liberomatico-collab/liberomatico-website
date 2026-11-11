# 📖 Guía de Administración: Roxana Store

Esta guía te permite gestionar todos los productos de la tienda usando una hoja de **Google Sheets** (Excel en Google Drive). Cualquier cambio que hagas en la hoja (precios, stock, nuevos productos) se reflejará automáticamente en la web **sin tocar código ni pagar servidores**.

---

## 1. Estructura de la Hoja de Google Sheets

Crea una hoja nueva en Google Sheets con exactamente estas **10 columnas** en la primera fila:

| id | nombre | categoria | precio | precio_regular | imagen | descripcion | disponible | badge | material |
|---|---|---|---|---|---|---|---|---|---|
| COL-01 | Collar Largo Círculos Dorados | collares | 45.00 | 55.00 | https://... | Elegante collar estilo corbatero... | Si | Más Vendido | Acero bañado en oro |
| BRA-01 | Brazalete Ancho Calado | brazaletes | 45.00 | 55.00 | https://... | Maxi brazalete rígido martillado... | Si | Top Ventas | Acero bañado en oro |
| COR-01 | Correas Gamuza Hebilla | correas | 40.00 | 50.00 | https://... | Correas anchas de gamuza suave... | Si | Promo 2x70 | Gamuza y metal |

### 📌 Reglas simples para el llenado:
- **`categoria`**: Escribe una de estas tres palabras en minúsculas: `collares`, `brazaletes` o `correas`.
- **`precio`**: Solo el número (ej. `45.00` o `45`), sin el símbolo de soles.
- **`disponible`**: Pon `Si` para que se pueda comprar. Si pones `No`, en la web aparecerá automáticamente como **"Agotado"** y se desactivará el botón de compra.
- **`badge`**: Texto opcional que sale como etiqueta en la foto (ej. `Nuevo`, `Más Vendido`, `Promo 2x70`, `Tendencia`). Si no deseas etiqueta, déjalo vacío.

---

## 2. Cómo publicar la hoja en 3 clics

Para que la web pueda leer tu hoja de cálculo:
1. En Google Sheets, ve al menú superior: **Archivo > Compartir > Publicar en la web**.
2. En la ventana emergente, cambia **"Página web"** por **"Valores separados por comas (.csv)"**.
3. Haz clic en el botón verde **"Publicar"**.
4. Copia el enlace que te genera (se ve algo como `https://docs.google.com/spreadsheets/d/e/.../pub?output=csv`).
5. Pega ese enlace en el archivo `assets/js/app.js` en la variable:
   ```javascript
   googleSheetCsvUrl: "PEGA_AQUÍ_TU_ENLACE_CSV"
   ```
¡Listo! A partir de ese momento, la web se actualiza sola cada vez que edites la hoja.

---

## 3. Dónde subir fotos de nuevos productos (Gratis y en 5 segundos)

Cuando Roxana Store reciba nueva mercadería y quiera agregar productos:
1. Entran a [Postimages.org](https://postimages.org/) (no requiere registro ni cuenta).
2. Suben la foto del nuevo producto desde su celular o laptop.
3. Copian el enlace que dice **"Enlace directo"** (termina en `.jpg` o `.png`).
4. Pegan ese enlace en la columna `imagen` de Google Sheets.

---

## 4. Cómo cambiar el número de WhatsApp

En el archivo `assets/js/app.js`:
```javascript
whatsappPhone: "51999999999", // Reemplazar por el número de WhatsApp de Roxana Store con código 51
```

---

## 5. Publicación en Internet (Hosting Gratis de por vida)

Puedes subir esta carpeta `web_catalogo` en 2 minutos a:
- **Vercel** ([vercel.com](https://vercel.com)): Creas cuenta gratis, arrastras la carpeta y listo.
- **Cloudflare Pages** ([pages.cloudflare.com](https://pages.cloudflare.com)): Arrastras la carpeta y conectas el dominio propio con SSL gratis.
- **Netlify** ([netlify.com](https://netlify.com)): Arrastras la carpeta a "Drop to deploy".

Cualquiera de estas tres opciones te da **hosting gratuito para siempre**, nunca se cae, y no requiere actualizaciones técnicas.
