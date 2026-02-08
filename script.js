const startHour = 14;
const endHour = 24;
const interval = 30; // 分
const tables = ["A", "B", "C", "D", "半個室", "個室"];

const calendar = document.getElementById("calendar");
const cellsPerHour = 60 / interval;
const cellWidth = 60;

tables.forEach(table => {
  const row = document.createElement("div");
  row.className = "row";

  const label = document.createElement("div");
  label.className = "label";
  label.textContent = table;
  row.appendChild(label);

  const totalCells = (endHour - startHour) * cellsPerHour;
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    row.appendChild(cell);
  }

  row.addEventListener("mousedown", startReservation);
  row.addEventListener("touchstart", startReservation);

  calendar.appendChild(row);
});

let startX, currentRow, reservation;

function startReservation(e) {
  if (e.target.classList.contains("reservation")) return;

  startX = getX(e);
  currentRow = e.currentTarget;

  reservation = document.createElement("div");
  reservation.className = "reservation";
  reservation.style.left = (startX - currentRow.offsetLeft) + "px";
  reservation.style.width = "0px";
  reservation.textContent = "予約";

  currentRow.appendChild(reservation);

  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", end);
  document.addEventListener("touchmove", resize);
  document.addEventListener("touchend", end);
}

function resize(e) {
  const x = getX(e);
  reservation.style.width = (x - startX) + "px";
}

function end() {
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", end);
  document.removeEventListener("touchmove", resize);
  document.removeEventListener("touchend", end);
}

function getX(e) {
  return e.touches ? e.touches[0].clientX : e.clientX;
}
