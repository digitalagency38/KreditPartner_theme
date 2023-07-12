const Header = class Header {
    constructor({isMobileMenuOpened}){
        this.isMobileMenuOpened = false;
    }
    toogleMobileMenu() {
        this.isMobileMenuOpened = !this.isMobileMenuOpened;
    }
    closeMobileMenu() {
        this.isMobileMenuOpened = false;
    }
    setEventListener() {
        document.addEventListener('click', (event) => {
            if (event.target.closest('.header__burger--body') || event.target.closest('.header__burger')) return;
            this.closeMobileMenu();
        }) 
    }
    toggleMenu() {
        document.addEventListener('DOMContentLoaded', function() {
            const menuItemsWithChildren = document.querySelectorAll('.menu-item-has-children > a');
        
            function toggleSubMenu(e) {
                e.preventDefault();
                const subMenu = this.nextElementSibling;
                const isSubMenuVisible = subMenu.style.display === 'block';
        
                // Показать/скрыть подменю
                subMenu.style.display = isSubMenuVisible ? 'none' : 'block';
        
                // Если подменю видимо, выполнить переход по ссылке при следующем клике
                if (isSubMenuVisible) {
                    this.removeEventListener('click', toggleSubMenu);
                }
            }
        
            function handleResize() {
                const screenWidth = window.innerWidth;
        
                if (screenWidth <= 1023) {
                    menuItemsWithChildren.forEach(function(menuItem) {
                        menuItem.addEventListener('click', toggleSubMenu);
                    });
                } else {
                    menuItemsWithChildren.forEach(function(menuItem) {
                        menuItem.removeEventListener('click', toggleSubMenu);
                        const subMenu = menuItem.nextElementSibling;
                        subMenu.style.display = 'none';
                    });
                }
            }
        
            handleResize(); // Вызвать функцию при загрузке страницы
        
            window.addEventListener('resize', handleResize); // Слушать событие изменения размера окна
        });        
    }
    init() {
        this.setEventListener();
        this.toggleMenu();
    }
}

export default Header;