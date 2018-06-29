# Cookie Management Banner ProcessWire
This module adds a cookie management banner for GDPR compliance.

The user can accept all cookies or they can choose to not accept tracking/marketing cookies.

Module config options allow you to:
* define all text and button labels (multi-language support)
* manually increment the cookie policy version which forces the user to review their consent again
* option to limit display of banner to users only in European Union (by IP address)
* position selection (top or bottom overlay, or content pushed down from the top)

Comes with basic default styling which is easily overwritten by site CSS

You can wrap your tracking/marketing cookie code in a check for the localstorage key of: pwcmbAllowCookies
```
if(localStorage.getItem('pwcmbAllowCookies') == 'y')
```

### Support Forum
For support for this module, please visit this thread on the ProcessWire forum:

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
