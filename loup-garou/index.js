let players = [];
let assignments = [];
let currentPlayerIndex = 0;

function Addplayer() {
    const nameInput = document.getElementById("inputName");
    const name = nameInput.value.trim();
    if(players != name){
        if (name) {
            players.push(name);
            nameInput.value = '';
            updatePlayerList();
        }
        if (players.length >= 8) {
            document.getElementById("RoleSelection").classList.remove("hidden");
        }
    }
}

function updatePlayerList() {
    const playerList = document.getElementById("playerList");
    playerList.innerHTML = `<strong>Players (${players.length}):</strong> ${players.join(', ')}`;
}

function AssignDefaultRoles() {
    if (players.length < 8) {
        alert('Minimum 8 players required');
        return;
    }

    const roles = [
        "Witch", "Hunter", "Mayor", "Love King",
        ...Array(2).fill("Werewolf"),
        ...Array(players.length - 6).fill("Villager")
    ];

    const shuffledRoles = roles.sort(() => Math.random() - 0.5);
    assignments = players.map((player, index) => ({
        name: player,
        role: shuffledRoles[index]
    }));

    document.getElementById("card").classList.remove("hidden");
    currentPlayerIndex = 0;
    displayNextRole();
}

function assignCustomRoles() {
    if (players.length < 8) {
        alert("Minimum 8 players required.");
        return;
    }

    const witchCount = parseInt(document.getElementById("witch").value);
    const hunterCount = parseInt(document.getElementById("hunter").value);
    const mayorCount = parseInt(document.getElementById("mayor").value);
    const loveKingCount = parseInt(document.getElementById("loveKing").value);
    const werewolfCount = parseInt(document.getElementById("werewolf").value);
    const voyanteCount = parseInt(document.getElementById("voyante").value);
    const whitewolfCount = parseInt(document.getElementById("whitewolf").value);
    const bluewolfCount = parseInt(document.getElementById("bluewolf").value);
    const barbiCount = parseInt(document.getElementById("barbi").value);
    const healerCount = parseInt(document.getElementById("healer").value);
    const frogCount = parseInt(document.getElementById("frog").value);
    const alienCount = parseInt(document.getElementById("alien").value);

    const totalRoles = witchCount + hunterCount + mayorCount + loveKingCount + werewolfCount +
                      voyanteCount + whitewolfCount + bluewolfCount + barbiCount + healerCount + frogCount + alienCount;

    if (totalRoles > players.length) {
        alert("Total roles exceed the number of players.");
        return;
    }

    const roles = [
        ...Array(witchCount).fill("Witch"),
        ...Array(hunterCount).fill("Hunter"),
        ...Array(mayorCount).fill("Mayor"),
        ...Array(loveKingCount).fill("Love King"),
        ...Array(werewolfCount).fill("Werewolf"),
        ...Array(voyanteCount).fill("Voyante"),
        ...Array(whitewolfCount).fill("White Wolf"),
        ...Array(bluewolfCount).fill("Blue Wolf"),
        ...Array(barbiCount).fill("Barbi"),
        ...Array(healerCount).fill("Healer"),
        ...Array(frogCount).fill("Frog"),
        ...Array(alienCount).fill("Alien"),
        ...Array(players.length - totalRoles).fill("Villager")
    ];

    const shuffledRoles = roles.sort(() => Math.random() - 0.5);
    assignments = players.map((player, index) => ({
        name: player,
        role: shuffledRoles[index]
    }));

    document.getElementById("card").classList.remove("hidden");
    currentPlayerIndex = 0;
    displayNextRole();
}
let num_click = 0;
let num = 0;
function displayNextRole() {
    const roleDisplay = document.getElementById("roleDisplay");
    if(num_click % 2 === 0) {
        const player = assignments[currentPlayerIndex];
        roleDisplay.innerHTML = `Player: ${player.name}`;
    } else {
        const player = assignments[currentPlayerIndex];
        roleDisplay.innerHTML = `Role: ${player.role}`;
        currentPlayerIndex = (currentPlayerIndex + 1)% assignments.length;
    }
    num_click++;
}

document.addEventListener("DOMContentLoaded", () => {
    const card = document.getElementById("card");
    if (card) {
        card.addEventListener("click", displayNextRole);
    } else {
        console.error("Card element not found!");
    }
});
document.addEventListener('keydown',(e)=> {
    if(e.key === "Enter")
        Addplayer()
})
