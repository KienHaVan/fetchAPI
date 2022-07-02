var courseApi = 'http://localhost:3000/courses';
var inputName = document.querySelector('input[name="name"]');
var inputDescription = document.querySelector('input[name="description"]');

function start() {
    getCourses(renderCourses);
    handleCreateForm();
}


start()

// Functions

// GET COURSES
function getCourses(callback) {
    fetch(courseApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

//CREATE COURSES

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    fetch(courseApi, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
} 



// RENDER COURSES
function renderCourses(courses) {
    listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(course) {
        return `<li class="course-item-${course.id}">
                    <h2>${course.name}</h2>
                    <p>${course.description}</p>
                    <button onclick="handleDeleteCourse(${course.id})">DELETE</button>
                    <button onclick="handleModifyCourse(${course.id})">MODIFY</button>
                </li>`;
    });
    listCoursesBlock.innerHTML = htmls.join('');

}

// MODIFY COURSE
function modifyCourse(id, data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    fetch(courseApi + '/' + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}
    
function handleModifyCourse(id) {
    var name = document.querySelector('.course-item-' + id + ' h2').innerHTML;
    var description = document.querySelector('.course-item-' + id + ' p').innerHTML;
    inputName.value = name;
    inputDescription.value = description;
    var modifyBtn = document.querySelector("#create");
    modifyBtn.innerText = "MODIFY";
    
    modifyBtn.onclick = function() {
        var name = inputName.value;
        var description = inputDescription.value;
        var formData = {
            name: name,
            description: description
        };
        modifyCourse(id, formData, function() {
            getCourses(renderCourses);
        });
    }
}

// DELETE COURSE
function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'}
    };
    fetch(courseApi + '/' + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var courseItem = document.querySelector('.course-item-' + id);
            if (courseItem) {
                courseItem.remove();
            }
        });
}



// CREATE COURSES From FORM
function handleCreateForm() {
    var createBtn = document.querySelector("#create");
    createBtn.onclick = function() {
        var name = inputName.value;
        var description = inputDescription.value;

        var formData = {
            name: name,
            description: description
        };
        createCourse(formData, function() {
            getCourses(renderCourses);
        });
    }
}































// var courseApi = 'http://localhost:3000/courses';

// function start() {
//     getCourses(renderCourses);

//     handleCreateForm();
// }

// start();

// // FUNCTIONS
// function getCourses(callback) {
//     fetch(courseApi)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(callback)
// }

// function createCourse(data, callback) {
//     var options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//             },
//         body: JSON.stringify(data)
//     };
//     fetch(courseApi, options)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(callback)
// }

// function handleDeleteCourse(id) {
//     var options = {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//             }
//     };
//     fetch(courseApi + '/' + id, options)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function() {
//             // getCourses(renderCourses);
//             var courseItem = document.querySelector(".course-item-" + id);
//             if (courseItem) {
//                 courseItem.remove();
//             }
//         })
// }

// function renderCourses(courses) {
//     var listCoursesBlock = document.querySelector('#list-courses');
//     var htmls = courses.map(function(course) {
//         return `<li class="course-item-${course.id}">
//                     <h4>${course.name}</h4>
//                     <p>${course.description}</p>
//                     <button onclick="handleDeleteCourse(${course.id})">Delete</button>
//                 </li>`
//     });
//     console.log(htmls);
//     listCoursesBlock.innerHTML = htmls.join('')

// }

// function handleCreateForm() {
//     var createBtn = document.querySelector("#create");
//     createBtn.onclick = function() {
//         var name = document.querySelector('input[name="name"]').value;
//         var description = document.querySelector('input[name= "description"]').value;

//         var formData = {
//             name: name,
//             description: description
//         }

//         createCourse(formData, function() {
//             getCourses(renderCourses);
//         });
//     }
// }