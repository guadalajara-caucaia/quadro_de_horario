const subjectColors = {};
const colorPalette = [
    '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF',
    '#FFC8DD', '#FFD8BE', '#FFFAC0', '#D4F0C0', '#B0E0E6', '#B4D8E7', '#C6D8FF', '#E1D4FF'
];

function getUniqueSubjects(allocations) {
    const allSubjects = new Set([""]); // Start with empty option
    for (const grade in allocations) {
        for (const subject in allocations[grade]) {
            allSubjects.add(subject);
        }
    }
    return [...allSubjects].sort();
}

function assignSubjectColors(subjects) {
    let colorIndex = 0;
    // Clear existing colors
    for (const key in subjectColors) {
        delete subjectColors[key];
    }
    subjects.forEach(subject => {
        if (subject) {
            subjectColors[subject] = colorPalette[colorIndex % colorPalette.length];
            colorIndex++;
        }
    });
}

const classAllocations = {
    "6º Ano - Manhã": { "Port./Interp.Textual/Bruna": 2, "Port./Gramática/Bruna": 2, "Port./Redação/Bruna": 2, "Artes/Josué": 1, "Educ. Física/René": 2, "Mat./Álgebra/Lucas": 3, "Filosofia/Ednar Lima": 1, "Mat./Geom./Lucas": 2, "História/Diógenes": 2, "Sócio. Emocional/Bruna": 1, "Geografia/André": 2, "Ciências/Amon-rá": 2, "Inglês/Raul": 2, },
    "7º Ano - Manhã": { "Inglês/Tiago": 2, "Mat./Álgebra/Lucas": 3, "História/Diógenes": 2, "Port./Redação/Bruna": 1, "Port./Gramática/Bruna": 2, "Ciências/Amon-rá": 3, "Port./Interp.Textual/Bruna": 3, "Educ. Física/René": 2, "Sócio. Emocional/Bruna": 1, "Filosofia/Josué": 1, "Mat./Geom./Lucas": 1, "Geografia/André": 2, "Artes/Josué": 1, },
    "8º Ano - Manhã": { "Inglês/Tiago": 2, "Química/Amon": 2, "Física/Anderson": 2, "Mat./Álgebra/Lucas": 2, "Geografia/André": 3, "Educ. Física/René": 1, "Ciências/Amon-rá": 2, "Sócio. Emocional/Bruna": 1, "História/Diógenes": 3, "Mat./Geom./Lucas": 1, "Filosofia/Josué": 1, "Port./Interp.Textual/Bruna": 2, "Port./Gramática/Bruna": 1, "Artes/Josué": 1, },
    "9º Ano - Manhã": { "Geografia/André": 2, "Inglês/Tiago": 2, "Mat./Geom./Gustavo": 1, "Mat./Geometria/Gustavo": 2, "Filosofia/Josué": 1, "Port./Interp.Textual/Bruna": 2, "Química/Amon": 2, "Educ. Física/René": 2, "Mat./Álgebra/Gustavo": 3, "História/Diógenes": 1, "Biologia/Amanda": 2, "Física/Anderson": 2, "Port./Gramática/Bruna": 1, "Port./Redação/Bruna": 2, "Sócio. Emocional/Bruna": 1, "Port./Geografia": 1, },
    "1º Ano - Manhã": { "Química/Amon": 3, "Port./Literatura/Marcos": 1, "Física/Anderson": 3, "Biologia/Amanda": 3, "História/Hiago": 2, "Mat./Álgebra/Gustavo": 3, "Educ.Física/Renê": 2, "Artes/Proj.deVida/Josué": 1, "Mat./Geometria/Gustavo": 2, "Port./Interp.Textual/Marcos": 1, "Inglês/Tiago": 2, "Port./Gramática/Marcos": 2, "Port./Redação/Marcos": 2, "Geografia/André": 2, "Filosofia/Socio./Josué": 1, },
    "2º Ano - Manhã": { "Mat./Álgebra/Gustavo": 3, "Educ.Física/Renê": 2, "Biologia/Amanda": 3, "Mat./Geometria/Gustavo": 2, "Química/Amon": 3, "Física/Anderson": 3, "Filosofia/Socio./Josué": 1, "Port./Gramática/Marcos": 2, "Geografia/André": 2, "Port./Redação/Marcos": 2, "História/Hiago": 2, "Inglês/Tiago": 2, "Port./Interp.Textual/Marcos": 1, "Artes/Proj.deVida/Josué": 1, "Port./Literatura/Marcos": 1, },
    "3º Ano - Manhã": { "Artes/Proj.deVida/Josué": 1, "Física/Anderson": 3, "Port./Redação/Marcos": 2, "Química/Amon": 3, "Port./Interp.Textual/Marcos": 1, "Geografia/André": 2, "Port./Literatura/Marcos": 1, "História/Hiago": 2, "Biologia/Amanda": 3, "Mat./Geometria/Gustavo": 2, "Mat./Álgebra/Gustavo": 3, "Filosofia/Josué": 2, "Port./Gramática/Marcos": 2, "Educ.Física/Renê": 1, "Inglês/Tiago": 2, },
    "6º Ano - Tarde": { "Ciências/Amon-rá": 2, "Mat./Álgebra/Gustavo": 3, "Filosofia/Ednar Lima": 1, "Mat./Geometria/Gustavo": 2, "Geografia/André": 2, "Inglês/Tiago": 2, "Socioemocional/Arielle": 1, "Port./Redação/Arielle": 2, "História/Diógenes": 2, "Port./Gramática/Arielle": 2, "Educ.Física/Renê": 2, "Port./Int.Textual/Arielle": 2, "Artes/Josué": 1, },
    "7º Ano - Tarde": {},
    "8º Ano - Tarde": { "Inglês/Tiago": 2, "Port./Int.Textual/Arielle": 2, "Mat./Álgebra/Gustavo": 3, "Química/Amon": 2, "História/Diógenes": 2, "Ciências/Amon-rá": 2, "Física/Anderson": 2, "Mat./Geometria/Gustavo": 2, "Educ.Física/Renê": 2, "Artes/Josué": 1, "Geografia/André": 2, "Socioemocional/Arielle": 1, "Port./Redação/Arielle": 2, "Port./Gramática/Arielle": 2, "Filosofia/Josué": 1, },
    "9º Ano - Tarde": {},
};

