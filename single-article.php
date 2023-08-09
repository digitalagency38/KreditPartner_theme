<?php get_header(); ?>
<?php get_template_part('breadcrums-main'); ?>
<?php $post_page = get_field( 'post_page' );?>	
<div class="post_page center_block">
    <div class="post_page__item">
        <div class="post_page__l-side">
            <div class="post_page__top">
                <div class="post_page__img">
                    <picture><source srcset="<?php echo $post_page['img']; ?>" type="image/webp"><img src="<?php echo $post_page['img']; ?>" alt=""></picture>
                    <div class="post_page__date mob"><?php echo get_the_date('j F Y'); ?></div>
                </div>
                <div class="post_page__info">
                    <div class="post_page__date"><?php echo get_the_date('j F Y'); ?></div>
                    <h1 class="post_page__title"><?php echo get_the_title(); ?></h1>
                </div>
            </div>
            <div class="post_page__text">
				<?php echo $post_page['text']; ?>
				<?php $post_block = get_field( 'post_block' );?>	 	
				<?php if ($post_block['title']): ?>
					<div class="post_page__block">
						<h2><?php echo $post_block['title']; ?></h2>
						<?php echo $post_block['text']; ?>
						<?php if ($post_block['link']): ?>
							<a href="<?php echo $post_block['link']; ?>" class="post_page__btn button">Оставить заявку</a>
						<?php endif ?> 
					</div>
				<?php endif ?> 
				<?php echo $post_page['txt']; ?>
            </div>
        </div>
        <div class="post_page__r-side">
            <div class="glide post_page__blocks post_glide_js">
                <div class="glide__track" data-glide-el="track">
                    <div class="glide__slides">
						<?php
							$args = array(
								'post_type'      => 'article',
								'posts_per_page' => 5,
								'order'          => 'DESC',
							);
							$query = new WP_Query($args);
							while ($query->have_posts()) {
								$query->the_post();
								$current_post_id = get_the_ID();
								$post_page = get_field('post_page');
								$img_url = $post_page['img'];
								if ($current_post_id !== get_queried_object_id()) { 
							?>
								<a href="<?php the_permalink(); ?>" class="glide__slide post_page__post">
									<div class="post_page__post--img">
										<picture>
											<source srcset="<?php echo $img_url; ?>" type="image/webp">
											<img src="<?php echo $img_url; ?>" alt="">
										</picture>
									</div>
									<div class="post_page__post--info">
										<div class="post_page__post--date"><?php echo get_the_date('j F Y'); ?></div>
										<div class="post_page__post--title"><?php the_title(); ?></div>
									</div>
								</a>
								<?php
							}
							}
							wp_reset_postdata();
						?>
                    </div>
                </div>
                <div class="glide__arrows" data-glide-el="controls">
                  <button class="glide__arrow glide__arrow--prev" data-glide-dir="<">Назад</button>
                  <button class="glide__arrow glide__arrow--next" data-glide-dir=">">Вперед</button>
                </div>
                <div class="glide__bullets" data-glide-el="controls[nav]">
					<?php
						$post_count = $query->post_count;
						for ($i = 0; $i < $post_count; $i++) {
							echo '<button class="glide__bullet" data-glide-dir="=' . $i . '"></button>';
						}
					?>
                </div>
            </div>
        </div>
    </div>
</div>