document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("regForm");
  const nameInput = document.getElementById("name");
  const uidInput = document.getElementById("uid");
  const teamNameInput = document.getElementById("teamName");
  const teamMembersInput = document.getElementById("teamMembers");
  const msg = document.getElementById("msg");

  let currentUID = localStorage.getItem("currentUID");
  let players = JSON.parse(localStorage.getItem("players")) || [];

  if (currentUID) {
    const player = players.find(p => p.uid === currentUID);
    if (player) {
      nameInput.value = player.name;
      uidInput.value = player.uid;
      teamNameInput.value = player.teamName;
      teamMembersInput.value = player.teamMembers;
      uidInput.disabled = true;
      msg.textContent = "You have already registered. You can update your info.";
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const uid = uidInput.value.trim();
    const teamName = teamNameInput.value.trim();
    const teamMembers = teamMembersInput.value.trim();

    if (!name || !uid || !teamName || !teamMembers) {
      msg.textContent = "All fields are required.";
      return;
    }

    let playerIndex = players.findIndex(p => p.uid === uid);

    if (playerIndex !== -1) {
      players[playerIndex] = { name, uid, teamName, teamMembers };
      msg.textContent = "Information updated!";
    } else {
      players.push({ name, uid, teamName, teamMembers });
      msg.textContent = "Registered successfully!";
    }

    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("currentUID", uid);
  });
});