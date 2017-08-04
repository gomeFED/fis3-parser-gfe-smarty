# fis3-parser-gfe-smarty
fis3-parser-gfe-smarty


## INSTALL

```bash
npm install [-g] fis3-parser-gfe-smarty
```

## USE

```js
fis.match('/html/**.{html,tpl}', {
    parser: fis.plugin('gfe-smarty', {
    })
});
```