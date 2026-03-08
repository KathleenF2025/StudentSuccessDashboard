let classes = [];

function addClass() {
    let nameInput = document.getElementById("className");
    let gradeInput = document.getElementById("classGrade");

    let name = nameInput.value.trim();
    let grade = parseFloat(gradeInput.value);

    // Validation
    if (name === "" || isNaN(grade) || grade < 0 || grade > 100) {
        alert("Please enter a valid class name and a grade between 0 and 100.");
        return;
    }

    // Capitalize first letter of every word
    name = name
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    classes.push({ name: name, grade: grade });

    displayClasses();

    // Clear inputs
    nameInput.value = "";
    gradeInput.value = "";
}

function displayClasses() {
    let classRow = document.getElementById("classRow");
    let gradeRow = document.getElementById("gradeRow");

    classRow.innerHTML = "";
    gradeRow.innerHTML = "";

    for (let i = 0; i < classes.length; i++) {
        let classCell = document.createElement("th");
        classCell.textContent = classes[i].name;

        let gradeCell = document.createElement("td");
        gradeCell.textContent = classes[i].grade;

        classRow.appendChild(classCell);
        gradeRow.appendChild(gradeCell);
    }
}

function calculateGPA() {
    if (classes.length === 0) {
        alert("Add at least one class.");
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
