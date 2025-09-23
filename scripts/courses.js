// Create courses array
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// Create empty array
let currentCourses = [];

//get the all buttons with the class of filter-btn, add click listener for each dataset
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
    //get the subject of the button  
    const subject = button.dataset.subject;

    //if click is all add course list
    if (subject === "All") {
        currentCourses = courses;
    } else {
        //else filter by subject
        currentCourses = courses.filter(course => course.subject === subject);
    }

        //count courses
        getCourseCount(currentCourses);
        //count credits
        getTotalCredits(currentCourses);
        //display course info
        displayCourse(currentCourses);
    });
});

// Display current course information
function displayCourse(coursesArray) {
    const courseList = document.querySelector(".course-list");
    // Empty the list first
    courseList.innerHTML = "";
    // Add info to array
    coursesArray.forEach(course => createListItem(course));
};


// Create list item and add course info to content
function createListItem(course) {
    const courseList = document.querySelector(".course-list");
    const listItem = document.createElement("li");
    // Check if course is completed
    if (getCourseCompletion(course) === true) {
        listItem.classList = "true";
    }
    else {
        listItem.classList = "false";
    }
    // Add event listener to each list item
    listItem.addEventListener("click", () => { displayCourseDetails(course) });
    // Add course content to the list item
    listItem.textContent = getCourse(course);
    courseList.appendChild(listItem);
}

//get the course subject and number
function getCourse(course) {
    return `${course.subject} ${course.number}`;
}

function getCourseCompletion(course) {
    return course.completed;
}

function getCourseCount(coursesArray) {
    const paragraph = document.querySelector(".course-count");
    paragraph.innerHTML = `<strong>The number of courses listed below is ${coursesArray.length}</strong>`;
}

function getTotalCredits(coursesArray) {
    let totalCredits = coursesArray.reduce((total, course) => total + course.credits, 0)
    const paragraph = document.querySelector(".credits");
    paragraph.innerHTML = `<strong> Total number of credits required: ${totalCredits}</strong>`;
}

const courseDetails = document.querySelector("#course-details");

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="close">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;

    // Select button and add the event listener
    const closeModal = document.querySelector("#close");
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });

    // Show the dialog
    courseDetails.showModal();
}

