const subjects = [
    "", // For empty slots
    "Port./Interp.Textual/Bruna",
    "Port./Gramática/Bruna",
    "Port./Redação / Bruna",
    "Artes/Josué",
    "Educ. Física/René",
    "Mat./Álgebra / Lucas",
    "Filosofia/Ednar Lima",
    "Mat./Geom./ Lucas",
    "História/Diógenes",
    "Sócio. Emocional/Bruna",
    "Geografia / André",
    "Ciências/Amon-rá",
    "Inglês / Raul",
    "Inglês / Tiago",
    "Química / Amon",
    "Física/Anderson",
    "Filosofia / Josué",
    "Mat./Geom./Gustavo",
    "Mat./Geometria/Gustavo",
    "Mat./Álgebra/Gustavo",
    "Biologia/Amanda",
    "Port./Geografia"
].map(s => s.replace(/\s\/\s/g, '/').trim()); // Normalize spacing

const uniqueSubjects = [...new Set(subjects)];

const classAllocations = {
    "6º Ano - Manhã": {
        "Port./Interp.Textual/Bruna": 2,
        "Port./Gramática/Bruna": 2,
        "Port./Redação/Bruna": 2,
        "Artes/Josué": 1,
        "Educ. Física/René": 2,
        "Mat./Álgebra/Lucas": 3,
        "Filosofia/Ednar Lima": 1,
        "Mat./Geom./Lucas": 2,
        "História/Diógenes": 2,
        "Sócio. Emocional/Bruna": 1,
        "Geografia/André": 2,
        "Ciências/Amon-rá": 2,
        "Inglês/Raul": 2,
    },
    "7º Ano - Manhã": {
        "Inglês/Tiago": 2,
        "Mat./Álgebra/Lucas": 3,
        "História/Diógenes": 2,
        "Port./Redação/Bruna": 1,
        "Port./Gramática/Bruna": 2,
        "Ciências/Amon-rá": 3,
        "Port./Interp.Textual/Bruna": 3,
        "Educ. Física/René": 2,
        "Sócio. Emocional/Bruna": 1,
        "Filosofia/Josué": 1,
        "Mat./Geom./Lucas": 1,
        "Geografia/André": 2,
        "Artes/Josué": 1,
    },
    "8º Ano - Manhã": {
        "Inglês/Tiago": 2,
        "Química/Amon": 2,
        "Física/Anderson": 2,
        "Mat./Álgebra/Lucas": 2,
        "Geografia/André": 3,
        "Educ. Física/René": 1,
        "Ciências/Amon-rá": 2,
        "Sócio. Emocional/Bruna": 1,
        "História/Diógenes": 3,
        "Mat./Geom./Lucas": 1,
        "Filosofia/Josué": 1,
        "Port./Interp.Textual/Bruna": 2,
        "Port./Gramática/Bruna": 1,
        "Artes/Josué": 1,
    },
    "9º Ano - Manhã": {
        "Geografia/André": 2,
        "Inglês/Tiago": 2,
        "Mat./Geom./Gustavo": 1,
        "Mat./Geometria/Gustavo": 2,
        "Filosofia/Josué": 1,
        "Port./Interp.Textual/Bruna": 2,
        "Química/Amon": 2,
        "Educ. Física/René": 2,
        "Mat./Álgebra/Gustavo": 3,
        "História/Diógenes": 1,
        "Biologia/Amanda": 2,
        "Física/Anderson": 2,
        "Port./Gramática/Bruna": 1,
        "Port./Redação/Bruna": 2,
        "Sócio. Emocional/Bruna": 1,
        "Port./Geografia": 1,
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const gradeRows = document.querySelectorAll('tr[data-grade]');

    // A map to store all select elements per grade
    const gradeSelects = new Map();

    gradeRows.forEach(row => {
        const gradeName = row.dataset.grade;
        if (!gradeSelects.has(gradeName)) {
            gradeSelects.set(gradeName, []);
        }

        const cells = row.querySelectorAll('.subject-cell');
        cells.forEach(cell => {
            const select = document.createElement('select');
            const initialSubject = cell.dataset.subject.replace(/\s\/\s/g, '/').trim();

            uniqueSubjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject || '---------';
                if (subject === initialSubject) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            cell.appendChild(select);
            gradeSelects.get(gradeName).push(select);
        });
    });

    function updateGradeSelects(gradeName) {
        const selectsInGrade = gradeSelects.get(gradeName);
        const allocations = classAllocations[gradeName];

        // Count current selections in the grade
        const currentCounts = {};
        selectsInGrade.forEach(s => {
            if (s.value) {
                currentCounts[s.value] = (currentCounts[s.value] || 0) + 1;
            }
        });

        // Update options for all selects in the grade
        selectsInGrade.forEach(select => {
            for (const option of select.options) {
                if (!option.value) continue; // Skip empty option

                const subject = option.value;
                const allocationCount = allocations[subject] || 0;
                const currentCount = currentCounts[subject] || 0;

                // If the subject is selected in the current select, it should always be enabled
                if (subject === select.value) {
                    option.disabled = false;
                    continue;
                }

                // Otherwise, disable if the allocation is met or exceeded
                if (currentCount >= allocationCount) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                }
            }
        });
    }

    // Add event listeners and initialize
    for (const [gradeName, selects] of gradeSelects.entries()) {
        selects.forEach(select => {
            select.addEventListener('change', () => updateGradeSelects(gradeName));
        });
        // Initial update for each grade
        updateGradeSelects(gradeName);
    }
});
