/**
 * Problem #32: Create a School using OOPs principle
 *
 * Detailed Problem Statement:
 * Design classes for `Student`, `Teacher`, and `School`, supporting enrollment and assignment.
 *
 * Example Input:
 * const school = new School('ABC School');
 * const s1 = new Student(1, 'Aman');
 * const t1 = new Teacher(101, 'Meera', 'Math');
 * school.addStudent(s1);
 * school.addTeacher(t1);
 * console.log(school.summary());
 *
 * Example Output:
 * { name: 'ABC School', students: 1, teachers: 1 }
 */

export const problem = `Create a School using OOPs principle`;

export const statement = `
Design classes for \`Student\`, \`Teacher\`, and \`School\`, supporting enrollment and assignment.
`.trim();

export const exampleInput = `
const school = new School('ABC School');
const s1 = new Student(1, 'Aman');
const t1 = new Teacher(101, 'Meera', 'Math');
school.addStudent(s1);
school.addTeacher(t1);
console.log(school.summary());
`.trim();

export const exampleOutput = `
{ name: 'ABC School', students: 1, teachers: 1 }
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Teacher {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }
}

class School {
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

// ---------------------------
// Approach 2: Iterative / Explicit State
// ---------------------------
function solveIterative(input) {
  // 1) Initialize state.
  // 2) Traverse input using loops.
  // 3) Update state explicitly.
  return input;
}

// ---------------------------
// Approach 3: Functional / Declarative
// ---------------------------
function solveFunctional(input) {
  return Array.isArray(input)
    ? input.reduce((acc, item) => {
        acc.push(item);
        return acc;
      }, [])
    : input;
}
