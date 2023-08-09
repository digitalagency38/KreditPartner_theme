<?php get_header(); ?>
<?php get_template_part('breadcrums-main'); ?>
<div class="news_page center_block">
    <div class="news_page__item">
        <div class="news_page__l-side">
            <div class="news_page__top">
                <div class="news_page__img">
					<img src="<? echo get_the_post_thumbnail_url(); ?>" alt="">
                    <div class="news_page__date mob"><?php echo get_the_date('j F Y'); ?></div>
                </div>
                <div class="news_page__info">
                    <div class="news_page__date"><?php echo get_the_date('j F Y'); ?></div>
                    <h1 class="news_page__title"><?php echo get_the_title(); ?></h1>
                </div>
            </div>
			<div class="news_page__text">
				<?php echo apply_filters('the_content', $post->post_content);?>
				<?php $news_block = get_field( 'news_block' );?>	 	
				<?php if ($news_block['title']): ?>
					<div class="news_page__block">
						<h2><?php echo $news_block['title']; ?></h2>
						<p>Кредитный потребительский кооператив «Городское Сберегательное Отделение» действует на основании Федерального закона «О кредитной кооперации» № 190-ФЗ от 18.07.2009. Мы выдаем займы населению и юридическим лицам, а также принимаем личные сбережения под процент. Услуги предоставляются только членам кооператива, минимальный паевой взнос - 50 руб.</p>
						<?php echo $news_block['text']; ?>
						<?php if ($news_block['link']): ?>
							<a href="<?php echo $news_block['link']; ?>" class="news_page__btn button">Оставить заявку</a>
						<?php endif ?> 
					</div>
				<?php endif ?> 
				<?php echo $news_block['txt']; ?>
			</div>
        </div>
        <div class="news_page__r-side">
            <div class="glide news_page__blocks post_glide_js">
                <div class="glide__track" data-glide-el="track">
                    <div class="glide__slides">
						<?php
							$args = array(
								'post_type' => 'post',
								'posts_per_page' => 5,
								'order' => 'DESC',
							);

							$query = new WP_Query($args);

							while ($query->have_posts()) {
								$query->the_post(); 
								$current_post_id = get_the_ID(); 
								if ($current_post_id !== get_queried_object_id()) { ?>
								<a href="<?php the_permalink(); ?>" class="glide__slide news_page__post">
									<div class="news_page__post--img">
										<picture><source srcset="<?php echo get_the_post_thumbnail_url(); ?>" type="image/webp"><img src="<?php echo get_the_post_thumbnail_url(); ?>" alt=""></picture>
									</div>
									<div class="news_page__post--info">
										<div class="news_page__post--date"><?php echo get_the_date('j F Y'); ?></div>
										<div class="news_page__post--title"><?php the_title(); ?></div>
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
<?php get_footer(); ?>