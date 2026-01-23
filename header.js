// header.js
const KEY_BRANCH  = "global_branch";
const KEY_DATE    = "global_date";
const KEY_AUDITOR = "global_auditor";

function saveHeaderData() {
  const branchEl  = document.getElementById("branchName");
  const dateEl    = document.getElementById("auditDate");
  const auditorEl = document.getElementById("auditorName");
  if (!branchEl || !dateEl || !auditorEl) return;

  localStorage.setItem(KEY_BRANCH,  branchEl.value || "");
  localStorage.setItem(KEY_DATE,    dateEl.value || "");
  localStorage.setItem(KEY_AUDITOR, auditorEl.value || "");
}

function loadHeaderData() {
  const branchEl  = document.getElementById("branchName");
  const dateEl    = document.getElementById("auditDate");
  const auditorEl = document.getElementById("auditorName");
  if (!branchEl || !dateEl || !auditorEl) return;

  const savedBranch  = localStorage.getItem(KEY_BRANCH);
  const savedDate    = localStorage.getItem(KEY_DATE);
  const savedAuditor = localStorage.getItem(KEY_AUDITOR);

  if (savedBranch !== null)  branchEl.value = savedBranch;
  if (savedAuditor !== null) auditorEl.value = savedAuditor;

  // ถ้าไม่เคยมีวันที่ ให้ใส่วันนี้ แล้วบันทึกเป็นค่าเริ่มต้น
  if (savedDate) {
    dateEl.value = savedDate;
  } else {
    dateEl.valueAsDate = new Date();
    saveHeaderData();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadHeaderData();

  ["branchName", "auditDate", "auditorName"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", saveHeaderData);
    el.addEventListener("change", saveHeaderData);
  });
});
