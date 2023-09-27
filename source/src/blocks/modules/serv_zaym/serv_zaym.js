const ServZaym = class ServZaym {
  constructor() {}

  openQuestion() {
    document.addEventListener('DOMContentLoaded', () => {
      let questions = document.querySelectorAll('.serv_zaym__block');

      questions.forEach(question => {
        const title = question.querySelector('.serv_zaym__block--top');
        const text = question.querySelector('.serv_zaym__content');

        title.addEventListener('click', () => {
          const isActive = title.classList.contains('isActive');
          const isShow = text.classList.contains('isShow');

          questions.forEach(q => {
            const qText = q.querySelector('.serv_zaym__content');
            const qTitle = q.querySelector('.serv_zaym__block--top');
            qText.style.maxHeight = null;
            qTitle.classList.remove('isActive');
            qText.classList.remove('isShow');
          });

          if (!isActive && !isShow) {
            text.style.maxHeight = (text.scrollHeight + 80) + 'px'; // Учтите паддинг
            title.classList.add('isActive');
            text.classList.add('isShow');
          }
        });
      });
    });
  }

  init() {
    this.openQuestion();
  }
};

export default ServZaym;
