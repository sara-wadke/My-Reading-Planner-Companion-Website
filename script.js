document.addEventListener('DOMContentLoaded', function() {
  const openAboutBtn = document.getElementById('openAboutBtn');
  const aboutModal = document.getElementById('aboutModal');
  const closeAboutBtn = document.getElementById('closeAboutBtn');

  function openModal() {
    if (aboutModal) {
      aboutModal.classList.add('show');
    }
  }
  function closeModal() {
    if (aboutModal) {
      aboutModal.classList.remove('show');
    }
  }

  if (openAboutBtn) openAboutBtn.addEventListener('click', openModal);
  if (closeAboutBtn) closeAboutBtn.addEventListener('click', closeModal);
  if (aboutModal) {
    aboutModal.addEventListener('click', function(e) {
      if (e.target === aboutModal) closeModal();
    });
  }

  const mainLayout = document.querySelector('.main-layout');
  if (mainLayout) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(mainLayout);
  }

  const form = document.getElementById("bookForm");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      localStorage.setItem("bookUserName", name);
      window.location.href = "todo.html";
    });
  }
  const greeting = document.getElementById("greeting");
  const name = localStorage.getItem("bookUserName");
  if (greeting && name) {
    greeting.textContent = `📖 Thank you, ${name}, for submitting the form!✨ `;
  }
});
const returnCheck = document.getElementById('returnCheck');
const returnDateContainer = document.getElementById('returnDateContainer');
const summary = document.getElementById('summary');
window.onload = () => {
  const entries = JSON.parse(localStorage.getItem('bookPlannerEntries')) || [];
  entries.forEach(text => appendSummary(text));
};
returnCheck.addEventListener('change', () => {
  returnDateContainer.style.display = returnCheck.checked ? 'block' : 'none';
});

function addReadingTask() {
  const name = document.getElementById('bookName').value;
  const start = document.getElementById('startDate').value;
  const end = document.getElementById('endDate').value;
  const page = document.getElementById('currentPage').value;
  const returnDate = returnCheck.checked ? document.getElementById('returnDate').value : '';
  let result = `🌟 Reading "${name}" from ${start} to ${end}. Page: ${page}`;
  if (returnDate) result += ` | Return Date: ${returnDate}`;
  appendSummary(result);
  saveEntry(result);
}

function addPaperTask() {
  const name = document.getElementById('paperName').value;
  const date = document.getElementById('paperDate').value;
  const time = document.getElementById('paperTime').value;
  const result = `📃 Paper "${name}" on ${date} at ${time}`;
  appendSummary(result);
  saveEntry(result);
}

function addUpcomingTask() {
  const name = document.getElementById('upcomingBook').value;
  const date = document.getElementById('releaseDate').value;
  const options = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(el => el.value).join(', ');
  const result = `📖 Upcoming reading : "${name}" releasing on ${date}. Buy via: ${options}`;
  appendSummary(result);
  saveEntry(result);
}

function appendSummary(text) {
  const div = document.createElement('div');
  div.className = 'summary-entry';
  div.textContent = text;
  const del = document.createElement('button');
  del.textContent = '×';
  del.onclick = () => {
    div.remove();
    removeEntry(text);
  };
  div.appendChild(del);
  summary.appendChild(div);
}
function saveEntry(text) {
  const entries = JSON.parse(localStorage.getItem('bookPlannerEntries')) || [];
  entries.push(text);
  localStorage.setItem('bookPlannerEntries', JSON.stringify(entries));
}
function removeEntry(text) {
  let entries = JSON.parse(localStorage.getItem('bookPlannerEntries')) || [];
  entries = entries.filter(entry => entry !== text);
  localStorage.setItem('bookPlannerEntries', JSON.stringify(entries));
}

function showNotification() {
  const notification = document.getElementById("notification");
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2500); // 2.5 seconds
}
document.addEventListener('DOMContentLoaded', function () {
  const allAddButtons = document.querySelectorAll('button');
  allAddButtons.forEach(button => {
    button.addEventListener('click', () => {
      setTimeout(() => {
        showNotification();
      }, 100); // slight delay after add
    });
  });
});
function addNote() {
  const note = document.getElementById('noteInput').value.trim();
  if (note !== "") {
    const alertBox = document.getElementById('noteNotification');
    alertBox.style.display = "block";
    alertBox.textContent = "noted 🌟";
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 2000);
    document.getElementById('noteInput').value = '';
  }
}

const cards = document.querySelectorAll('.recommend-card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.add('clicked');
    setTimeout(() => card.classList.remove('clicked'), 600);
  });
});

