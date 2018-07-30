# Multilanguage support

To ensure the multilanguage of the application, 'locales' folder was created, where the translation files of 
all the texts of the corresponding languages ​​are stored. The list of currently supported languages:
Russian, English.

Also this folder contains the language settings file:
```javascript
{
	availableLocales,
	defaultLocale: 'en',
	cookieMaxAge: 30 * 24 * 3600 * 1000,

	getLocaleReadableName(localeShortName) {
		switch (localeShortName) {
			case 'en': return 'English';
			case 'ru': return 'Русский';
			default: return localeShortName;
		}
	},
}
```

- availableLocales - selectable locales, determined by reading all the json files in the 'locales' directory
- defaultLocale - default language
- cookieMaxAge - the cookie expiration date of the selected language
- getLocaleReadableName - utility function for getting the human-readable name of the locale


### Create new language file of locale NEW_LOCALE (copies the file of the default language with name NEW_LOCALE).
```console
bin/cli locale:create --locale NEW_LOCALE | npx bunyan 
```
Usage (creates fr.json file in 'locales' directory):
```console
bin/cli locale:create --locale fr | npx bunyan
```
__*Note*__. After adding a new language, the server should be restarted

### Create new sign for all languges:
```console
bin/cli locale:new --key <sign_key> | npx bunyan
```
Usage (creates sign with key 'auth_errors' in all language files):
```console
bin/cli locale:new --key auth_errors | npx bunyan
```
Also this command allows you to insert multi-level signs. To declare new level, use dot (.), e.g.:  auth_errors.wrong_email. 
```console
bin/cli locale:new --key auth_errors.wrong_email | npx bunyan
```
This command will add the wrong_email sign to the auth_errors object. If such object does not exist, it will be created first
```javascript
"auth_errors": {
    "wrong_email": "wrong_email"
},
```

### Check the consistency of the language files
```console
bin/cli locale:sync | npx bunyan
```
This command will compare the language file of the default language with the rest. If some sign is absent, the corresponding message will be displayed in the console. If all signs are present, the console displays "Language files are Consistent"


### Signs usage
To use a sign, instead of static text in templates, you should use the command
```javascript
<%= getText('SIGN_ID') %>
```
Example:
```html
<button><%= getText('click_me_prompt') %></button>
```
If there is no sign with such id, the text will be displayed as is.

### Sign creation flow
To use new sign you should:
1. Use following command in template
```javascript
<%= getText('my_sign') %>
```
2. Declare this sign in all language files:
```console
bin/cli locale:new --key my_sign | npx bunyan
```
3. Translate this sign in all languages 
