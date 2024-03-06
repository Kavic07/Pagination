//Select all elements with the class "class"
const cards = document.querySelector(".container");
const title = document.querySelector(".section-title h1");
const btnCon = document.querySelector(".btn-container");

//Fetch our data
fetch("https://api.github.com/users/john-smilga/followers?per_page=100")
  .then((res) => res.json())
  .then((data) => {
    totalPage = Math.ceil(data.length / pageSize);
    btnController(data);
    filterData(data);
  });

//Pagination
let currentPage = 1;
let pageSize = 10;
let totalPage = 0;

let buttons = "";
for (let i = 1; i <= 10; i++) {
  buttons += `<button class="page-btn">${i}</button>`;
}
if (btnCon) {
  btnCon.innerHTML =
    '<button class="prev-btn">prev</button>' +
    buttons +
    '<button class="next-btn">next</button>';
}

const prevBtn = document.querySelector(".prev-btn");
const pageBtn = document.querySelectorAll(".page-btn");
const nextBtn = document.querySelector(".next-btn");

const btnController = (data: any[]) => {
  prevBtn?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      filterData(data);
    }
  });

  nextBtn?.addEventListener("click", () => {
    if (currentPage < totalPage) {
      currentPage++;
      filterData(data);
    }
  });
  console.log(pageBtn);
  pageBtn.forEach((btn: any) => {
    if (Number(btn.innerText) === currentPage) {
      btn.classList.add(".active-btn");
    }

    btn.addEventListener("click", () => {
      currentPage = Number(btn.innerText);
      filterData(data);
    });
  });
};

function filterData(data: any) {
  let startNum = (currentPage - 1) * pageSize;
  let endNum = startNum + pageSize;
  let totalPage = data.length / pageSize;
  const disData = data.slice(startNum, endNum);

  let myData: string = "";
  disData.forEach((dt: any) => {
    myData += `<article class="card">
        <img src="${dt.avatar_url}"  alt="person" />
        <h4>${dt.login}</h4>
        <a href ="" class="btn">View Profile</a>
      </article>`;
  });
  cards ? (cards.innerHTML = myData) : null;
}
