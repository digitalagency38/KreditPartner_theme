<?php get_header(); ?>
<?php get_template_part('breadcrums-main'); ?>
<div class="newss_page center_block">
    <h1 class="newss_page__title"><?php echo single_post_title(); ?></h1>
    <div class="newss_page__blocks">
        <?php
        $args = array(
            'post_type' => 'post',
            'posts_per_page' => -1,
            'order' => 'DESC',
        );
        $query = new WP_Query($args);
        while ($query->have_posts()) {
            $query->the_post(); ?>
            <a href="<?php the_permalink(); ?>" class="newss_page__block">
                <div class="newss_page__img">
                    <picture><source srcset="<?php echo get_the_post_thumbnail_url(); ?>" type="image/webp"><img src="<?php echo get_the_post_thumbnail_url(); ?>" alt=""></picture>
                </div>
                <div class="newss_page__info">
                    <div class="newss_page__date"><?php echo get_the_date('j F Y'); ?></div>
                    <div class="newss_page__tit"><?php the_title(); ?></div>
                </div>
            </a>
        <?php
        }
        wp_reset_postdata();
        ?>
    </div>
</div>
<?php get_footer(); ?>