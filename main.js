/**
 * @file main.js
 * @description This file contains all the client-side logic for the interactive timetable application.
 */

// --- Data Definitions ---

/**
 * A map of subject names to their assigned background colors.
 * This is populated dynamically.
 * @type {Object.<string, string>}
 */
const subjectColors = {};

/**
 * A palette of colors to be used for the subjects.
 * @type {string[]}
 */
const colorPalette = [
    '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF',
    '#FFC8DD', '#FFD8BE', '#FFFAC0', '#D4F0C0', '#B0E0E6', '#B4D8E7', '#C6D8FF', '#E1D4FF'
];

/**
 * The default class allocations. This is used if no data is found in localStorage.
 * Structure: { "Grade Name": { "Subject/Teacher": Number of Classes } }
 * @type {Object.<string, Object.<string, number>>}
 */
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


/**
 * Main application object to encapsulate all functionality.
 */
const App = {
    // --- Properties ---
    currentAllocations: {},
    uniqueSubjects: [],
    gradeSelects: new Map(),

    // --- Initialization ---
    init() {
        this.currentAllocations = this.loadData('classAllocations', classAllocations);
        this.initTitles();
        this.renderAllSchedules();
        this.initButtons();
        this.initModal();
    },

    /**
     * Initializes editable titles, loading from and saving to localStorage.
     */
    initTitles() {
        const editableTitles = document.querySelectorAll('[contenteditable="true"]');
        const savedTitles = this.loadData('scheduleTitles', {});

        editableTitles.forEach(el => {
            if (savedTitles[el.id]) {
                el.textContent = savedTitles[el.id];
            }
            el.addEventListener('blur', () => {
                const titles = {};
                editableTitles.forEach(el => { titles[el.id] = el.textContent; });
                this.saveData('scheduleTitles', titles);
            });
        });
    },

    /**
     * Initializes all main buttons on the page.
     */
    initButtons() {
        document.getElementById('print-btn').addEventListener('click', () => window.print());
        document.getElementById('save-schedule-btn').addEventListener('click', () => this.saveScheduleState());
    },

    /**
     * Initializes the management modal, including its form and event listeners.
     */
    initModal() {
        const modal = document.getElementById('management-modal');
        const manageBtn = document.getElementById('manage-btn');
        const closeBtn = document.querySelector('.close-btn');
        const gradeSelect = document.getElementById('grade-select');
        const allocationsListDiv = document.getElementById('allocations-list');
        const allocationForm = document.getElementById('allocation-form');

        // Open/close logic
        manageBtn.onclick = () => {
            this.populateAllocationsList();
            modal.style.display = 'block';
        };
        closeBtn.onclick = () => modal.style.display = 'none';
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };

        // Form submission logic
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

            if (!this.currentAllocations[grade]) this.currentAllocations[grade] = {};
            this.currentAllocations[grade][subject] = count;

            this.saveData('classAllocations', this.currentAllocations);
            this.populateAllocationsList();
            this.renderAllSchedules();
            allocationForm.reset();
            subjectInput.focus();
        });

        // Delete logic (event delegation)
        allocationsListDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                const grade = e.target.dataset.grade;
                const subject = e.target.dataset.subject;
                if (confirm(`Tem certeza que deseja excluir "${subject}" da turma "${grade}"?`)) {
                    delete this.currentAllocations[grade][subject];
                    this.saveData('classAllocations', this.currentAllocations);
                    this.populateAllocationsList();
                    this.renderAllSchedules();
                }
            }
        });
    },

    // --- Core Rendering & Logic ---

    /**
     * Main function to render the entire set of timetables.
     * It clears the existing tables and rebuilds them from the current state.
     */
    renderAllSchedules() {
        this.gradeSelects.clear();
        this.uniqueSubjects = this.getUniqueSubjects();
        this.assignSubjectColors();

        const gradeRows = document.querySelectorAll('tr[data-grade]');
        const savedSchedule = this.loadData('savedScheduleState', {});

        gradeRows.forEach((row, rowIndex) => {
            const gradeName = row.dataset.grade;
            if (!this.gradeSelects.has(gradeName)) {
                this.gradeSelects.set(gradeName, []);
            }
            const cells = row.querySelectorAll('.subject-cell');
            cells.forEach((cell, cellIndex) => {
                this.createCellSelect(cell, gradeName, rowIndex, cellIndex, savedSchedule);
            });
        });

        for (const gradeName of this.gradeSelects.keys()) {
            this.updateGradeSelects(gradeName);
        }
        this.highlightLastClasses();
        this.populateModalGradeSelect();
    },

    /**
     * Creates and configures a single select element for a timetable cell.
     */
    createCellSelect(cell, gradeName, rowIndex, cellIndex, savedSchedule) {
        cell.innerHTML = ''; // Clear previous content
        const select = document.createElement('select');
        const printableSpan = document.createElement('span');
        printableSpan.className = 'printable-subject';

        const initialSubject = cell.dataset.subject.replace(/\s\/\s/g, '/').trim();

        this.uniqueSubjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject || '---------';
            select.appendChild(option);
        });

        const savedValueKey = `${gradeName}-${rowIndex}-${cellIndex}`;
        const savedValue = savedSchedule[savedValueKey];

        select.value = (savedValue !== undefined) ? savedValue : initialSubject;
        printableSpan.textContent = select.value;

        select.addEventListener('change', () => {
            printableSpan.textContent = select.value;
            this.applyCellColor(cell, select.value);
            this.updateGradeSelects(gradeName);
        });

        cell.appendChild(select);
        cell.appendChild(printableSpan);
        this.gradeSelects.get(gradeName).push(select);
        this.applyCellColor(cell, select.value);
    },

    /**
     * Updates the enabled/disabled state of options in a grade's dropdowns based on allocations.
     */
    updateGradeSelects(gradeName) {
        const selectsInGrade = this.gradeSelects.get(gradeName);
        const allocations = this.currentAllocations[gradeName] || {};
        const currentCounts = {};
        selectsInGrade.forEach(s => {
            if (s.value) currentCounts[s.value] = (currentCounts[s.value] || 0) + 1;
        });

        selectsInGrade.forEach(select => {
            for (const option of select.options) {
                if (!option.value) continue;
                const subject = option.value;
                const allocationCount = allocations[subject] ?? 99; // Allow unscheduled subjects
                const currentCount = currentCounts[subject] || 0;

                option.disabled = (subject !== select.value && currentCount >= allocationCount);
            }
        });
    },

    // --- Helper & Utility Functions ---

    loadData(key, defaultValue) {
        const saved = localStorage.getItem(key);
        if (saved) {
            return JSON.parse(saved);
        }
        return defaultValue;
    },

    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    getUniqueSubjects() {
        const allSubjects = new Set([""]);
        for (const grade in this.currentAllocations) {
            for (const subject in this.currentAllocations[grade]) {
                allSubjects.add(subject);
            }
        }
        return [...allSubjects].sort();
    },

    assignSubjectColors() {
        let colorIndex = 0;
        Object.keys(subjectColors).forEach(key => delete subjectColors[key]);
        this.uniqueSubjects.forEach(subject => {
            if (subject) {
                subjectColors[subject] = colorPalette[colorIndex % colorPalette.length];
                colorIndex++;
            }
        });
    },

    applyCellColor(cell, subject) {
        cell.style.backgroundColor = (subject && subjectColors[subject]) ? subjectColors[subject] : '';
    },

    highlightLastClasses() {
        const allGradeRows = document.querySelectorAll('tr[data-grade]');
        const gradeRowGroups = {};
        allGradeRows.forEach(row => {
            row.classList.remove('last-class-row'); // Clean up old classes first
            const gradeName = row.dataset.grade;
            if (!gradeRowGroups[gradeName]) gradeRowGroups[gradeName] = [];
            gradeRowGroups[gradeName].push(row);
        });
        for (const gradeName in gradeRowGroups) {
            const rows = gradeRowGroups[gradeName];
            const lastClassRow = rows.filter(r => !r.querySelector('.intervalo')).pop();
            if (lastClassRow) {
                lastClassRow.classList.add('last-class-row');
            }
        }
    },

    populateAllocationsList() {
        const allocationsListDiv = document.getElementById('allocations-list');
        allocationsListDiv.innerHTML = '';
        const sortedGrades = Object.keys(this.currentAllocations).sort();
        for (const gradeName of sortedGrades) {
            const gradeDiv = document.createElement('div');
            gradeDiv.innerHTML = `<h4>${gradeName}</h4>`;
            const subjectList = document.createElement('ul');
            const subjectsInGrade = this.currentAllocations[gradeName];
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
    },

    populateModalGradeSelect() {
        const gradeSelect = document.getElementById('grade-select');
        const gradeNames = Object.keys(this.currentAllocations).sort();
        gradeSelect.innerHTML = '';
        gradeNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            gradeSelect.appendChild(option);
        });
    }
};

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => App.init());
