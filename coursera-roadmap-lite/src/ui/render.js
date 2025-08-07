// src/ui/render.js
import { modifyAndSave } from '../data/courseService.js';

export function renderCourses(courseList) {
  const tbody = document.getElementById("courseList");
  tbody.innerHTML = "";

  if (courseList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-state">No courses yet. Right-click anywhere to add your first course!</td></tr>`;
    return;
  }

  courseList.forEach(course => {
    const tr = document.createElement("tr");
    tr.className = course.status;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = course.status === "completed";
    checkbox.addEventListener("change", () => {
      modifyAndSave(() => {
        course.status = checkbox.checked ? "completed" : "to-do";
        course.completedDate = checkbox.checked ? new Date().toISOString().split("T")[0] : null;
      });
      renderCourses(courseList);
      renderSummary(courseList);
    });

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.className = "checkbox-wrapper";
    checkboxWrapper.innerHTML = `<span class="status-indicator status-${course.status}"></span>`;
    checkboxWrapper.appendChild(checkbox);

    tr.innerHTML = `
      <td></td>
      <td>
        <strong>
          ${course.url
            ? `<a href="${course.url}" target="_blank" rel="noopener noreferrer" class="course-link">${course.title}</a>`
            : course.title}
        </strong>
      </td>
      <td>${course.provider}</td>
      <td>€${course.cost.toFixed(2)}</td>
      <td>${course.completedDate || '-'}</td>
    `;
    tr.children[0].appendChild(checkboxWrapper);
    tbody.appendChild(tr);
  });
}

export function renderSummary(courseList) {
  const summaryEl = document.getElementById("summary");
  const total = courseList.length;
  const completed = courseList.filter(c => c.status === "completed").length;
  const inProgress = total - completed;
  const totalCost = courseList.reduce((sum, c) => sum + c.cost, 0);

  summaryEl.innerHTML = `
    <div class="summary-item"><strong>Total Courses</strong><div class="summary-value">${total}</div></div>
    <div class="summary-item"><strong>Completed</strong><div class="summary-value">${completed}</div></div>
    <div class="summary-item"><strong>TO-DO</strong><div class="summary-value">${inProgress}</div></div>
    <div class="summary-item"><strong>Total Cost</strong><div class="summary-value">€${totalCost.toFixed(2)}</div></div>
  `;
}
