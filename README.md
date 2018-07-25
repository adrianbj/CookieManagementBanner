# Cookie Management Banner for ProcessWire
This module adds a cookie management banner for GDPR compliance.

The user can accept all cookies or they can choose to not accept tracking/marketing cookies.

Module config options allow you to:
* define all text and button labels (multi-language support)
* manually increment the cookie policy version which forces the user to review their consent again
* option to limit display of banner to users only in European Union (by IP address)
* option to auto accept based on any interaction from the user with the site
* position selection (top or bottom overlay, or content pushed down from the top)

It comes with basic default styling which is easily overwritten by site CSS

The module sets various values to the dataLayer array which works together with [Google Tag Manager](https://www.google.com/analytics/tag-manager/) - please read through the code in /assets/js/CookieManagementBanner.js to get a better idea of how this works and what is made available for GTM.

You can wrap your tracking/marketing cookie code in a check for the localstorage key of: pwcmbAllowCookies
```
if(localStorage.getItem('pwcmbAllowCookies') == 'y')
```

You can also provide a link on your site (probably in the footer) like this that will allow the user to show the banner even after they have saved their preferences / accepted.
```
<a href="#cookies" class="js-pwcmb-notice-toggle">Manage Your Cookies</a>
```

### Support Forum
For support for this module, please visit this thread on the ProcessWire forum: https://processwire.com/talk/topic/19525-cookie-management-banner/

### ProcessWire Modules Directory
http://modules.processwire.com/modules/cookie-management-banner/

### Installation
It is recommended to install via the ProcessWire admin Modules > Site > Add New > Add Module from Directory using the `CookieManagementBanner` class name.

### License
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

(See included LICENSE file for full license text.)
