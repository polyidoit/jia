const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#group-nav');
function closeMenu() { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); if (document.activeElement.closest('#group-nav')) toggle.focus(); } });
document.querySelector('#paper-filter').addEventListener('change', event => {
  let count = 0;
  document.querySelectorAll('.paper-list li').forEach(paper => { const visible = event.target.value === 'all' || paper.dataset.year === event.target.value; paper.hidden = !visible; if (visible) count++; });
  document.querySelector('#paper-count').textContent = `${count} ${count === 1 ? 'paper' : 'papers'}`;
});
const sections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => { for (const entry of entries) { if (entry.isIntersecting) { const id = entry.target.id === 'about' ? 'home' : entry.target.id; nav.querySelectorAll('a').forEach(link => { link.removeAttribute('aria-current'); if(link.hash === `#${id}`) link.setAttribute('aria-current','location'); }); } } }, {rootMargin:'-15% 0px -65% 0px'});
  sections.forEach(section => observer.observe(section));
}


const seminarFilter = document.querySelector('#seminar-filter');

if (seminarFilter) {
  const seminarEntries = [
    ...document.querySelectorAll('#seminars .seminar-entry')
  ];
  const seminarCount = document.querySelector('#seminar-count');
  const seminarEmpty = document.querySelector('#seminar-empty');

  function updateSeminars() {
    const year = seminarFilter.value;
    let count = 0;

    seminarEntries.forEach(entry => {
      const visible = year === 'all' || entry.dataset.year === year;
      entry.hidden = !visible;

      if (visible) count++;
    });

    seminarCount.textContent =
      `${count} ${count === 1 ? 'seminar' : 'seminars'}`;

    seminarEmpty.hidden = count !== 0;
  }

  seminarFilter.addEventListener('change', updateSeminars);
  updateSeminars();
}