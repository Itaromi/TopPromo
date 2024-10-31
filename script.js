let students = [];

document.addEventListener("DOMContentLoaded", () => {
    // Charger les données JSON
    fetch("/data.json")
        .then(response => response.json())
        .then(data => {
            students = data;
            displayRanking();
        });
});

// Ajouter la moyenne d'un étudiant
function addStudentAverage() {
    const studentSelect = document.getElementById("student-select");
    const averageInput = document.getElementById("average-input");

    const selectedStudent = studentSelect.value;
    const average = parseFloat(averageInput.value);

    if (!selectedStudent || isNaN(average) || average < 0 || average > 20) {
        alert("Veuillez sélectionner un étudiant et entrer une moyenne valide entre 0 et 20.");
        return;
    }

    // Mettre à jour la moyenne de l'étudiant
    const student = students.find(s => s.prenom === selectedStudent);
    student.moyenne = average;

    // Réinitialiser les champs
    studentSelect.value = "";
    averageInput.value = "";

    // Mettre à jour l'affichage
    displayRanking();
}

// Afficher le classement des étudiants
function displayRanking() {
    const rankingList = document.getElementById("student-ranking");
    rankingList.innerHTML = "";

    // Trier les étudiants par moyenne (plus haute en premier)
    const sortedStudents = students
        .filter(student => student.moyenne !== null)
        .sort((a, b) => b.moyenne - a.moyenne);

    // Ajouter les étudiants triés au classement
    sortedStudents.forEach((student, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${student.prenom} - ${student.moyenne}/20`;
        rankingList.appendChild(listItem);
    });
}
