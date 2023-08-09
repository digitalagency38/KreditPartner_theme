<?php 
    /**
    *	Template name: О компании
    */
    get_header();
?>
<div class="about_page">
	<?php $page_first = get_field( 'page_first' );?>	 	
	<?php if ($page_first['title']): ?>
		<div class="about_page_first" style="background: <?php echo $page_first['color']; ?> url(<?php echo $page_first['bg']; ?>) 80% 100% no-repeat;">
			<div class="about_page_first__in center_block blue_color">
				<?php get_template_part('breadcrums-white'); ?>
				<div class="about_page_first__info">
					<h1 class="about_page_first__title"><?php echo $page_first['title']; ?></h1>
					<div class="about_page_first__subtitle"><?php echo $page_first['subtitle']; ?></div>
					<div class="about_page_first__text"><?php echo $page_first['text']; ?></div>
				</div>
			</div>
		</div>
	<?php endif ?> 
	<?php $first_tab = get_field( 'first_tab' );?>	
	<?php $second_tab = get_field( 'second_tab' );?>	
	<?php $third_tab = get_field( 'third_tab' );?>	
	<?php $fourth_tab = get_field( 'fourth_tab' );?>	
    <div class="serv_dop center_block">
        <div class="serv_dop__items">
            <div class="serv_dop__top tabs">
                <div class="tab-buttons">
					<?php if ($first_tab['title']): ?>
                    	<div class="tab active" data-tab="tab1"><?php echo $first_tab['title']; ?></div>
					<?php endif ?> 
					<?php if ($second_tab['title']): ?>
                    	<div class="tab" data-tab="tab2"><?php echo $second_tab['title']; ?></div>
					<?php endif ?> 
					<?php if ($third_tab['title']): ?>
                    	<div class="tab" data-tab="tab3"><?php echo $third_tab['title']; ?></div>
					<?php endif ?> 
					<?php if ($fourth_tab['title']): ?>
						<div class="tab" data-tab="tab4"><?php echo $fourth_tab['title']; ?></div>
					<?php endif ?> 
                </div>
            </div>
            <select name="" id="serv_select_js" class="tabs_select">
				<?php if ($first_tab['title']): ?>
                	<option value="" data-tab="tab1"><?php echo $first_tab['title']; ?></option>
				<?php endif ?> 
				<?php if ($second_tab['title']): ?>
                	<option value="" data-tab="tab2"><?php echo $second_tab['title']; ?></option>
				<?php endif ?> 
				<?php if ($third_tab['title']): ?>
                	<option value="" data-tab="tab3"><?php echo $third_tab['title']; ?></option>
				<?php endif ?> 
				<?php if ($fourth_tab['title']): ?>
                    <option value="" data-tab="tab4"><?php echo $fourth_tab['title']; ?></option>
				<?php endif ?> 
            </select>
            <div class="tab-contents">
				<?php if ($first_tab['title']): ?>
					<div class="tab-content active" id="tab1">
						<div class="about_page__text"><?php echo $first_tab['text']; ?></div>
					</div>  
				<?php endif ?>               
                <div class="tab-content" id="tab2">
					<?php $slist = $second_tab['list']; ?>
					<?php if (is_array($slist)) { ?>
						<?php foreach ($slist as $e) { ?>
							<a href="<?php echo $e['link']; ?>" class="about_page__doc">
								<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clip-path="url(#clip0_975_1319)">
									<path d="M0 20C0 10.5719 0 5.85786 2.92893 2.92893C5.85786 0 10.5719 0 20 0H40C49.4281 0 54.1421 0 57.0711 2.92893C60 5.85786 60 10.5719 60 20V40C60 49.4281 60 54.1421 57.0711 57.0711C54.1421 60 49.4281 60 40 60H20C10.5719 60 5.85786 60 2.92893 57.0711C0 54.1421 0 49.4281 0 40V20Z" fill="#D9EDF9"/>
									<path d="M17.1928 23.4001C18.0883 23.4001 18.897 23.5887 19.6188 23.9659C20.3539 24.343 20.9287 24.8647 21.343 25.531C21.7574 26.1973 21.9646 26.939 21.9646 27.7561C21.9646 29.0007 21.5101 30.0379 20.6012 30.8676C19.6923 31.6973 18.5562 32.1121 17.1928 32.1121H14.3057V36.6001H12V23.4001H17.1928ZM17.0725 30.0567C17.4468 30.0567 17.7876 30.0001 18.095 29.887C18.4158 29.7739 18.6898 29.6167 18.9171 29.4156C19.1443 29.2144 19.318 28.9693 19.4383 28.6801C19.572 28.391 19.6388 28.083 19.6388 27.7561C19.6388 27.3161 19.5252 26.9264 19.298 26.587C19.0841 26.235 18.7834 25.9584 18.3958 25.7573C18.0081 25.5561 17.5671 25.4556 17.0725 25.4556H14.3057V30.0567H17.0725Z" fill="#28285C"/>
									<path d="M29.6883 23.4001C31.7467 23.4001 33.4442 24.0224 34.7808 25.267C36.1308 26.5116 36.8058 28.0893 36.8058 30.0001C36.8058 31.911 36.1308 33.4887 34.7808 34.7333C33.4442 35.9779 31.7467 36.6001 29.6883 36.6001H24.7361V23.4001H29.6883ZM29.6281 34.5824C31.0316 34.5824 32.1811 34.155 33.0766 33.3001C33.9856 32.4327 34.44 31.3327 34.44 30.0001C34.44 29.3339 34.3197 28.7179 34.0791 28.1521C33.8519 27.5864 33.5244 27.1024 33.0967 26.7001C32.6823 26.2979 32.1744 25.9836 31.5729 25.7573C30.9715 25.531 30.3232 25.4179 29.6281 25.4179H27.0418V34.5824H29.6281Z" fill="#28285C"/>
									<path d="M48 25.4367H42.2057V29.1704H47.4787V31.1504H42.2057V36.6001H39.9V23.4001H48V25.4367Z" fill="#28285C"/>
									</g>
									<defs>
									<clipPath id="clip0_975_1319">
									<rect width="60" height="60" rx="10" fill="white"/>
									</clipPath>
									</defs>
								</svg>
								<div class="about_page__doc--text"><?php echo $e['title']; ?></div>
							</a>
						<?php } ?>
					<?php } ?> 	
                </div>       
				<?php if ($third_tab['title']): ?>         
					<div class="tab-content" id="tab3">
						<?php $tlist = $third_tab['list']; ?>
						<?php if (is_array($tlist)) { ?>
							<?php foreach ($tlist as $e) { ?>
								<a href="<?php echo $e['link']; ?>" class="about_page__doc about_page__doc--rules">
									<div class="about_page__doc--text"><?php echo $e['title']; ?></div>
								</a>
							<?php } ?> 	
						<?php } ?> 	
					</div>     
				<?php endif ?>  
				<?php if ($fourth_tab['title']): ?>     
					<div class="tab-content" id="tab4">
						<?php $flist = $fourth_tab['list']; ?>
						<?php if (is_array($flist)) { ?>
							<div id="responsiveTabsDemo">
								<ul class="tab-content__tabs">
									<?php foreach ($flist as $key => $e) { ?>
										<li><a href="#tab-<?php echo $key+1; ?>"><?php echo $e['title']; ?></a></li>
									<?php } ?> 	
								</ul>
								<div class="tab-content__content">
									<?php foreach ($flist as $key => $e) { ?>
										<div id="tab-<?php echo $key+1; ?>">
											<?php $lists2 = $e['lists']; ?>
											<?php foreach ($lists2 as $s) { ?>
												<div class="ques_block">
													<div class="ques_block__title"><?php echo $s['title']; ?></div>
													<div class="ques_block__text"><?php echo $s['text']; ?></div>
												</div>
											<?php } ?> 	
										</div>
									<?php } ?> 	
								</div>
							</div>
						<?php } ?> 	
					</div>
				<?php endif ?>  
            </div>
        </div>
    </div>
</div>
<?php get_footer(); ?>