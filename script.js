let classes = [];

function addClass() {
    let nameInput = document.getElementById("className");
    let gradeInput = document.getElementById("classGrade");

    let name = nameInput.value.trim();
    let grade = parseFloat(gradeInput.value);

    if (name === "" || isNaN(grade) || grade < 0 || grade > 100) {
        alert("Please enter a valid class name and a grade between 0 and 100.");
        return;
    }

    // Capitalize each word
    name = name
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    classes.push({ name: name, grade: grade });

    displayClasses();
    calculateGPA();

    nameInput.value = "";
    gradeInput.value = "";
}

function deleteClass(index) {
    classes.splice(index, 1);
    displayClasses();
    calculateGPA();
}

function displayClasses() {
    let classRow = document.getElementById("classRow");
    let gradeRow = document.getElementById("gradeRow");
    let deleteRow = document.getElementById("deleteRow");

    classRow.innerHTML = "";
    gradeRow.innerHTML = "";
    deleteRow.innerHTML = "";

    for (let i = 0; i < classes.length; i++) {

        // Class name
        let classCell = document.createElement("th");
        classCell.textContent = classes[i].name;

        // Grade
        let gradeCell = document.createElement("td");
        gradeCell.textContent = classes[i].grade;

        // Delete button
        let deleteCell = document.createElement("td");
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = function() {
            deleteClass(i);
        };

        deleteCell.appendChild(deleteBtn);

        classRow.appendChild(classCell);
        gradeRow.appendChild(gradeCell);
        deleteRow.appendChild(deleteCell);
    }
}

function calculateGPA() {
    if (classes.length === 0) {
        document.getElementById("gpaDisplay").textContent = "0.00";
        return;
    }

    let total = 0;

    for (let i = 0; i < classes.length; i++) {
        total += classes[i].grade;
    }

    let average = total / classes.length;
    let gpa = (average / 100) * 4;

    document.getElementById("gpaDisplay").textContent = gpa.toFixed(2);
}
