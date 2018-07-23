<?php

$config = array(
    // Settings
    array(
        'type' => 'fieldset',
        'label' => __("Settings"),
        'children' => array(
            array(
                'type' => 'checkbox',
                'name' => 'status',
                'label' => __('Enable cookie management banner'),
                'columnWidth' => 50,
                'value' => null
            ),
            array(
                'type' => 'text',
                'name' => 'version',
                'label' => __('Version number'),
                'notes' => __('Changing the version number will trigger the cookie modal to be displayed to all users until they make their preference known. Increment this value when policy or wordings change and new opt-ins are required.'),
                'columnWidth' => 50,
                'required' => true,
                'value' => 1
            ),
            array(
                'type' => 'checkbox',
                'name' => 'autoload_assets',
                'label' => __('Autoload Assets'),
                'description' => __('Autoload module CSS and JS files.'),
                'notes' => __("If you disable this, you will need to load these files manually:\n```<link rel='stylesheet' type='text/css' href='/site/modules/CookieManagementBanner/assets/css/CookieManagementBanner.css' />\n<script defer src='/site/modules/CookieManagementBanner/assets/js/CookieManagementBanner.js'></script>```\nNOTE: you must load the JS file with the defer attribute."),
                'value' => 1
            ),
            array(
                'type' => 'checkbox',
                'name' => 'eu_visitors_only',
                'label' => __('Only display for EU visitors'),
                'notes' => __('Only visitors from the EU (based on IP address) will see the banner.'),
                'columnWidth' => 50,
                'value' => null
            ),
            array(
                'type' => 'checkbox',
                'name' => 'allow_manage',
                'label' => __('Allow users to manage'),
                'notes' => __('This gives users the option to manage their acceptance of tracking cookies.'),
                'columnWidth' => 50,
                'value' => 1
            ),
            /*array(
                'type' => 'checkbox',
                'name' => 'auto_accept',
                'label' => __('Auto-accept mode'),
                'notes' => __('Enabling auto-accept mode will send the acceptance beacon if the document is interacted with in any way.'),
                'columnWidth' => 33,
                'value' => 0
            ),*/
        )
    ),
    // Notice Content
    array(
        'type' => 'fieldset',
        'name' => 'noticeContent',
        'label' => __("Notice Content"),
        'children' => array(
            array(
                'type' => 'text',
                'name' => 'title',
                'label' => __('Title'),
                'notes' => __('Leave empty for no title.'),
                'useLanguages' => true
            ),
            array(
                'type' => 'CKEditor',
                'name' => 'text',
                'label' => __('Notice content'),
                'useLanguages' => true,
                'required' => true,
                'value' => __('Cookies are used to make this website work and to enhance your experience. To learn more about the types of cookies this website uses, see our Cookie Policy. You can provide consent by clicking the "I Consent" button or by canceling this cookie notice.')
            ),
            array(
                'type' => 'text',
                'name' => 'accept_btn_text',
                'label' => __('Accept button text'),
                'useLanguages' => true,
                'columnWidth' => 33,
                'required' => true,
                'value' => 'I Consent'
            ),
            array(
                'type' => 'text',
                'name' => 'manage_btn_text',
                'label' => __('Manage cookies'),
                'useLanguages' => true,
                'columnWidth' => 34,
                'required' => true,
                'value' => 'Manage Cookies'

            ),
            array(
                'type' => 'text',
                'name' => 'manage_title',
                'label' => __('Manage title'),
                'notes' => __('Leave empty for no title.'),
                'columnWidth' => 33,
                'useLanguages' => true,
            ),
            array(
                'type' => 'CKEditor',
                'name' => 'manage_text',
                'label' => __('Manage intro text'),
                'useLanguages' => true,
                'required' => true,
                'value' => __('Cookies are used to make this website work and to enhance your experience. To learn more about the types of cookies this website uses, see our Cookie Policy.  We need your consent to use marketing cookies. Marketing cookies are used to track visitors across websites. The intention is to display ads (via third party services) that are relevant and engaging for individual users. Please select the checkbox below to indicate your consent.')
            ),
            array(
                'type' => 'text',
                'name' => 'consent_label',
                'label' => __('Marketing cookie consent label'),
                'columnWidth' => 25,
                'useLanguages' => true,
                'required' => true,
                'value' => __('I consent')
            ),
            array(
                'type' => 'text',
                'name' => 'no_consent_label',
                'label' => __('Marketing cookie no consent label'),
                'columnWidth' => 25,
                'useLanguages' => true,
                'required' => true,
                'value' => __('I do not consent')
            ),
            array(
                'type' => 'text',
                'name' => 'preferences_btn_text',
                'label' => __('Save preferences button text'),
                'columnWidth' => 25,
                'useLanguages' => true,
                'required' => true,
                'value' => __('Save Preferences')
            ),
            array(
                'type' => 'text',
                'name' => 'preferences_saved_message',
                'label' => __('Preferences saved message'),
                'columnWidth' => 25,
                'useLanguages' => true,
                'required' => true,
                'value' => __('Your cookie preferences have been saved')
            ),
        )
    ),
    // Layout
    array(
        'type' => 'fieldset',
        'name' => 'layout',
        'label' => __("Layout"),
        'children' => array(
            array(
                'type' => 'select',
                'name' => 'style',
                'label' => __("Position"),
                'options' => array(
                    'top_overlay' => __('Fixed Overlay at Top of Page'),
                    'bottom_overlay' => __('Fixed Overlay at Bottom of Page')
                ),
                'columnWidth' => 33,
                'required' => true,
                'value' => 'top_overlay'
            )
        )
    )
);


