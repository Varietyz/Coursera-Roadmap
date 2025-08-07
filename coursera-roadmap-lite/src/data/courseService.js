let courseList = [];
let nextId = 3;
let courseStorage = [];

export function getCourses() {
  return [...courseStorage];
}

export async function loadCourses() {
  courseList = await window.courseAPI.loadCourses();
  if (courseList.length > 0) {
    nextId = Math.max(...courseList.map(c => c.id || 0)) + 1;
  }
  saveCourses();
  return courseList;
}

export function modifyAndSave(modificationFn) {
  modificationFn();
  saveCourses();
}

export function saveCourses() {
  courseStorage = [...courseList];
  window.courseAPI.saveCourses(courseStorage);
  console.log('Courses auto-saved to disk');
}

export function addCourse(course) {
  const newCourse = {
    id: nextId++,
    ...course,
    completedDate: course.status === 'completed' ? new Date().toISOString().split("T")[0] : null
  };
  modifyAndSave(() => {
    courseList.push(newCourse);
  });
}
