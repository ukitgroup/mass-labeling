# Multilanguage support

__Mass Labeling__ uses library [i18n](https://github.com/mashpie/i18n-node) for multilanguage support.
It uses `locales` folder, where the translation files of all the texts of 
the corresponding languages ​​are stored. The list of currently supported languages: Russian, English.

### Add new language 

To create new language locale file named `<new_locale>` you can use the following command:
```sh
bin/cli locale:create --locale <new_locale> | npx bunyan 
```
or you can copy one of the locale files presented in `locales` folder and rename it as `<new_locale>`.

Usage example on how to create `fr.json` file in `locales` folder:
```console
bin/cli locale:create --locale fr | npx bunyan
```

__*Note*__. After adding a new language, the server should be restarted to apply this changes.

Then you can edit a new locale file to specify elements names for the chosen language. This changes would be applied 
after corresponding page reloading. 

### Create new sign key for all languages:

All locales should have the same set of sign keys. To create new sign key for all locales in the folder you can 
use the following command:
```sh
bin/cli locale:new --key <sign_key> | npx bunyan
```
`<sign_key>` is the name of the new key.

Usage example on how to create key 'auth_errors' in all language files:
```sh
bin/cli locale:new --key auth_errors | npx bunyan
```

Also this command allows you to insert multi-level signs. To declare new level, use dot (.), 
e.g.: auth_errors.wrong_email.

```sh
bin/cli locale:new --key auth_errors.wrong_email | npx bunyan
```

Last command adds the 'wrong_email' sign for the 'wrong_email' second level key for the 'auth_errors' first level key. 
If such object does not exist, it will be created first and it would look like the following: 
```javascript
"auth_errors": {
    "wrong_email": "wrong_email"
},
```

After you add a new key you can edit all locale files to set the correct sign for this key.

### Check the consistency of the language files

```sh
bin/cli locale:sync | npx bunyan
```

This command will compare the default language file with the others. If some key is absent, 
the corresponding message will be displayed in the console. If all keys are present, 
the console displays "Language files are Consistent".

