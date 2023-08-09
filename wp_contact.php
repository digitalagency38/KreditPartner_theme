<?php 
    /**
    *	Template name: Контакты
    */
    get_header();
?>
<?php get_template_part('breadcrums-main'); ?>
<?php $main_map = get_field('main_map', 11);?>	 	
<div class="contact_page">
    <h1 class="contact_page__h1 center_block">Контакты</h1>
    <div class="contact_page__blocks">
        <div class="contact_page__l-side" id="office">
			<div class="contact_page__items">
				<ul class="submenu">
					<?php $marks = $main_map['marks'];?>
					<?php foreach ($marks as $index => $mark): ?>
					<li>
						<a href="#" class="map-link" data-coords="<?php echo $mark['coords'] ?>">
							<div class="contact_page__city"><?php echo $mark['city']; ?></div>
							<div class="contact_page__info">
								<div class="contact_page__item">
									<span>Адрес:</span>
									<?php echo $mark['content']; ?>
								</div>
								<?php $tels = $mark['tels'];?>
								<div class="contact_page__item">
									<span>Телефон:</span>
									<?php foreach ($tels as $s): ?>
										<div><?php echo $s['tel']; ?></div>
									<?php endforeach; ?>
								</div>
								<div class="contact_page__item">
									<span>Время работы:</span>
									<?php echo $mark['time']; ?>
								</div>
								<div class="contact_page__item">
									<span>Почта:</span>
									<?php echo $mark['mail']; ?>
								</div>
							</div>
						</a>
					</li>
					<?php endforeach; ?>
				</ul>
        	</div>
        </div>
        <div class="contact_page__r-side">
            <div class="map-block" id="map" style="width: 100%; height: 100%;"></div>
        </div>
    </div>
</div>
<?php get_footer(); ?>