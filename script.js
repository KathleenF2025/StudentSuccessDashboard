let classes = [];

function addClass() {
    let name = document.getElementById("className").value;
    let grade = parseFloat(document.getElementById("classGrade").value);

    if (name === "" || isNaN(grade)) {
        alert("Please enter a valid class and grade.");
        return;
    }

    classes.push({ name: name, grade: grade });

    displayClasses();

    document.getElementById("className").value = "";
    document.getElementById("classGrade").value = "";
}

function displayClasses() {
    let list = document.getElementById("classList");
    list.innerHTML = "";

    for (let i = 0; i < classes.length; i++) {
        let li = document.createElement("li");
        li.textContent = classes[i].name + " - " + classes[i].grade;
        list.appendChild(li);
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

    // Simple GPA scale
    let gpa = (average / 100) * 4;

    document.getElementById("gpaDisplay").textContent = gpa.toFixed(2);
}
