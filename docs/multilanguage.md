# Multilanguage support

__Mass Labeling__ uses the [i18n](https://github.com/mashpie/i18n-node) library for multilanguage support.
It uses the `locales` folder which stores all texts of the corresponding languages. 
The list of the currently supported languages: English, Russian.

### Add a new language 

To create a new language locale (file named `<new_locale>`), you can use the following command:
```sh
bin/cli locale:create --locale <new_locale> | npx bunyan 
```
or you can copy one of the locale's files presented in the `locales` folder and rename it to `<new_locale>`.

The usage example on how to create a `fr.json` file in the `locales` folder:
```console
bin/cli locale:create --locale fr | npx bunyan
```

__*Note*__. After adding a new language, the server should be restarted to apply these changes.

Then you can edit the new locale's file to specify the element names for the chosen language. These changes would be applied 
after the corresponding page is reloaded. 

### Create new sign key for all languages:

All locales should have the same set of sign keys. To create a new sign key for all locales in the folder, you can 
use the following command:
```sh
bin/cli locale:new --key <sign_key> | npx bunyan
```
`<sign_key>` is the name of the new key.

The usage example on how to create the 'auth_errors' key in all language files:
```sh
bin/cli locale:new --key auth_errors | npx bunyan
```

Also, this command allows you to insert multi-level signs. To declare a new level, use a dot (.), 
e.g.: auth_errors.wrong_email.

```sh
bin/cli locale:new --key auth_errors.wrong_email | npx bunyan
```

The last command adds the 'wrong_email' sign for the 'wrong_email' second level key for the 'auth_errors' first level key. 
If such object does not exist, it will be created first and it will look like the following: 
```javascript
"auth_errors": {
    "wrong_email": "wrong_email"
},
```

After you add a new key, you can edit files for all locales to set the correct sign for this key.

### Check the consistency of the language files

```sh
bin/cli locale:sync | npx bunyan
```

This command will compare the default language file with the others. If some key is absent, 
the corresponding message will be displayed in the console. If all keys are present, 
the console will return "Language files are consistent".

