<?php
/**
 * KreditPartner functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package KreditPartner
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function kreditpartner_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on KreditPartner, use a find and replace
		* to change 'kreditpartner' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'kreditpartner', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'kreditpartner' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'kreditpartner_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'kreditpartner_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function kreditpartner_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'kreditpartner_content_width', 640 );
}
add_action( 'after_setup_theme', 'kreditpartner_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function kreditpartner_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'kreditpartner' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'kreditpartner' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'kreditpartner_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function kreditpartner_scripts() {
	wp_enqueue_style( 'kreditpartner-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'kreditpartner-style', 'rtl', 'replace' );

	wp_enqueue_script( 'kreditpartner-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'kreditpartner_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}




/*
Короткий пример для использования Theme_Customization_API 
http://casepress.org/kb/web/nastrojki-temy-wordpress-kak-dobavit-svoi-polya/
*/
/**
 * Добавляет страницу настройки темы в админку Вордпресса
 */
function mytheme_customize_register( $wp_customize ) {
/*
Добавляем секцию в настройки темы
*/
  $wp_customize->add_section(
      // ID
      'data_site_section',
      // Arguments array
      array(
          'title' => 'Данные сайта',
          'capability' => 'edit_theme_options',
          'description' => "Тут можно указать данные сайта"
      )
  );
/*
Добавляем поле телефона site_telephone
*/
  $wp_customize->add_setting(
      // ID
      'site_telephone',
      // Arguments array
      array(
          'default' => '',
          'type' => 'option'
      )
  );
  $wp_customize->add_control(
      // ID
      'site_telephone_control',
      // Arguments array
      array(
          'type' => 'text',
          'label' => "Номер телефона",
          'section' => 'data_site_section',
          // This last one must match setting ID from above
          'settings' => 'site_telephone'
      )
  );
  
  /*
Добавляем поле телефона site_email
*/
  $wp_customize->add_setting(
      // ID
      'site_email',
      // Arguments array
      array(
          'default' => '',
          'type' => 'option'
      )
  );
  $wp_customize->add_control(
      // ID
      'site_email_control',
      // Arguments array
      array(
          'type' => 'text',
          'label' => "Email",
          'section' => 'data_site_section',
          // This last one must match setting ID from above
          'settings' => 'site_email'
      )
  );
  $wp_customize->add_setting(
      // ID
      'site_tg',
      // Arguments array
      array(
          'default' => '',
          'type' => 'option'
      )
  );
  $wp_customize->add_control(
      // ID
      'site_tg_control',
      // Arguments array
      array(
          'type' => 'text',
          'label' => "Ссылка на Telegram",
          'section' => 'data_site_section',
          // This last one must match setting ID from above
          'settings' => 'site_tg'
      )
  );
  $wp_customize->add_setting(
      // ID
      'site_vk',
      // Arguments array
      array(
          'default' => '',
          'type' => 'option'
      )
  );
  $wp_customize->add_control(
      // ID
      'site_vk_control',
      // Arguments array
      array(
          'type' => 'text',
          'label' => "Ссылка на ВКонтакте",
          'section' => 'data_site_section',
          // This last one must match setting ID from above
          'settings' => 'site_vk'
      )
  );
  $wp_customize->add_setting(
      // ID
      'site_insta',
      // Arguments array
      array(
          'default' => '',
          'type' => 'option'
      )
  );
  $wp_customize->add_control(
      // ID
      'site_insta_control',
      // Arguments array
      array(
          'type' => 'text',
          'label' => "Ссылка на Instagram",
          'section' => 'data_site_section',
          // This last one must match setting ID from above
          'settings' => 'site_insta'
      )
  );
  $wp_customize->add_setting(
      // ID
      'site_ok',
      // Arguments array
      array(
          'default' => '',
          'type' => 'option'
      )
  );
  $wp_customize->add_control(
      // ID
      'site_ok_control',
      // Arguments array
      array(
          'type' => 'text',
          'label' => "Ссылка на Одноклассники",
          'section' => 'data_site_section',
          // This last one must match setting ID from above
          'settings' => 'site_ok'
      )
  );
  $wp_customize->add_setting(
      // ID
      'link_lk',
      // Arguments array
      array(
          'default' => '',
          'type' => 'option'
      )
  );
  $wp_customize->add_control(
      // ID
      'link_lk_control',
      // Arguments array
      array(
          'type' => 'text',
          'label' => "Ссылка на Личный кабинет",
          'section' => 'data_site_section',
          // This last one must match setting ID from above
          'settings' => 'link_lk'
      )
  );
  $wp_customize->add_setting(
      // ID
      'link_plat',
      // Arguments array
      array(
          'default' => '',
          'type' => 'option'
      )
  );
  $wp_customize->add_control(
      // ID
      'link_plat_control',
      // Arguments array
      array(
          'type' => 'text',
          'label' => "Ссылка на Платеж",
          'section' => 'data_site_section',
          // This last one must match setting ID from above
          'settings' => 'link_plat'
      )
  );
  $wp_customize->add_setting(
      // ID
      'foot_image',
      // Arguments array
      array(
          'default' => '',
          'type' => 'option'
      )
  );
  // Add Controls
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'foot_image_control', array(
        'label' => "Лого в подвале",
        'section' => 'data_site_section',
          // This last one must match setting ID from above
          'settings' => 'foot_image'   
    )));
  $wp_customize->add_setting(
      // ID
      'foot_title',
      // Arguments array
      array(
          'default' => '',
          'type' => 'option'
      )
  );
  $wp_customize->add_control(
      // ID
      'foot_title_control',
      // Arguments array
      array(
          'type' => 'text',
          'label' => "Слоган компании",
          'section' => 'data_site_section',
          // This last one must match setting ID from above
          'settings' => 'foot_title'
      )
  );
  $wp_customize->add_setting(
      // ID
      'copy',
      // Arguments array
      array(
          'default' => '',
          'type' => 'option'
      )
  );
  $wp_customize->add_control(
      // ID
      'copy_control',
      // Arguments array
      array(
          'type' => 'text',
          'label' => "Копирайт",
          'section' => 'data_site_section',
          // This last one must match setting ID from above
          'settings' => 'copy'
      )
  );
  $wp_customize->add_setting(
      // ID
      'link_politic',
      // Arguments array
      array(
          'default' => '',
          'type' => 'option'
      )
  );
  $wp_customize->add_control(
      // ID
      'link_politic_control',
      // Arguments array
      array(
          'type' => 'text',
          'label' => "Ссылка на копирайт в подвале",
          'section' => 'data_site_section',
          // This last one must match setting ID from above
          'settings' => 'link_politic'
      )
  );
}
add_action( 'customize_register', 'mytheme_customize_register' );


