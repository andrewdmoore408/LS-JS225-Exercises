/*
School

Create a school object. The school object uses the student object from the previous exercise. It has methods that use and update information about the student. Be sure to check out the previous exercise for the other arguments that might be needed by the school object. Implement the following methods for the school object:

    addStudent: Adds a student by creating a new student and adding the student to a collection of students. The method adds a constraint that the year can only be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'. Returns a student object if year is valid otherwise it logs "Invalid Year".
    enrollStudent: Enrolls a student in a course.
    addGrade: Adds the grade of a student for a course.
    getReportCard: Logs the grades of a student for all courses. If the course has no grade, it uses "In progress" as the grade.
    courseReport: Logs the grades of all students for a given course name. Only student with grades are part of the course report.

To test your code, use the three student objects listed below. Using the three student objects, produce the following values from the getReportCard and courseReport methods respectively.
*/
const school = {
  students: [],
  
  addStudent(name, year) {
    if (this.validYear(year)) {
      const newStudent = createStudent(name, year);
      this.students.push(newStudent);
      return newStudent;
    } else {
      console.log('Invalid Year--student was not added.');
    }
  },
  
  validYear(year) {
    return ['1st', '2nd', '3rd', '4th', '5th'].includes(year);
  },
  
  enrollStudent(student, courseName, courseCode) {
    if (this.currentStudent(student)) {
      student.addCourse({name: courseName, code: courseCode});
    } else {
      console.log('Student not found.');
    }
  },
  
  currentStudent(student) {
    return this.students.includes(student);
  },
  
  addGrade(student, courseCode, grade) {
    if (this.currentStudent(student)) {
      student.getCourse(courseCode).grade = grade;
    }
  },
  
  getReportCard(student) {
    if (!this.currentStudent(student)) {
      console.log('This student is not enrolled at this school.');
      return;
    }
    
    console.log(`~~~Report Card for ${student.name}~~~`);
    student.listCourses().forEach(course => {
      let grade = course.grade ? course.grade : 'In progress';
      
      console.log(`${course.name}: ${grade}`);
    });
    
    console.log();
  },
  
  getGradeAverage(studentGrades) {
    let gradesSum = studentGrades.map(studentGrade => studentGrade.grade).reduce((total, grade) => total + grade);
    
    return Math.round(gradesSum / studentGrades.length);
  },
  
  getCourseGrades(courseName) {
    let courseTakers = this.students.filter(student => student.listCourses().find(course => course.name === courseName));
    
    let studentGrades = courseTakers.map(courseTaker => {
      let studentCourse = courseTaker.listCourses().find(course => course.name === courseName);

      return { name: courseTaker.name, grade: studentCourse.grade };
    }).filter(({grade}) => grade);
    
    return studentGrades;
  },
  
  courseReport(courseName) {
    function getGradeAverage(studentGrades) {
      let gradesSum = studentGrades.map(studentGrade => studentGrade.grade).reduce((total, grade) => total + grade);

      return Math.round(gradesSum / studentGrades.length);
    }
    
    const studentGrades = this.getCourseGrades(courseName);
          
    if (studentGrades.length === 0) return undefined;
    
    const gradeAverage = getGradeAverage(studentGrades);
    
    console.log(`===${courseName} Grades===`);
    studentGrades.forEach(studentGrade => {
      console.log(`${studentGrade.name}: ${studentGrade.grade}`);
    });
    
    console.log('------');
    console.log(`= Course Average: ${gradeAverage}\n`);
  },
};

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },
    
    addCourse(course) {
      this.courses.push(course);
    },
    
    listCourses() {
      return this.courses;
    },
    
    getCourse(code) {
      for (let course of this.courses) {
        if (course.code === code) return course;
      }
    },
    
    addNote(code, note) {
      let course = this.getCourse(code);
      
      // console.log(`in addNote: ${course.note}`);
      
      if (course.note) {
        course.note += `; ${note}`;
      } else {
        course.note = `${course.name}: ${note}`;
      }
    },
    
    updateNote(code, note) {
      let course = this.getCourse(code);
      
      course.note = `${course.name}: ${note}`;
    },
    
    viewNotes() {
      for (let course of this.courses) {
        if (course.note) console.log(course.note);
      }
    },
  }
}

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.addGrade(foo, 101, 95);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.addGrade(foo, 102, 90);

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, 'Math', 101);
school.addGrade(bar, 101, 91);

let qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, 'Math', 101);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(qux, 102, 90);
school.addGrade(qux, 101, 93);

// Examples of created student objects with grades; methods on the objects are not shown here for brevity.
// The following are only showing the properties that aren't methods for the three objects
// foo;
// {
//   name: 'foo',
//   year: '3rd',
//   courses: [
//     { name: 'Math', code: 101, grade: 95, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//     { name: 'Physics', code: 202, }
//   ],
// }

// bar;
// {
//   name: 'bar',
//   year: '1st',
//   courses: [
//     { name: 'Math', code: 101, grade: 91, },
//   ],
// }

// qux;
// {
//   name: 'qux',
//   year: '2nd',
//   courses: [
//     { name: 'Math', code: 101, grade: 93, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//    ],
// }

school.getReportCard(foo);
// Math: 95
// Advanced Math: 90
// Physics: In progress

school.courseReport('Math');
// = =Math Grades=
// = foo: 95
// = bar: 91
// = qux: 93
// = ---
// = Course Average: 93

school.courseReport('Advanced Math');
// = =Advanced Math Grades=
// = foo: 90
// = qux: 90
// = ---
// = Course Average: 90

console.log(school.courseReport('Physics'));
// = undefined
