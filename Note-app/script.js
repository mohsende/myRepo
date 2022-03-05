const addBtn = document.getElementById('add');
// const noteEl = document.getElementById('note');
let isNotEmpty = true;

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => {
        newNote(note);
    });
}

addBtn.addEventListener('click', () => newNote());

function newNote(text = '') {
        const note = document.createElement('div');

        note.classList.add('note');
        note.innerHTML = `
            <div class="tools">
                <button class="edit"><i class="fas fa-save "></i><i class="fas fa-edit hidden"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="text ${text ? "hidden" : ""}"></textarea>
        `;

        const deleteBtn = note.querySelector('.delete');
        const editBtn = note.querySelector('.edit');
        const mainEl = note.querySelector('.main');
        const textEl = note.querySelector('textarea');
        const iEl = note.querySelectorAll('.edit>i');
        
        iEl.forEach((i) => {
                i.classList.toggle('hidden');
            });

        textEl.value = text;
        mainEl.innerHTML = text;
        
        deleteBtn.addEventListener('click', () => {
            note.remove();
            updateLS();
        });
        
        editBtn.addEventListener('click', () => {
            mainEl.classList.toggle('hidden');
            textEl.classList.toggle('hidden');
            iEl.forEach((i) => {
                i.classList.toggle('hidden');
            });

            updateLS();
        });

        textEl.addEventListener('input', (e) => {
            const { value } = e.target;
            mainEl.innerHTML = value;
        });


        document.body.appendChild(note);
    }

    
// };

function updateLS() {
    const noteText = document.querySelectorAll('textarea');

    const notes = [];

    noteText.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
};