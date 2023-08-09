const ServDop = class ServDop {
    constructor(){}
    initTabs() {
        // При загрузке страницы скрываем табы на десктопе и показываем табы через select на мобильных устройствах
        document.addEventListener('DOMContentLoaded', function() {
            const tabsExist = document.querySelectorAll('.tab').length > 0;
            if (tabsExist) {
                const tabs = document.querySelectorAll('.tab');
                const tabContents = document.querySelectorAll('.tab-content');
                const tabsSelect = document.querySelector('.tabs_select');
            
                // Табы на десктопе
                tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    showTab(this.getAttribute('data-tab'));
                });
                });
            
                // Табы через select на мобильных устройствах
                tabsSelect.addEventListener('change', function() {
                const selectedOption = this.options[this.selectedIndex];
                showTab(selectedOption.getAttribute('data-tab'));
                });
            
                // Функция для показа таба
                function showTab(tabId) {
                tabs.forEach(tab => {
                    tab.classList.remove('active');
                });
            
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
            
                const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
                if (selectedTab) {
                    selectedTab.classList.add('active');
                    const selectedTabContent = document.getElementById(tabId);
                    if (selectedTabContent) {
                    selectedTabContent.classList.add('active');
                    }
                }
                }
            
                // При загрузке страницы показываем первый таб
                const defaultTab = tabs[0].getAttribute('data-tab');
                showTab(defaultTab);
            }
        });
    }
    init() {
        this.initTabs();
    }
}

export default ServDop;