<?php
//you probably don't want to change any of the js-* prefixed classes
?>
<div id="cookie-manager" class="pwcmb pwcmb--<?php print $module->style; ?>">
    <?php require($this->wire('config')->paths->$module.'notice.tpl.php'); ?>
    <?php if($module->allow_manage) require($this->wire('config')->paths->$module.'manage.tpl.php'); ?>
    <?php require($this->wire('config')->paths->$module.'message.tpl.php'); ?>
</div>
