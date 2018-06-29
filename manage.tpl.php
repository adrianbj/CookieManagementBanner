<?php
//you probably don't want to change any of the js-* prefixed classes
?>
<div class="pwcmb-widget pwcmb-widget--manage">
    <div class="pwcmb-widget__inner">
        <div class="pwcmb-widget__copy">
            <?php if ($module->{"manage_title$lang"}): ?>
                <h4 class="pwcmb-widget__title"><?php print $module->{"manage_title$lang"}; ?></h4>
            <?php endif; ?>
            <div class="pwcmb-widget__text"><?php print $module->{"manage_text$lang"}; ?></div>
            <form class="pwcmb-widget__row" id="pwcmb-consent-form" name="pwcmb-consent-form" method="get">
                <div class="pwcmb-option-wrapper">
                    <input id="pwcmb-consent--y" name="pwcmb-consent--y" class="pwcmb-widget__row-cb js-pwcmb-marketing-pref--y" type="checkbox">
                    <label for="pwcmb-consent--y" class="pwcmb-widget__row-label"><span><?php print $module->{"consent_label$lang"}; ?></span></label>
                </div>
                <div class="pwcmb-option-wrapper">
                    <input id="pwcmb-consent--n" name="pwcmb-consent--n" class="pwcmb-widget__row-cb js-pwcmb-marketing-pref--n" type="checkbox">
                    <label for="pwcmb-consent--n" class="pwcmb-widget__row-label"><span><?php print $module->{"no_consent_label$lang"}; ?></span></label>
                </div>
            </form>
        </div>
        <div class="pwcmb-widget__actions">
            <button class="pwcmb-widget__button js-pwcmb-save-pref"><?php print $module->{"preferences_btn_text$lang"}; ?></button>
        </div>
    </div>
</div>