<?php
//you probably don't want to change any of the js-* prefixed classes
?>
<div class="pwcmb-widget pwcmb-widget--notice">
    <div class="pwcmb-widget__inner">
        <div class="pwcmb-widget__copy">
            <?php if ($module->{"title$lang"}): ?>
                <h4 class="pwcmb-widget__title"><?php print $module->{"title$lang"}; ?></h4>
            <?php endif; ?>
            <div class="pwcmb-widget__text"><?php print $module->{"text$lang"}; ?></div>
        </div>
        <div class="pwcmb-widget__actions">
            <button class="pwcmb-widget__button js-pwcmb-allow-cookies"><?php print $module->{"accept_btn_text$lang"}; ?></button>
            <?php if($module->allow_manage): ?>
                <button class="pwcmb-widget__button js-pwcmb-manage-cookies"><?php print $module->{"manage_btn_text$lang"}; ?></button>
            <?php endif; ?>
        </div>
        <span class="pwcmb-widget__close js-pwcmb-allow-cookies">Close</span>
    </div>
</div>