document.addEventListener('DOMContentLoaded', () => {
    // Title Persistence
    const editableTitles = document.querySelectorAll('[contenteditable="true"]');

    function saveTitles() {
        const titles = {};
        editableTitles.forEach(el => {
            titles[el.id] = el.textContent;
        });
        localStorage.setItem('scheduleTitles', JSON.stringify(titles));
    }

    function loadTitles() {
        const savedTitles = JSON.parse(localStorage.getItem('scheduleTitles'));
        if (savedTitles) {
            editableTitles.forEach(el => {
                if (savedTitles[el.id]) {
                    el.textContent = savedTitles[el.id];
                }
            });
        }
    }

    editableTitles.forEach(el => {
        el.addEventListener('blur', saveTitles);
    });

    loadTitles();


    let currentAllocations = loadAllocations();
    let uniqueSubjects = getUniqueSubjects(currentAllocations);
    assignSubjectColors(uniqueSubjects);

    const gradeSelects = new Map();

    function renderAllSchedules() {
        gradeSelects.clear();
        const gradeRows = document.querySelectorAll('tr[data-grade]');
        const savedSchedule = JSON.parse(localStorage.getItem('savedScheduleState')) || {};

        gradeRows.forEach((row, rowIndex) => {
            const gradeName = row.dataset.grade;
            if (!gradeSelects.has(gradeName)) {
                gradeSelects.set(gradeName, []);
            }
            const cells = row.querySelectorAll('.subject-cell');
            cells.forEach((cell, cellIndex) => {
                // Clear previous content
                cell.innerHTML = '';

                const select = document.createElement('select');
                const printableSpan = document.createElement('span');
                printableSpan.className = 'printable-subject';
                const initialSubject = cell.dataset.subject.replace(/\s\/\s/g, '/').trim();

                uniqueSubjects = getUniqueSubjects(currentAllocations);
                assignSubjectColors(uniqueSubjects);

                uniqueSubjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject;
                    option.textContent = subject || '---------';
                    select.appendChild(option);
                });

                const savedValueKey = `${gradeName}-${rowIndex}-${cellIndex}`;
                const savedValue = savedSchedule[savedValueKey];

                if (savedValue !== undefined) {
                    select.value = savedValue;
                    printableSpan.textContent = savedValue;
                } else {
                    select.value = initialSubject;
                    printableSpan.textContent = initialSubject;
                }

                select.addEventListener('change', () => {
                    printableSpan.textContent = select.value;
                    applyCellColor(cell, select.value);
                    updateGradeSelects(gradeName);
                });

                cell.appendChild(select);
                cell.appendChild(printableSpan);
                gradeSelects.get(gradeName).push(select);
                applyCellColor(cell, initialSubject);
            });
        });

        for (const [gradeName, selects] of gradeSelects.entries()) {
            updateGradeSelects(gradeName);
        }
        highlightLastClasses();
    }

    function applyCellColor(targetCell, subject) {
        if (subject && subjectColors[subject]) {
            targetCell.style.backgroundColor = subjectColors[subject];
        } else {
            targetCell.style.backgroundColor = '';
        }
    }

    function updateGradeSelects(gradeName) {
        const selectsInGrade = gradeSelects.get(gradeName);
        const allocations = currentAllocations[gradeName] || {};
        const currentCounts = {};
        selectsInGrade.forEach(s => {
            if (s.value) {
                currentCounts[s.value] = (currentCounts[s.value] || 0) + 1;
            }
        });
        selectsInGrade.forEach(select => {
            for (const option of select.options) {
                if (!option.value) continue;
                const subject = option.value;
                const allocationCount = allocations[subject] || 99; // Allow unscheduled subjects to be added
                const currentCount = currentCounts[subject] || 0;
                if (subject === select.value) {
                    option.disabled = false;
                    continue;
                }
                if (currentCount >= allocationCount) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                }
            }
        });
    }

    function highlightLastClasses() {
        const allGradeRows = document.querySelectorAll('tr[data-grade]');
        const gradeRowGroups = {};
        allGradeRows.forEach(row => {
            const gradeName = row.dataset.grade;
            if (!gradeRowGroups[gradeName]) {
                gradeRowGroups[gradeName] = [];
            }
            gradeRowGroups[gradeName].push(row);
        });
        for (const gradeName in gradeRowGroups) {
            const rows = gradeRowGroups[gradeName];
            let lastClassRow = null;
            for (let i = rows.length - 1; i >= 0; i--) {
                if (!rows[i].querySelector('.intervalo')) {
                    lastClassRow = rows[i];
                    break;
                }
            }
            if (lastClassRow) {
                lastClassRow.classList.add('last-class-row');
            }
        }
    }

    // Initial Render
    renderAllSchedules();

    // --- Print Logic ---
    const printBtn = document.getElementById('print-btn');
    printBtn.addEventListener('click', () => {
        window.print();
    });

    // --- Schedule Save Logic ---
    const saveScheduleBtn = document.getElementById('save-schedule-btn');

    function saveSchedule() {
        const scheduleState = {};
        const rows = document.querySelectorAll('tr[data-grade]');
        rows.forEach((row, rowIndex) => {
            const gradeName = row.dataset.grade;
            const cells = row.querySelectorAll('.subject-cell');
            cells.forEach((cell, cellIndex) => {
                const select = cell.querySelector('select');
                if (select) {
                    const key = `${gradeName}-${rowIndex}-${cellIndex}`;
                    scheduleState[key] = select.value;
                }
            });
        });
        localStorage.setItem('savedScheduleState', JSON.stringify(scheduleState));
        alert('Horário salvo com sucesso!');
    }

    saveScheduleBtn.addEventListener('click', saveSchedule);


    // --- Modal & Management Logic ---
    const modal = document.getElementById('management-modal');
    const manageBtn = document.getElementById('manage-btn');
    const closeBtn = document.querySelector('.close-btn');
    const gradeSelect = document.getElementById('grade-select');
    const allocationsListDiv = document.getElementById('allocations-list');
    const allocationForm = document.getElementById('allocation-form');

    function loadAllocations() {
        const saved = localStorage.getItem('classAllocations');
        if (saved) {
            return JSON.parse(saved);
        }
        return classAllocations; // Default
    }

    function saveAllocations() {
        localStorage.setItem('classAllocations', JSON.stringify(currentAllocations));
    }

    function populateAllocationsList() {
        allocationsListDiv.innerHTML = '';
        const sortedGrades = Object.keys(currentAllocations).sort();
        for (const gradeName of sortedGrades) {
            const gradeDiv = document.createElement('div');
            gradeDiv.innerHTML = `<h4>${gradeName}</h4>`;
            const subjectList = document.createElement('ul');
            const subjectsInGrade = currentAllocations[gradeName];
            const sortedSubjects = Object.keys(subjectsInGrade).sort();
            for (const subject of sortedSubjects) {
                const count = subjectsInGrade[subject];
                const listItem = document.createElement('li');
                listItem.innerHTML = `<span>${subject}: ${count} aula(s)</span> <button class="delete-btn" data-grade="${gradeName}" data-subject="${subject}">Excluir</button>`;
                subjectList.appendChild(listItem);
            }
            gradeDiv.appendChild(subjectList);
            allocationsListDiv.appendChild(gradeDiv);
        }
    }

    allocationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const subjectInput = document.getElementById('subject-input');
        const grade = gradeSelect.value;
        const count = parseInt(document.getElementById('count-input').value, 10);
        const subject = subjectInput.value.trim();

        if (!subject || !grade || isNaN(count)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        if (!currentAllocations[grade]) {
            currentAllocations[grade] = {};
        }
        currentAllocations[grade][subject] = count;

        saveAllocations();
        populateAllocationsList(); // Refresh the list in the modal
        renderAllSchedules(); // Re-render the main timetable
        allocationForm.reset();
        subjectInput.focus();
    });

    allocationsListDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const grade = e.target.dataset.grade;
            const subject = e.target.dataset.subject;
            if (confirm(`Tem certeza que deseja excluir "${subject}" da turma "${grade}"?`)) {
                delete currentAllocations[grade][subject];
                saveAllocations();
                populateAllocationsList();
                renderAllSchedules();
            }
        }
    });

    const gradeNames = Object.keys(currentAllocations).sort();
    gradeSelect.innerHTML = '';
    gradeNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        gradeSelect.appendChild(option);
    });

    manageBtn.onclick = () => {
        populateAllocationsList();
        modal.style.display = 'block';
    };
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});
