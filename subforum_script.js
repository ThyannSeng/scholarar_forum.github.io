document.addEventListener("DOMContentLoaded", function() {
  const scholarships = [
    {
      id: 1,
      title: "MEXT Scholarship 2025",
      description: "Introduction or brief description about the scholarship, its importance, and impact.",
      questions: [
        {
          id: 101,
          title: "Does MEXT Scholarship cover living expenses?",
          description: "I want to know if the MEXT Scholarship provides any allowances for living expenses.",
        },
        {
          id: 102,
          title: "What are the eligibility criteria for MEXT Scholarship?",
          description: "Can someone explain the eligibility requirements for applying to the MEXT Scholarship?",
        }
        // Add more questions as needed
      ]
    },
    {
      id: 2,
      title: "GKS Scholarship 2025",
      description: "Introduction or brief description about the scholarship, its importance, and impact.",
      questions: [
        {
          id: 201,
          title: "How to apply for GKS Scholarship?",
          description: "Can anyone provide a step-by-step guide on applying for the GKS Scholarship?",
        }
        // Add more questions as needed
      ]
    }
    // Add more scholarships as needed
  ];

  const itemsPerPage = 2; // Adjust items per page as needed
  let currentPage = 1;
  let filteredQuestions = [];
  let currentScholarshipQuestions = [];

  const questionList = document.getElementById('question-list');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const paginationNumbers = document.getElementById('pagination-numbers');
  const searchInput = document.getElementById('search-input');

  // Extract query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const scholarshipId = urlParams.get('id');
  const subforumName = urlParams.get('subforumName');

  // Find the scholarship by ID
  const scholarship = scholarships.find(s => s.id === parseInt(scholarshipId));

  // Populate the page with scholarship details and questions
  if (scholarship) {
    document.getElementById('subforum-title').textContent = scholarship.title;
    document.getElementById('subforum-description').textContent = scholarship.description;
    currentScholarshipQuestions = scholarship.questions;
    filterQuestions();
  } else {
    document.getElementById('subforum-title').textContent = 'Scholarship not found';
  }

  function filterQuestions() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredQuestions = currentScholarshipQuestions.filter(question =>
      question.title.toLowerCase().includes(searchTerm) ||
      question.description.toLowerCase().includes(searchTerm)
    );
    currentPage = 1; // Reset to the first page
    renderQuestions();
  }

  function renderQuestions() {
    // Calculate the start and end index of questions for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentQuestions = filteredQuestions.slice(startIndex, endIndex);

    // Render questions
    questionList.innerHTML = currentQuestions.map(question => `
      <div class="question-item">
        <h3>${question.title}</h3>
        <p>${question.description}</p>
        <a href="subsubforum.html?scholarshipId=${scholarship.id}&questionId=${question.id}&subforumName=${encodeURIComponent(subforumName)}">View Discussion</a>
      </div>
    `).join('');

    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(filteredQuestions.length / itemsPerPage);

    // Render page numbers
    renderPageNumbers();
  }

  function renderPageNumbers() {
    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
    paginationNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      pageButton.classList.add('relative', 'inline-flex', 'items-center', 'px-4', 'py-2', 'border', 'text-sm', 'font-medium');

      if (i === currentPage) {
        pageButton.classList.add('z-10', 'bg-blue-50', 'border-blue-500', 'text-blue-600');
      } else {
        pageButton.classList.add('bg-white', 'border-zinc-300', 'text-zinc-500', 'hover:bg-zinc-50');
      }

      pageButton.addEventListener('click', () => {
        currentPage = i;
        renderQuestions();
      });

      paginationNumbers.appendChild(pageButton);
    }
  }

  // Add event listeners to pagination buttons
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderQuestions();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(filteredQuestions.length / itemsPerPage)) {
      currentPage++;
      renderQuestions();
    }
  });

  // Add event listener to search input
  searchInput.addEventListener('input', filterQuestions);

  // Initial render
  filterQuestions();

  const menuData = [
    {
      title: "Home",
      link: "index.html",
      icon: "fas fa-home",
      active: false
    },
    {
      title: "Popular",
      link: "popular.html",
      icon: "fas fa-fire",
      active: true
    },
    {
      title: "Topics",
      sublinks: [
        {
          title: "Internet Culture (Viral)",
          link: "category.html?category=Internet%20Culture%20(Viral)",
          icon: "fas fa-laugh",
          sublinks: [
            { title: "Amazing", link: "category.html?category=Amazing" },
            { title: "Animals & Pets", link: "category.html?category=Animals%20%26%20Pets" },
            { title: "Cringe & Facepalm", link: "category.html?category=Cringe%20%26%20Facepalm" },
            { title: "Funny", link: "category.html?category=Funny" },
            { title: "Interesting", link: "category.html?category=Interesting" },
            { title: "Memes", link: "category.html?category=Memes" },
            { title: "Oddly Satisfying", link: "category.html?category=Oddly%20Satisfying" },
            { title: "Reddit Meta", link: "category.html?category=Reddit%20Meta" },
            { title: "Wholesome & Heartwarming", link: "category.html?category=Wholesome%20%26%20Heartwarming" }
          ]
        },
        {
          title: "Games",
          link: "category.html?category=Games",
          icon: "fas fa-gamepad",
          sublinks: [
            { title: "Games", link: "category.html?category=Games" }
          ]
        },
        {
          title: "Q&As",
          link: "category.html?category=Q%26As",
          icon: "fas fa-question-circle",
          sublinks: [
            { title: "Q&As", link: "category.html?category=Q%26As" },
            { title: "Stories & Confessions", link: "category.html?category=Stories%20%26%20Confessions" }
          ]
        },
        {
          title: "Technology",
          link: "category.html?category=Technology",
          icon: "fas fa-cogs",
          sublinks: [
            { title: "Technology", link: "category.html?category=Technology" }
          ]
        },
        {
          title: "Pop Culture",
          link: "category.html?category=Pop%20Culture",
          icon: "fas fa-star",
          sublinks: [
            { title: "Pop Culture", link: "category.html?category=Pop%20Culture" }
          ]
        },
        {
          title: "Movies & TV",
          link: "category.html?category=Movies%20%26%20TV",
          icon: "fas fa-film",
          sublinks: [
            { title: "Movies & TV", link: "category.html?category=Movies%20%26%20TV" }
          ]
        },
        {
          title: "See more",
          link: "category.html?category=More",
          icon: "",
          active: false
        }
      ]
    },
    {
      title: "Resources",
      sublinks: [
        { title: "About Reddit", link: "about.html", icon: "fas fa-info-circle" },
        { title: "Advertise", link: "advertise.html", icon: "fas fa-bullhorn" },
        { title: "Help", link: "help.html", icon: "fas fa-question" },
        { title: "Blog", link: "blog.html", icon: "fas fa-blog" }
      ]
    }
  ];

  function renderMenu() {
    const sidebarMenu = document.getElementById('sidebar-menu');
    sidebarMenu.innerHTML = menuData.map(section => `
      <div class="menu-section">
        ${section.sublinks ? `
          <h3>${section.title}</h3>
          ${section.sublinks.map(item => `
            <div class="menu-item toggle-btn" onclick="toggleMenu('${item.title.replace(/\s+/g, '-').toLowerCase()}-submenu')">
              <i class="${item.icon}"></i>
              <span>${item.title}</span>
              ${item.sublinks ? '<i class="fas fa-chevron-down"></i>' : ''}
            </div>
            <div id="${item.title.replace(/\s+/g, '-').toLowerCase()}-submenu" class="submenu">
              ${item.sublinks ? item.sublinks.map(subitem => `
                <div class="submenu-item"><a href="${subitem.link}">${subitem.title}</a></div>
              `).join('') : ''}
            </div>
          `).join('')}
        ` : `
          <div class="menu-item">
            <a href="${section.link}">
              <i class="${section.icon}"></i>
              <span>${section.title}</span>
            </a>
          </div>
        `}
      </div>
    `).join('');
  }

  function toggleMenu(menuId) {
    const submenu = document.getElementById(menuId);
    const icon = submenu.previousElementSibling.querySelector('.fa-chevron-down, .fa-chevron-up');
    if (submenu.style.display === 'none' || submenu.style.display === '') {
      submenu.style.display = 'block';
      if (icon) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
      }
    } else {
      submenu.style.display = 'none';
      if (icon) {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
      }
    }
  }

  // Initially display all submenus
  document.querySelectorAll('.submenu').forEach(submenu => {
    submenu.style.display = 'block';
  });
  document.querySelectorAll('.submenu').forEach(submenu => {
    const icon = submenu.previousElementSibling.querySelector('.fa-chevron-down');
    if (icon) {
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-up');
    }
  });

  renderMenu();
});
