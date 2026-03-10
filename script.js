let classes = [];

function addClass() {
    let nameInput = document.getElementById("className");
    let gradeInput = document.getElementById("classGrade");

    let name = nameInput.value.trim();
    let grade = parseFloat(gradeInput.value);

    if (name === "" || isNaN(grade) || grade < 0 || grade > 100) {
        alert("Enter a valid class and grade (0–100).");
        return;
    }

    name = name
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    classes.push({ name, grade });

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

    classes.forEach((cls, index) => {

        let classCell = document.createElement("th");
        classCell.textContent = cls.name;

        let gradeCell = document.createElement("td");
        gradeCell.textContent = cls.grade;

        let deleteCell = document.createElement("td");
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", function () {
            deleteClass(index);
        });

        deleteCell.appendChild(deleteBtn);

        classRow.appendChild(classCell);
        gradeRow.appendChild(gradeCell);
        deleteRow.appendChild(deleteCell);
    });

    updateDropdown();
}

function calculateGPA() {
    let gpaDisplay = document.getElementById("gpaDisplay");
    let gpaStatus = document.getElementById("gpaStatus");

    if (classes.length === 0) {
        gpaDisplay.textContent = "0.00";
        gpaStatus.textContent = "";
        gpaDisplay.className = "";
        return;
    }

    let total = 0;
    classes.forEach(cls => total += cls.grade);

    let average = total / classes.length;
    let gpa = (average / 100) * 4;

    gpaDisplay.textContent = gpa.toFixed(2);

    // Remove previous color classes
    gpaDisplay.classList.remove("low-gpa", "mid-gpa", "high-gpa");

    if (gpa < 2.5) {
        gpaDisplay.classList.add("low-gpa");
        gpaStatus.textContent = "Academic Warning";
    } else if (gpa < 3.5) {
        gpaDisplay.classList.add("mid-gpa");
        gpaStatus.textContent = "Good Standing";
    } else {
        gpaDisplay.classList.add("high-gpa");
        gpaStatus.textContent = "Honor Roll Level";
    }
}

function updateDropdown() {
    let dropdown = document.getElementById("whatIfClass");
    dropdown.innerHTML = "";

    classes.forEach((cls, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = cls.name;
        dropdown.appendChild(option);
    });
}

function simulateGPA() {
    if (classes.length === 0) {
        alert("Add classes first.");
        return;
    }

    let selectedIndex = document.getElementById("whatIfClass").value;
    let newGrade = parseFloat(document.getElementById("whatIfGrade").value);

    if (isNaN(newGrade) || newGrade < 0 || newGrade > 100) {
        alert("Enter a valid grade between 0 and 100.");
        return;
    }

    let total = 0;

    classes.forEach((cls, index) => {
        if (index == selectedIndex) {
            total += newGrade;
        } else {
            total += cls.grade;
        }
    });

    let average = total / classes.length;
    let gpa = (average / 100) * 4;

    document.getElementById("simulatedGPA").textContent =
        "Simulated GPA: " + gpa.toFixed(2);
}
