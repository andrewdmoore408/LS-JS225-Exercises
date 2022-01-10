/*
School Improved

In an earlier exercise, we created a school object. It works, however, it can still be improved. The following are improvements for you to implement in the solution provided:

  1. Make the list students private. Right now, anyone can gain access to it and manipulate it.
  2. Make the constraint for allowed values for years a private variable. As a private variable it avoids an unnecessary statement in the addStudent method and at the same time makes the code more declarative.
  3. Make the getCourse function accessible in the addGrade method also. As it is, only the courseReport method has access.

*/
const school = (function() {
  const students = [],
  const VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];

  return {
    addStudent(name, year) {
      if (this.validYear(year)) {
        const newStudent = createStudent(name, year);
        students.push(newStudent);
        return newStudent;
      } else {
        console.log('Invalid Year--student was not added.');
      }
    },

    validYear(year) {
      return VALID_YEARS.includes(year);
    },

    enrollStudent(student, courseName, courseCode) {
      if (this.currentStudent(student)) {
        student.addCourse({name: courseName, code: courseCode});
      } else {
        console.log('Student not found.');
      }
    },

    currentStudent(student) {
      return students.includes(student);
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
      let courseTakers = students.filter(student => student.listCourses().find(course => course.name === courseName));

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
})();

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