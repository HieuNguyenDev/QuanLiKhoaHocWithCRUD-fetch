const coursesApi = 'http://localhost:3000/courses';

const listCourses = document.querySelector('#list-courses');
const createBtn = document.querySelector('#create-btn');
const addCourse = document.querySelector('#add-course');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-icon');

getCourses(renderCourses);

function getCourses(callback) {
    fetch(coursesApi)
        .then(response => {
            return response.json();
        })
        .then(callback)
}

function createCourses(data, callback) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(coursesApi, options) 
        .then(response => {
            return response.json();
        })
        .then(callback)
}  

function updateCourses(id, data, callback) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(coursesApi + '/' + id, options)
        .then(response => {
            return response.json();
        })
        .then(callback)
}

function renderCourses(courses) {
    let html = courses.map(course => {
        return `
        <li class="course-item-${course.id}">
            <h2>${course.name}</h2>
            <p>${course.description}</p>
            <ion-icon class="delete-course-icon" onclick="handleDeleteCourse(${course.id})" name="trash-outline"></ion-icon>
            <ion-icon class="update-course-icon" onclick="handleUpdateCourse(${course.id})" name="pencil-outline"></ion-icon>
        </li>`
    })
    listCourses.innerHTML = html.join('')
}

function handleCreateCourse() {          
    let name = document.querySelector('input[name="name"]').value;
    let description = document.querySelector('input[name="description"]').value;

    if (name === '' || description === '') {
        alert('Bạn không được để trống!');
    } else {
        let formData = {
            name: name,
            description: description
        }

        createCourses(formData);
    }
}

function handleDeleteCourse(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(coursesApi + '/' + id, options)
        .then(response => {
            return response.json();
        })
        .then(() => {
            let courseItem = document.querySelector('.course-item-' + id);
            courseItem.remove()
        })
}

function handleUpdateCourse(id) {
    modal.classList.add('show-modal');
    // lấy value hiển thị lên ô input
    let name = document.querySelector(`.course-item-${id} h2`).textContent;
    let description = document.querySelector(`.course-item-${id} p`).textContent;

    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="description"]').value = description;

    document.querySelector('.modal-heading').textContent = 'Chỉnh sửa khóa học';
    let updateBtn = document.querySelector('#create-btn')
    updateBtn.setAttribute('id', 'update-btn');
    updateBtn.textContent = 'Update';
    updateBtn.setAttribute('onclick', 'handleUpdateCourses()')

    updateBtn.addEventListener('click', () => {
        let newName = document.querySelector('input[name="name"]').value;
        let newDescription = document.querySelector('input[name="description"]').value;
    
        let formData = {
            name: newName,
            description: newDescription
        }
    
        updateCourses(id, formData, () => {
            getCourses(renderCourses);
        })

        
    })


}

function showFormAddCourse() {
    addCourse.addEventListener('click', () => {
        modal.classList.add('show-modal')
    })
}

function hiddenFormAddCourse() {
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show-modal');
    })
}