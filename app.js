const CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSyQFnRpxoLtmmado9nrE2CKlA7rfjNkaYCf5WgqQBwLoAXa2ZL4-RCL6Fqy12zaDXUGrOx2cUEDMOz/pub?gid=473122804&single=true&output=csv";

Papa.parse(CSV_URL, {
  download: true,
  header: true,

  complete: function(results) {

    const container = document.getElementById("events");

    container.innerHTML = "";

    results.data.forEach(event => {

      if (!event.titel) return;

      const div = document.createElement("div");
      div.className = "event";

      div.innerHTML = `
        <div class="time">
          ${event.tag || ""}
          ${event.uhrzeit || ""}
        </div>

        <h3>${event.titel}</h3>

        <p>📍 ${event.ort || ""}</p>

        <div class="tag">
          ${event.kategorie || ""}
        </div>
      `;

      container.appendChild(div);

    });
  }
});