add_action( 'init', 'true_register_post_type_init' );
function true_register_post_type_init() {
 
	$article_labels = array(
		'name' => 'Статьи',
		'singular_name' => 'Статья',
		'add_new' => 'Добавить Статью',
		'add_new_item' => 'Добавить Статью',
		'edit_item' => 'Редактировать Статью',
		'new_item' => 'Новая Статья',
		'all_items' => 'Все Статьи',
		'search_items' => 'Искать Статьи',
		'not_found' =>  'Статьи по заданным критериям не найдено.',
		'not_found_in_trash' => 'В корзине нет Статей.',
		'menu_name' => 'Статьи'
	);
 
	$article_args = array(
		'labels' => $article_labels,
		'public' => true,
		'publicly_queryable' => true,
		'has_archive' => true,
		'menu_icon' => 'dashicons-star-filled',
		'menu_position' => 3,
		'supports' => array( 'title' )
	);
 
	register_post_type( 'article', $article_args );
 
	$special_labels = array(
		'name' => 'Специальные предложения',
		'singular_name' => 'Специальное предложение',
		'add_new' => 'Добавить предложение',
		'add_new_item' => 'Добавить предложение',
		'edit_item' => 'Редактировать предложение',
		'new_item' => 'Новое предложение',
		'all_items' => 'Все предложения',
		'search_items' => 'Искать предложения',
		'not_found' =>  'предложения по заданным критериям не найдено.',
		'not_found_in_trash' => 'В корзине нет предложений.',
		'menu_name' => 'Предложения'
	);
 
	$special_args = array(
		'labels' => $special_labels,
		'public' => true,
		'publicly_queryable' => true,
		'has_archive' => true,
		'menu_icon' => 'dashicons-star-filled',
		'menu_position' => 3,
		'supports' => array( 'title' )
	);
 
	register_post_type( 'special', $special_args );
}


// Удаление обертки <span> у полей Contact Form 7
add_filter('wpcf7_form_elements', function($content) {
    $content = preg_replace('/<(span).*?class="\s*(?:.*\s)?wpcf7-form-control-wrap(?:\s[^"]+)?\s*"[^\>]*>(.*)<\/\1>/i', '\2', $content);

    return $content;
});