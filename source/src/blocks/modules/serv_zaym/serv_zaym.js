const ServZaym = class ServZaym {
    constructor() {}
  
    openQuestion() {
        document.addEventListener('DOMContentLoaded', () => {
            let questions = document.querySelectorAll('.serv_zaym__block');

            questions.forEach(question => {
              const title = question.querySelector('.serv_zaym__block--top');
              const text = question.querySelector('.serv_zaym__content');
              title.addEventListener('click', () => {
                if (text.style.maxHeight) {
                  text.style.maxHeight = null;
                  title.classList.toggle('isActive');
                  text.classList.toggle('isShow');
                } else {
                  questions.forEach(q => {
                    const qText = q.querySelector('.serv_zaym__content');
                    const qTitle = q.querySelector('.serv_zaym__block--top');
                    qText.style.maxHeight = null;
                    qTitle.classList.remove('isActive');
                    qText.classList.remove('isShow');
                  });
            
                  // text.style.maxHeight = (text.scrollHeight + 5) + 'px';
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
  