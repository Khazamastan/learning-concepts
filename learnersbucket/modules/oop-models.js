/**
 * Problem: Create a School using OOP principles.
 * Example Input:
 *   const school = new School('ABC'); school.addStudent(new Student(1, 'Aman'));
 * Example Output:
 *   school.summary() -> { name: 'ABC', students: 1, teachers: 0 }
 */
export class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export class Teacher {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }
}

export class School {
  constructor(name) {
    this.name = name;
    this.students = [];
    this.teachers = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  addTeacher(teacher) {
    this.teachers.push(teacher);
  }

  summary() {
    return {
      name: this.name,
      students: this.students.length,
      teachers: this.teachers.length
    };
  }
}
