// DOM Elements
const form = document.getElementById('bookForm');
const createBtn = document.getElementById('createBtn');
const readBtn = document.getElementById('readBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
const container = document.querySelector('.container');

// Helpers
function toggleForm(show) {
    form.style.display = show ? 'block' : 'none';
}
function clearExtraContent() {
    const extra = document.querySelector('#extraContent');
    if (extra) extra.remove();
}
function createTable(books) {
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>Year</th><th>Price</th>
        </tr>
    `;
    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.publish_year ?? '-'}</td>
            <td>${book.price ?? '-'}</td>
        `;
        table.appendChild(row);
    });
    return table;
}

// Submit (Create Book)
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        publish_year: document.getElementById('publish_year').value,
        price: document.getElementById('price').value
    };

    const res = await fetch('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    const data = await res.json();
    if (res.ok) {
        alert("✅ Book added!");
        form.reset();
    } else {
        alert("❌ Error: " + (data.error || "Could not add book."));
    }
});

// View All Books
readBtn.addEventListener('click', async function () {
    toggleForm(false);
    clearExtraContent();

    const res = await fetch('/books');
    const data = await res.json();

    if (!data.success) {
        return alert("❌ Failed to load books");
    }

    const div = document.createElement('div');
    div.id = 'extraContent';
    div.appendChild(createTable(data.books));
    container.appendChild(div);
});

// Update Book
updateBtn.addEventListener('click', async function () {
    toggleForm(false);
    clearExtraContent();

    const res = await fetch('/books');
    const data = await res.json();
    if (!data.success) return alert("❌ Failed to load books");

    const div = document.createElement('div');
    div.id = 'extraContent';

    div.appendChild(createTable(data.books));

    const updateForm = document.createElement('form');
    updateForm.innerHTML = `
        <h3>Update Book</h3>
        <input type="number" id="updateId" placeholder="Book ID" required><br>
        <input type="text" id="newTitle" placeholder="New Title"><br>
        <input type="text" id="newAuthor" placeholder="New Author"><br>
        <input type="number" id="newYear" placeholder="New Year"><br>
        <input type="number" id="newPrice" placeholder="New Price"><br>
        <button type="submit">Update</button>
    `;

    updateForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const id = document.getElementById('updateId').value;

        const updatedBook = {
            title: document.getElementById('newTitle').value,
            author: document.getElementById('newAuthor').value,
            publish_year: document.getElementById('newYear').value,
            price: document.getElementById('newPrice').value
        };

        if (!updatedBook.title || !updatedBook.author) {
            return alert("❌ Title and Author are required");
        }

        const res = await fetch(`/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBook)
        });

        const result = await res.json();
        if (res.ok) {
            alert("✅ Book updated!");
        } else {
            alert("❌ Error: " + (result.error || "Update failed."));
        }
    });

    div.appendChild(updateForm);
    container.appendChild(div);
});

// Delete Book
deleteBtn.addEventListener('click', async function () {
    toggleForm(false);
    clearExtraContent();

    const res = await fetch('/books');
    const data = await res.json();
    if (!data.success) return alert("❌ Failed to load books");

    const div = document.createElement('div');
    div.id = 'extraContent';

    div.appendChild(createTable(data.books));

    const deleteForm = document.createElement('form');
    deleteForm.innerHTML = `
        <h3>Delete Book</h3>
        <input type="number" id="deleteId" placeholder="Book ID" required><br>
        <button type="submit">Delete</button>
    `;

    deleteForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const id = document.getElementById('deleteId').value;

        const res = await fetch(`/books/${id}`, {
            method: 'DELETE'
        });

        const result = await res.json();
        if (res.ok) {
            alert("✅ Book deleted!");
        } else {
            alert("❌ Error: " + (result.error || "Delete failed."));
        }
    });

    div.appendChild(deleteForm);
    container.appendChild(div);
});

// Show Create Form (default)
createBtn.addEventListener('click', function () {
    toggleForm(true);
    clearExtraContent();
});
