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
  
let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
console.log(foo.listCourses());
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
// console.log(foo.listCourses());
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"
