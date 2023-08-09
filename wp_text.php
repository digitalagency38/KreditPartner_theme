<?php 
    /**
    *	Template name: Текстовая страница
    */
    get_header();
?>
<?php get_template_part('breadcrums-main'); ?>
<div class="text_page center_block">
    <h1><?php echo get_the_title(); ?></h1>
    <div class="text_page__text"><?php echo get_the_content(); ?></div>
</div>
<?php get_footer(); ?>