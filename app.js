const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSyQFnRpxoLtmmado9nrE2CKlA7rfjNkaYCf5WgqQBwLoAXa2ZL4-RCL6Fqy12zaDXUGrOx2cUEDMOz/pub?gid=473122804&single=true&output=csv";

const statusElement = document.getElementById("status");
const eventsElement = document.getElementById("events");

function sichererText(wert) {
  const element = document.createElement("div");
  element.textContent = wert || "";
  return element.innerHTML;
}

Papa.parse(CSV_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function (results) {
    console.log("Spalten:", results.meta.fields);
    console.log("Daten:", results.data);
    console.log("Fehler:", results.errors);

    const events = results.data.filter(event => {
      return event.titel && event.titel.trim() !== "";
    });

    if (events.length === 0) {
      statusElement.innerHTML = `
        <strong>Keine Veranstaltungen gefunden.</strong>
        <p>
          Prüfe bitte, ob die Überschrift der Titelspalte exakt
          <code>titel</code> lautet.
        </p>
      `;
      return;
    }

    statusElement.textContent =
      `${events.length} Veranstaltungen gefunden`;

    eventsElement.innerHTML = "";

    events.forEach(event => {
      const eventElement = document.createElement("article");
      eventElement.className = "event";

      eventElement.innerHTML = `
        <div class="event-time">
          ${sichererText(event.tag)}
          ·
          ${sichererText(event.uhrzeit)}
        </div>

        <h3>${sichererText(event.titel)}</h3>

        ${
          event.ort
            ? `<p>📍 ${sichererText(event.ort)}</p>`
            : ""
        }

        ${
          event.preis
            ? `<p>💶 ${sichererText(event.preis)}</p>`
            : ""
        }

        ${
          event.beschreibung
            ? `<p>${sichererText(event.beschreibung)}</p>`
            : ""
        }

        ${
          event.kategorie
            ? `<span class="tag">${sichererText(event.kategorie)}</span>`
            : ""
        }
      `;

      eventsElement.appendChild(eventElement);
    });
  },

  error: function (error) {
    console.error(error);

    statusElement.innerHTML = `
      <strong>Das Google Sheet konnte nicht geladen werden.</strong>
      <p>
        Prüfe, ob das Blatt „Events“ weiterhin im Web veröffentlicht ist.
      </p>
    `;
  }
});
