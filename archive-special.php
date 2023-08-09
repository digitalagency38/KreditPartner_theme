<?php get_header(); ?>
<?php get_template_part('breadcrums-main'); ?>
<div class="specs_page center_block">
    <h1 class="specs_page__title">
		<?php
			$archive_title = get_the_archive_title();
			$filtered_title = str_replace('Архивы: ', '', $archive_title);
			echo $filtered_title;
		?>
	</h1>
    <div class="specs_page__blocks">
		<?php
			$args = array(
				'post_type'      => 'special',
				'posts_per_page' => -1,
				'order'          => 'DESC',
			);
			$query = new WP_Query($args);
			while ($query->have_posts()) {
				$query->the_post();
				$post_page = get_field('post_page');
				$img_url = $post_page['img'];
				$text_mini = $post_page['text_mini'];
			?>
				<a href="<?php the_permalink(); ?>" class="specs_page__block">
					<div class="specs_page__img">
						<picture><source srcset="<?php echo $img_url; ?>" type="image/webp"><img src="<?php echo $img_url; ?>" alt=""></picture>
						<div class="specs_page__date"><?php echo get_the_date('j F Y'); ?></div>
					</div>
					<div class="specs_page__info">
						<div class="specs_page__tit"><?php the_title(); ?></div>
						<div class="specs_page__txt"><?php echo $text_mini; ?></div>
						<div class="specs_page__link">Подробнее</div>
					</div>
				</a>
			<?php
			}
			wp_reset_postdata();
		?>
    </div>
</div>






























<div class="posts_page center_block">
    <h1 class="posts_page__title">
		<?php
			$archive_title = get_the_archive_title();
			$filtered_title = str_replace('Архивы: ', '', $archive_title);
			echo $filtered_title;
		?>
	</h1>
    <div class="posts_page__blocks">
		<?php
			$args = array(
				'post_type'      => 'article',
				'posts_per_page' => -1,
				'order'          => 'DESC',
			);
			$query = new WP_Query($args);
			while ($query->have_posts()) {
				$query->the_post();
				$post_page = get_field('post_page');
				$img_url = $post_page['img'];
			?>
			<a href="<?php the_permalink(); ?>" class="posts_page__block">
				<div class="posts_page__img">
					<picture>
						<source srcset="<?php echo $img_url; ?>" type="image/webp">
						<img src="<?php echo $img_url; ?>" alt="">
					</picture>
				</div>
				<div class="posts_page__info">
					<div class="posts_page__date"><?php echo get_the_date('j F Y'); ?></div>
					<div class="posts_page__tit"><?php the_title(); ?></div>
				</div>
			</a>
			<?php
			}
			wp_reset_postdata();
		?>
    </div>
</div>
<?php get_footer(); ?>