document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("builder").classList.remove("hidden");
  window.scrollTo(0, document.body.scrollHeight);
});

document.getElementById("resumeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  generatePreview();
});

function addExperience() {
  const container = document.getElementById("experienceSection");
  container.innerHTML += `
    <div>
      <input type="text" placeholder="Job Title" class="jobTitle" />
      <input type="text" placeholder="Company" class="company" />
      <input type="text" placeholder="Duration" class="duration" />
      <textarea placeholder="Details" class="details"></textarea>
    </div>`;
}

function addEducation() {
  const container = document.getElementById("educationSection");
  container.innerHTML += `
    <div>
      <input type="text" placeholder="Degree" class="degree" />
      <input type="text" placeholder="Institution" class="institution" />
      <input type="text" placeholder="Duration" class="eduDuration" />
    </div>`;
}

function addProject() {
  const container = document.getElementById("projectSection");
  container.innerHTML += `
    <div>
      <input type="text" placeholder="Project Title" class="projectTitle" />
      <textarea placeholder="Project Description" class="projectDesc"></textarea>
      <input type="text" placeholder="Project Link" class="projectLink" />
    </div>`;
}

function generatePreview() {
  const imgFile = document.getElementById("profileImage").files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const fullName = document.getElementById("fullName").value;
    const title = document.getElementById("title").value;
    const profile = document.getElementById("profile").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const github = document.getElementById("github").value;
    const guardian = document.getElementById("guardian").value;
    const skills = document.getElementById("skills").value.split(",");
    const languages = document.getElementById("languages").value.split(",");
    const hobbies = document.getElementById("hobbies").value.split(",");

    let experienceHTML = "";
    document.querySelectorAll("#experienceSection > div").forEach(div => {
      const job = div.querySelector(".jobTitle").value;
      const comp = div.querySelector(".company").value;
      const dur = div.querySelector(".duration").value;
      const det = div.querySelector(".details").value;
      if (job || comp || dur || det)
        experienceHTML += `<div><h4>${job} at ${comp}</h4><p>${dur}</p><p>${det}</p></div>`;
    });

    let educationHTML = "";
    document.querySelectorAll("#educationSection > div").forEach(div => {
      const deg = div.querySelector(".degree").value;
      const inst = div.querySelector(".institution").value;
      const dur = div.querySelector(".eduDuration").value;
      if (deg || inst || dur)
        educationHTML += `<div><h4>${deg}</h4><p>${inst} | ${dur}</p></div>`;
    });

    let projectHTML = "";
    document.querySelectorAll("#projectSection > div").forEach(div => {
      const title = div.querySelector(".projectTitle").value;
      const desc = div.querySelector(".projectDesc").value;
      const link = div.querySelector(".projectLink").value;
      if (title || desc || link)
        projectHTML += `<div><h4>${title}</h4><p>${desc}</p>${link ? `<a href="${link}">${link}</a>` : ''}</div>`;
    });

    const html = `
    <div class="resume" id="resumeToDownload">
      <div class="left">
        <div class="circle-image"><img src="${reader.result}" /></div>
        <h2>${fullName}</h2>
        <h4>${title}</h4>
        <p><strong>📧</strong> ${email}</p>
        <p><strong>📞</strong> ${phone}</p>
        <p><strong>📍</strong> ${address}</p>
        ${github ? `<p><strong>💻</strong> <a href="${github}" target="_blank">${github}</a></p>` : ''}
        <p><strong>👨‍👩‍👧 Guardian:</strong> ${guardian}</p>
        <h3>Skills</h3><ul>${skills.map(s => `<li>${s.trim()}</li>`).join("")}</ul>
        <h3>Languages</h3><ul>${languages.map(l => `<li>${l.trim()}</li>`).join("")}</ul>
        <h3>Hobbies</h3><ul>${hobbies.map(h => `<li>${h.trim()}</li>`).join("")}</ul>
      </div>
      <div class="right">
        <h2>Profile</h2><p>${profile}</p>
        ${experienceHTML ? `<h2>Experience</h2>${experienceHTML}` : ''}
        <h2>Education</h2>${educationHTML}
        ${projectHTML ? `<h2>Projects</h2>${projectHTML}` : ''}
      </div>
    </div>`;

    document.getElementById("resumeOutput").innerHTML = html;
  };

  if (imgFile) reader.readAsDataURL(imgFile);
  else reader.onloadend(); // fallback if no image
}

function downloadPDF() {
  const resume = document.getElementById("resumeToDownload");
  html2pdf().from(resume).save("resume.pdf");
}
